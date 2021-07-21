window.onload = function() {
    const heroes = document.querySelectorAll('.hero-left,.hero-right')
    if (heroes && heroes.length > 0) {
        heroes.forEach(function(hero) {
            hero.classList.add('visible');
        })
    }
}