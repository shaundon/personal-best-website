#!/bin/zsh
# Publishes the iPhone Duo video clips to Cloudflare R2, served from
# https://media.getpersonalbest.com/duo/ and linked from the /duo press card.
#
#   scripts/publish-duo-clips.sh ~/Desktop/duo-screenshots/processed
#
# Expects files named "<screen> (transparent).mov", "<screen> (vertical).mp4" and
# "<screen> (horizontal).mp4". Renames them to URL-safe slugs (e.g.
# replay-seated-horizontal.mp4), makes a poster frame per screen from the horizontal
# cut, zips the clips into one download, and uploads everything. Clips and the zip are
# served as downloads rather than played in the browser.
#
# It also makes the web versions the /duo page plays, under duo/web/: each transparent
# clip at 960px tall as HEVC with alpha (.mov, for Safari and every iOS browser) and VP9
# with alpha (.webm, for Chrome and Firefox).
#
# Needs ffmpeg (with VideoToolbox, so a Mac) and `npx wrangler login`. Re-running replaces files in place.

set -euo pipefail

input=${1:?usage: publish-duo-clips.sh <folder of exported clips>}
bucket=personal-best-media
prefix=duo
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT
mkdir -p "$work/clips" "$work/posters"

python3 - "$input" "$work/clips" <<'EOF'
import os, re, shutil, sys, unicodedata
src, out = sys.argv[1:]
for f in sorted(os.listdir(src)):
    if f.startswith('.'):
        continue
    m = re.match(r'(.+?) \((transparent|vertical|horizontal)\)\.(mp4|mov)$', unicodedata.normalize('NFC', f))
    if not m:
        sys.exit(f'Unexpected file name: {f}')
    name, kind, ext = m.groups()
    slug = re.sub(r'[^a-z0-9]+', '-', name.lower().replace('pose', '')).strip('-')
    shutil.copy2(os.path.join(src, f), os.path.join(out, f'{slug}-{kind}.{ext}'))
EOF

for clip in "$work"/clips/*-horizontal.mp4; do
  ffmpeg -v error -y -ss 3 -i "$clip" -frames:v 1 -vf scale=960:-2 -q:v 4 "$work/posters/${${clip:t}%-horizontal.mp4}.jpg"
done

mkdir -p "$work/web"
web() { # web <transparent clip> <output name, no extension>
  local src=$1 name=$2
  local vf='scale=-2:960:flags=lanczos,fps=30'
  ffmpeg -v error -y -i "$src" -vf "$vf" -an \
    -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 34 -row-mt 1 -deadline good -cpu-used 3 "$work/web/$name.webm"
  ffmpeg -v error -y -i "$src" -vf "$vf,format=bgra" -an \
    -c:v hevc_videotoolbox -alpha_quality 0.8 -b:v 1800k -tag:v hvc1 -movflags +faststart "$work/web/$name.mov"
}
for clip in "$work"/clips/*-transparent.mov; do
  web "$clip" "${${clip:t}%-transparent.mov}"
done

zip_name=personal-best-iphone-duo-clips.zip
(cd "$work" && zip -q -r -0 "$zip_name" clips)

put() { # put <file> <key> <content-type> [disposition]
  local args=(r2 object put "$bucket/$2" --remote --file "$1" --content-type "$3" --cache-control 'public, max-age=3600')
  [[ -n ${4:-} ]] && args+=(--content-disposition "$4")
  npx wrangler "${args[@]}" >/dev/null
  echo "  $2"
}

echo "Uploading to $bucket/$prefix:"
for f in "$work"/clips/*; do
  case $f in
    *.mov) type=video/quicktime ;;
    *) type=video/mp4 ;;
  esac
  put "$f" "$prefix/clips/${f:t}" "$type" "attachment; filename=\"personal-best-${f:t}\""
done
for f in "$work"/posters/*.jpg; do
  put "$f" "$prefix/posters/${f:t}" image/jpeg
done
put "$work/$zip_name" "$prefix/$zip_name" application/zip "attachment; filename=\"$zip_name\""
for f in "$work"/web/*.webm; do put "$f" "$prefix/web/${f:t}" video/webm; done
for f in "$work"/web/*.mov; do put "$f" "$prefix/web/${f:t}" video/quicktime; done
