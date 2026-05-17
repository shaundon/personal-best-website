(function () {
    const header = document.querySelector('[data-sticky-header]');
    if (header) {
        const threshold = 8;
        let ticking = false;
        const update = () => {
            header.classList.toggle('is-scrolled', window.scrollY > threshold);
            ticking = false;
        };
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

})();
