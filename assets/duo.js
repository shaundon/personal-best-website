// The /duo page's interactive devices: each [data-duo-stage] gets a segmented
// pose control, one option per shot, and fades out the current shot before
// fading in the chosen one.
(function () {
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
        stage.querySelector('.duo-stage__shots').after(control);

        function press(shot) {
            buttons.forEach((b, i) => {
                const on = shots[i] === shot;
                b.setAttribute('aria-pressed', String(on));
                if (on) {
                    indicator.style.width = `${b.offsetWidth}px`;
                    indicator.style.transform = `translateX(${b.offsetLeft}px)`;
                }
            });
        }

        async function show(next) {
            if (next === current) return;
            const ticket = ++pending;
            press(next);
            current.classList.remove('is-active');
            current = next;
            // Wait out the fade and, for an image, its decode, so it fades in whole.
            const waits = [next.decode ? next.decode().catch(() => {}) : null];
            if (!reduceMotion.matches) waits.push(new Promise((r) => setTimeout(r, fade)));
            await Promise.all(waits);
            if (ticket === pending) next.classList.add('is-active');
        }

        // Place the highlight without sliding in from the left, then keep it
        // aligned as fonts load and the control resizes.
        indicator.style.transition = 'none';
        press(current);
        requestAnimationFrame(() => { indicator.style.transition = ''; });
        new ResizeObserver(() => press(current)).observe(control);
    });
})();
