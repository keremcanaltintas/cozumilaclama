/* Çözüm İlaçlama – header davranışı + hero parallax */
(function () {
  'use strict';
  var hd = document.getElementById('siteHeader'), bar = document.getElementById('shBar');
  var nav = document.getElementById('shNav'), bg = document.getElementById('shBurger');

  function closeNav() { if (!nav) return; nav.classList.remove('o'); bg && bg.setAttribute('aria-expanded', 'false'); }
  if (bg && nav) {
    bg.addEventListener('click', function () {
      var o = nav.classList.toggle('o'); bg.setAttribute('aria-expanded', o ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) closeNav(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 1060) closeNav(); });
  }

  /* hero scroll + parallax */
  var hero = document.getElementById('hx'), inn = document.getElementById('hx-in');
  var p = 0, rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (hd) hd.classList.toggle('s', y > 10);
    if (bar) { var m = document.documentElement.scrollHeight - window.innerHeight; bar.style.width = (m > 0 ? y / m * 100 : 0) + '%'; }
    if (hero && inn) {
      var h = hero.offsetHeight; p = Math.min(Math.max(y - hero.offsetTop, 0) / h, 1);
      if (!rm) { inn.style.transform = 'translateY(' + (p * 60) + 'px)'; inn.style.opacity = String(1 - p * .9); }
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* aktif menü bağlantısı */
  var links = nav ? nav.querySelectorAll('a[href^="#"]') : [];
  if ('IntersectionObserver' in window && links.length) {
    var map = {};
    links.forEach(function (a) { var s = document.querySelector(a.getAttribute('href')); if (s) map[s.id] = a; });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) { links.forEach(function (a) { a.classList.remove('on'); }); map[e.target.id].classList.add('on'); }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) { io.observe(document.getElementById(id)); });
  }
})();
