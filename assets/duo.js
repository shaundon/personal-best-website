// The /duo page's interactive devices: each [data-duo-stage] gets a segmented
// pose control, one option per shot, and fades out the current shot before
// fading in the chosen one. A stage with data-demo also gets a "Watch demo"
// button that plays that clip in the same frame.
(function () {
    const media = 'https://media.getpersonalbest.com/duo/web/';

    // Transparent video needs HEVC with alpha on WebKit (Safari, and every
    // browser on iOS) and VP9 with alpha everywhere else. Chrome on a Mac can
    // decode HEVC too, but drops its alpha, so this goes by engine rather than
    // canPlayType.
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const safari = /^((?!chrome|chromium|crios|fxios|edg|android).)*safari/i.test(navigator.userAgent);
    const ext = ios || safari ? 'mov' : 'webm';

    function clip(name) {
        const video = document.createElement('video');
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';
        video.setAttribute('aria-hidden', 'true');
        video.src = `${media}${name}.${ext}`;
        return video;
    }

    const poses = {
        // Passport-shaped: rounder on the right, where the hinge isn't.
        closed: { name: 'Closed', icon: '<path d="M8 4h6a3.5 3.5 0 0 1 3.5 3.5v9a3.5 3.5 0 0 1-3.5 3.5H8a1.5 1.5 0 0 1-1.5-1.5v-13A1.5 1.5 0 0 1 8 4z"/>' },
        // Portrait and landscape follow Tabler's device-ipad and device-ipad-horizontal.
        portrait: { name: 'Portrait', icon: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 18h6"/>' },
        landscape: { name: 'Landscape', icon: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M9 15h6"/>' },
        seated: { name: 'Seated', icon: '<rect x="5" y="4" width="14" height="10" rx="2"/><path d="M5 14 3 19h18l-2-5"/>' },
    };
    const fade = 250; // matches the opacity transition in main.scss
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    document.querySelectorAll('[data-duo-stage]').forEach((stage) => {
        const shots = Array.from(stage.querySelectorAll('.duo-stage__shots > [data-pose]'));
        if (shots.length < 2) return;
        let current = shots.find((s) => s.classList.contains('is-active')) || shots[0];
        current.classList.add('is-active');
        let pending = 0;

        const control = document.createElement('div');
        control.className = 'duo-poses';
        control.setAttribute('role', 'group');
        control.setAttribute('aria-label', `${stage.dataset.label} pose`);
        const indicator = document.createElement('span');
        indicator.className = 'duo-poses__indicator';
        indicator.setAttribute('aria-hidden', 'true');
        control.appendChild(indicator);

        const buttons = shots.map((shot) => {
            const pose = poses[shot.dataset.pose];
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'duo-poses__option';
            b.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${pose.icon}</svg>${pose.name}`;
            b.addEventListener('click', () => show(shot));
            control.appendChild(b);
            return b;
        });
        const controls = document.createElement('div');
        controls.className = 'duo-stage__controls';
        controls.appendChild(control);
        stage.querySelector('.duo-stage__shots').after(controls);

        // The demo plays in the shots' own slot, so it fades in and out like
        // another pose. It's made on first tap, so the page loads no video.
        let demo = null;
        let lastShot = current;
        const demoButton = stage.dataset.demo ? document.createElement('button') : null;
        let demoNote = null;
        if (demoButton) {
            demoButton.type = 'button';
            demoButton.className = 'duo-demo';
            controls.appendChild(demoButton);
            // A footnote under the controls, shown only while the demo plays. Its
            // text comes from data-demo-note on the figure.
            demoNote = document.createElement('p');
            demoNote.className = 'duo-demo-note';
            demoNote.textContent = stage.dataset.demoNote || '';
            controls.after(demoNote);
            demoButton.addEventListener('click', () => {
                if (current === demo) {
                    show(lastShot);
                    return;
                }
                if (!demo) {
                    demo = clip(stage.dataset.demo);
                    stage.querySelector('.duo-stage__shots').appendChild(demo);
                    demo.addEventListener('ended', () => show(lastShot));
                }
                demo.currentTime = 0;
                show(demo);
            });
        }

        function label() {
            if (!demoButton) return;
            const playing = current === demo;
            demoButton.innerHTML = playing
                ? '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>Stop demo'
                : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>Watch demo';
            demoButton.setAttribute('aria-pressed', String(playing));
            demoNote.classList.toggle('is-visible', playing);
            demoNote.setAttribute('aria-hidden', String(!playing));
        }

        function press(shot) {
            control.classList.toggle('is-idle', !shots.includes(shot));
            buttons.forEach((b, i) => {
                const on = shots[i] === shot;
                b.setAttribute('aria-pressed', String(on));
                if (on) {
                    indicator.style.width = `${b.offsetWidth}px`;
                    indicator.style.transform = `translateX(${b.offsetLeft}px)`;
                }
            });
            label();
        }

        async function show(next) {
            if (next === current) return;
            const ticket = ++pending;
            const leaving = current;
            if (shots.includes(next)) lastShot = next;
            current = next;
            press(next);
            leaving.classList.remove('is-active');
            if (leaving === demo) setTimeout(() => demo.pause(), fade);
            // Wait out the fade and, for an image, its decode (for the demo, enough
            // of the video to start), so it fades in whole.
            const ready = next === demo
                ? (demo.readyState >= 3 ? null : new Promise((r) => demo.addEventListener('canplay', r, { once: true })))
                : next.decode ? next.decode().catch(() => {}) : null;
            const waits = [ready];
            if (!reduceMotion.matches) waits.push(new Promise((r) => setTimeout(r, fade)));
            await Promise.all(waits);
            if (ticket !== pending) return;
            next.classList.add('is-active');
            if (next === demo) demo.play().catch(() => show(lastShot));
        }

        // Place the highlight without sliding in from the left, then keep it
        // aligned as fonts load and the control resizes.
        indicator.style.transition = 'none';
        press(current);
        requestAnimationFrame(() => { indicator.style.transition = ''; });
        new ResizeObserver(() => press(current)).observe(control);
    });

})();
