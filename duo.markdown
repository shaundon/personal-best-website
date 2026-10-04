---
layout: default
title: 'Personal Best for iPhone Duo'
permalink: /duo
description: "Check out Personal Best's extensive iPhone Duo support."
app_banner: id1510256676
image: /assets/duo/social.jpg
---

<section class="duo-hero container">
  <h1>Unfold your workouts</h1>
  <p class="lede">iPhone Duo + Personal Best. A match made in <strike>heaven</strike> Cupertino.</p>
  <div class="hero__actions">
    <!-- TODO(shaun): add pt=<provider token> so App Analytics attributes the ct=duo-launch campaign -->
    <a class="btn btn--solid" href="https://apps.apple.com/gb/app/personal-best-workouts/id1510256676?ct=duo-launch">Get the app</a>
    <a class="btn btn--ghost" href="#press">For press</a>
  </div>
</section>

<!--
  Each screen section ends in an interactive Duo (a <figure data-duo-stage>). Inside
  .duo-stage__shots, add one image per pose, in the order the buttons should appear:
    <img data-pose="seated" src="/assets/duo/replay-seated.png" alt="Replay on iPhone Duo, seated">
  data-pose is one of: closed, portrait, landscape, seated. A button appears for each one present.
  The one with class="is-active" shows first (and is all that shows without JavaScript).
  Shots share a fixed-height slot, so poses with different canvas sizes don't make the page jump.
  data-demo="<name>" on the figure adds a "Watch demo" button that plays duo/web/<name> from R2
  (made by scripts/publish-duo-clips.sh) in the same slot; data-demo-note is the footnote shown
  under the selector while it plays.
  A <div class="duo-stage__placeholder" data-pose="…">Label</div> can stand in for a missing shot.
-->

<section class="duo-intro container">
<p>I've updated Personal Best – my workout coaching app for iOS – to fully support iPhone Duo. Read on for more.</p>
</section>

<section id="press" class="duo-press-wrap container">
  <div class="duo-press">
    <h2>Covering iPhone Duo?</h2>
    <p>If you're a creator looking for apps that make the most of iPhone Duo, then look no further.</p>
    <p>I'm an indie developer working to build the best fitness app for iOS, and I'd be honoured if you'd consider sharing Personal Best with your audience.</p>
    <div class="duo-press__items">
      <div class="duo-press__item">
        <h3>Get the beta</h3>
        <div class="duo-press__body">
          <p><a href="https://testflight.apple.com/join/tfESCDKB">Download Personal Best v21 from TestFlight</a></p>
        </div>
      </div>
      <div class="duo-press__item">
        <h3>Enter demo mode</h3>
        <div class="duo-press__body">
          <p>If you don't have workouts to test with (no shame), enable demo mode at <em>Settings > version number > Secret demo mode</em>. Or visit <a href="personalbest://demo">personalbest://demo</a> to enable it as if by magic.</p>
        </div>
      </div>
      <div class="duo-press__item">
        <h3>Downloads</h3>
        <div class="duo-press__body">
          <p><a href="/press#iphone-duo">Screenshots</a> · <a href="/press#videos">Screen recordings (video)</a></p>
        </div>
      </div>
      <div class="duo-press__item">
        <h3>Other resources</h3>
        <div class="duo-press__body">
          <p>Visit the <a href="/press">press kit</a> to learn more about Personal Best.</p>
          <p><a href="mailto:shaun@getpersonalbest.com">Email</a> or <a href="https://instagram.com/shaundon">DM me</a> to chat.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="duo-feature container">
  <h2>Workout replays</h2>
  <p>Your workouts come to life with a side-by-side layout. With Duo in seated mode, replays transform to an all new laptop-style layout.</p>
  <figure class="duo-stage" data-duo-stage data-label="Replay" data-demo="replay-seated" data-demo-note="Recorded from a simulator, excuse any jankiness. It's much smoother on a real device.">
    <div class="duo-stage__shots">
      <img data-pose="closed" src="/assets/duo/replay/closed.webp" alt="Replay on iPhone Duo, closed" loading="lazy" decoding="async">
      <img data-pose="portrait" src="/assets/duo/replay/portrait.webp" alt="Replay on iPhone Duo, open in portrait" loading="lazy" decoding="async">
      <img data-pose="landscape" src="/assets/duo/replay/landscape.webp" alt="Replay on iPhone Duo, open in landscape" loading="lazy" decoding="async">
      <img class="is-active" data-pose="seated" src="/assets/duo/replay/seated.webp" alt="Replay on iPhone Duo, seated" loading="lazy" decoding="async">
    </div>
  </figure>
</section>

<section class="duo-feature container">
  <h2>Sharing</h2>
  <p>Bragging about your workouts on social media has never looked this good.</p>
  <figure class="duo-stage" data-duo-stage data-label="Sharing" data-demo="sharing" data-demo-note="Recorded from a simulator, excuse any jankiness. It's much smoother on a real device.">
    <div class="duo-stage__shots">
      <img data-pose="closed" src="/assets/duo/sharing/closed.webp" alt="Sharing on iPhone Duo, closed" loading="lazy" decoding="async">
      <img data-pose="portrait" src="/assets/duo/sharing/portrait.webp" alt="Sharing on iPhone Duo, open in portrait" loading="lazy" decoding="async">
      <img data-pose="landscape" src="/assets/duo/sharing/landscape.webp" alt="Sharing on iPhone Duo, open in landscape" loading="lazy" decoding="async">
      <img class="is-active" data-pose="seated" src="/assets/duo/sharing/seated.webp" alt="Sharing on iPhone Duo, seated" loading="lazy" decoding="async">
    </div>
  </figure>
</section>

<section class="duo-feature container">
  <h2>Today</h2>
  <p>More space for your daily check in.</p>
  <figure class="duo-stage" data-duo-stage data-label="Today" data-demo="today" data-demo-note="Recorded from a simulator, excuse any jankiness. It's much smoother on a real device.">
    <div class="duo-stage__shots">
      <img data-pose="closed" src="/assets/duo/today/closed.webp" alt="Today on iPhone Duo, closed" loading="lazy" decoding="async">
      <img class="is-active" data-pose="portrait" src="/assets/duo/today/portrait.webp" alt="Today on iPhone Duo, open in portrait" loading="lazy" decoding="async">
      <img data-pose="landscape" src="/assets/duo/today/landscape.webp" alt="Today on iPhone Duo, open in landscape" loading="lazy" decoding="async">
    </div>
  </figure>
</section>

<section class="duo-feature container">
  <h2>Workouts list</h2>
  <p>Get monthly and yearly summaries alongside your latest workouts.</p>
  <figure class="duo-stage" data-duo-stage data-label="Workouts" data-demo="workouts" data-demo-note="Recorded from a simulator, excuse any jankiness. It's much smoother on a real device.">
    <div class="duo-stage__shots">
      <img data-pose="closed" src="/assets/duo/workouts/closed.webp" alt="Workouts on iPhone Duo, closed" loading="lazy" decoding="async">
      <img data-pose="portrait" src="/assets/duo/workouts/portrait.webp" alt="Workouts on iPhone Duo, open in portrait" loading="lazy" decoding="async">
      <img class="is-active" data-pose="landscape" src="/assets/duo/workouts/landscape.webp" alt="Workouts on iPhone Duo, open in landscape" loading="lazy" decoding="async">
    </div>
  </figure>
</section>

<section class="duo-feature container">
  <h2>Viewing workouts</h2>
  <p>See more of your workout at once. And once I get around to rebuilding this screen it'll look even nicer.</p>
  <figure class="duo-stage" data-duo-stage data-label="Workout details" data-demo="workout-details" data-demo-note="Recorded from a simulator, excuse any jankiness. It's much smoother on a real device.">
    <div class="duo-stage__shots">
      <img data-pose="closed" src="/assets/duo/workout-details/closed.webp" alt="Workout details on iPhone Duo, closed" loading="lazy" decoding="async">
      <img data-pose="portrait" src="/assets/duo/workout-details/portrait.webp" alt="Workout details on iPhone Duo, open in portrait" loading="lazy" decoding="async">
      <img class="is-active" data-pose="landscape" src="/assets/duo/workout-details/landscape.webp" alt="Workout details on iPhone Duo, open in landscape" loading="lazy" decoding="async">
    </div>
  </figure>
</section>

<section class="duo-feature container">
  <h2>Summaries</h2>
  <p>More to enjoy. You get the idea at this point.</p>
  <figure class="duo-stage" data-duo-stage data-label="Statistics">
    <div class="duo-stage__shots">
      <img data-pose="closed" src="/assets/duo/statistics/closed.webp" alt="Statistics on iPhone Duo, closed" loading="lazy" decoding="async">
      <img data-pose="portrait" src="/assets/duo/statistics/portrait.webp" alt="Statistics on iPhone Duo, open in portrait" loading="lazy" decoding="async">
      <img class="is-active" data-pose="landscape" src="/assets/duo/statistics/landscape.webp" alt="Statistics on iPhone Duo, open in landscape" loading="lazy" decoding="async">
    </div>
  </figure>
</section>

<section class="duo-intro duo-outro container">
<p>iPhone Duo support for Personal Best will be available on day one of launch.</p>
</section>

<div class="container">
  <section class="cta-band">
    <h2>Make every workout count</h2>
    <p>Download for free on the App Store.</p>
    <a class="btn btn--primary" href="https://apps.apple.com/gb/app/personal-best-workouts/id1510256676?ct=duo-launch">Get the app</a>
  </section>
</div>

<script src="{{ '/assets/duo.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
