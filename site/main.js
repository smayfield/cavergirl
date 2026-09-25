// Small progressive enhancements. The page is fully usable without this file.
(function () {
  document.documentElement.classList.add('js');

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Staggered fade-in as elements scroll into view.
  var reveals = document.querySelectorAll('.reveal');
  reveals.forEach(function (el, i) { el.style.setProperty('--i', i % 6); });
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  var hero = document.querySelector('.hero');
  if (!hero || reduceMotion) return;

  // Headlamp follows the pointer (or a touch) across the cavern.
  function aim(x, y) {
    var r = hero.getBoundingClientRect();
    hero.style.setProperty('--lx', (x - r.left) + 'px');
    hero.style.setProperty('--ly', (y - r.top) + 'px');
  }
  hero.addEventListener('pointermove', function (e) { aim(e.clientX, e.clientY); });
  hero.addEventListener('pointerleave', function () {
    hero.style.setProperty('--lx', '50%');
    hero.style.setProperty('--ly', '45%');
  });

  // Dust motes drifting up through the light from above.
  var motes = document.querySelector('.motes');
  if (!motes) return;
  for (var i = 0; i < 24; i++) {
    var m = document.createElement('span');
    m.className = 'mote';
    m.style.left = 35 + Math.random() * 30 + '%';
    m.style.animationDuration = 10 + Math.random() * 12 + 's';
    m.style.animationDelay = -Math.random() * 22 + 's';
    var s = 1.5 + Math.random() * 2.5;
    m.style.width = s + 'px';
    m.style.height = s + 'px';
    motes.appendChild(m);
  }
})();
