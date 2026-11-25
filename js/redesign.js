/* Çözüm İlaçlama – header davranışı + hero ilaçlama & gezen yeşil böcek animasyonları */
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
  var hero = document.getElementById('hx'), cv = document.getElementById('hx-cv'), inn = document.getElementById('hx-in');
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

  /* ---- Ortak Yeşil İkon Böcek Çizimi (6 eklemli bacak + anten + gövde animasyonu) ---- */
  function drawGreenBug(c, b) {
    c.save();
    c.translate(b.x, b.y);
    c.rotate(b.angle + (b.hit ? Math.sin(b.hitTick * 0.9) * 0.25 : 0));
    c.scale(b.scale, b.scale);
    c.globalAlpha = b.alpha;

    var s = b.size;
    var w = b.walkPhase;
    var strokeCol = '#147a55';
    var fillCol = '#1D976C';
    var darkCol = '#0e5f44';

    // 6 Eklemli Bacak (Tripod yürüyüş fazları: sol ön/arka + sağ orta = +1, diğerleri = -1)
    c.strokeStyle = strokeCol;
    c.lineCap = 'round';
    c.lineJoin = 'round';
    c.lineWidth = Math.max(1.3, s * 0.11);

    var legMounts = [
      { ax: s * 0.34, ay: -s * 0.24, baseA: -0.95, side: -1, phase: 0 },
      { ax: s * 0.02, ay: -s * 0.30, baseA: -1.55, side: -1, phase: Math.PI },
      { ax: -s * 0.32, ay: -s * 0.26, baseA: -2.15, side: -1, phase: 0 },
      { ax: s * 0.34, ay: s * 0.24, baseA: 0.95, side: 1, phase: Math.PI },
      { ax: s * 0.02, ay: s * 0.30, baseA: 1.55, side: 1, phase: 0 },
      { ax: -s * 0.32, ay: s * 0.26, baseA: 2.15, side: 1, phase: Math.PI }
    ];

    for (var i = 0; i < legMounts.length; i++) {
      var lm = legMounts[i];
      var swing = Math.sin(w + lm.phase) * 0.36;
      var kneeBend = Math.cos(w + lm.phase) * 0.22;
      var a1 = lm.baseA + swing;
      var len1 = s * 0.48;
      var kx = lm.ax + Math.cos(a1) * len1;
      var ky = lm.ay + Math.sin(a1) * len1;
      var a2 = a1 + lm.side * (0.52 + kneeBend);
      var len2 = s * 0.42;
      var tx = kx + Math.cos(a2) * len2;
      var ty = ky + Math.sin(a2) * len2;

      c.beginPath();
      c.moveTo(lm.ax, lm.ay);
      c.lineTo(kx, ky);
      c.lineTo(tx, ty);
      c.stroke();
    }

    // Antenler (hafif salınımlı)
    var antSwing = Math.sin(w * 0.7) * 0.14;
    c.lineWidth = Math.max(1.1, s * 0.085);
    c.beginPath();
    c.moveTo(s * 0.62, -s * 0.11);
    c.quadraticCurveTo(s * 0.95, -s * 0.34 + antSwing * s, s * 1.18, -s * 0.46 + antSwing * s);
    c.moveTo(s * 0.62, s * 0.11);
    c.quadraticCurveTo(s * 0.95, s * 0.34 - antSwing * s, s * 1.18, s * 0.46 - antSwing * s);
    c.stroke();

    // Karın (Abdomen)
    c.fillStyle = fillCol;
    c.beginPath();
    c.ellipse(-s * 0.30, 0, s * 0.52, s * 0.34, 0, 0, Math.PI * 2);
    c.fill();

    // Karın çizgileri (ikon detayı)
    c.strokeStyle = 'rgba(255,255,255,0.35)';
    c.lineWidth = Math.max(1, s * 0.06);
    c.beginPath();
    c.moveTo(-s * 0.18, -s * 0.24);
    c.lineTo(-s * 0.18, s * 0.24);
    c.moveTo(-s * 0.42, -s * 0.26);
    c.lineTo(-s * 0.42, s * 0.26);
    c.stroke();

    // Göğüs (Thorax)
    c.fillStyle = darkCol;
    c.beginPath();
    c.ellipse(s * 0.22, 0, s * 0.24, s * 0.26, 0, 0, Math.PI * 2);
    c.fill();

    // Kafa (Head)
    c.fillStyle = strokeCol;
    c.beginPath();
    c.arc(s * 0.52, 0, s * 0.18, 0, Math.PI * 2);
    c.fill();

    c.restore();
  }

  function spawnBug(W, H, fromEdge, avoidLeftZone, baseAlpha) {
    var size = 10 + Math.random() * 6;
    var speed = 0.65 + Math.random() * 0.75;
    var x, y, angle;

    if (fromEdge) {
      var side = avoidLeftZone ? Math.floor(Math.random() * 3) : Math.floor(Math.random() * 4);
      // 0: sağ, 1: üst, 2: alt, 3: sol
      if (side === 0) {
        x = W + 24;
        y = H * (0.12 + Math.random() * 0.76);
        angle = Math.PI + (Math.random() - 0.5) * 0.9;
      } else if (side === 1) {
        x = W * (avoidLeftZone ? (0.42 + Math.random() * 0.52) : (0.1 + Math.random() * 0.8));
        y = -24;
        angle = Math.PI * 0.5 + (Math.random() - 0.5) * 0.9;
      } else if (side === 2) {
        x = W * (avoidLeftZone ? (0.42 + Math.random() * 0.52) : (0.1 + Math.random() * 0.8));
        y = H + 24;
        angle = -Math.PI * 0.5 + (Math.random() - 0.5) * 0.9;
      } else {
        x = -24;
        y = H * (0.12 + Math.random() * 0.76);
        angle = (Math.random() - 0.5) * 0.9;
      }
    } else {
      x = W * (avoidLeftZone ? (0.38 + Math.random() * 0.58) : (0.08 + Math.random() * 0.84));
      y = H * (0.12 + Math.random() * 0.76);
      angle = Math.random() * Math.PI * 2;
    }

    return {
      x: x,
      y: y,
      angle: angle,
      turnVel: (Math.random() - 0.5) * 0.025,
      speed: speed,
      size: size,
      scale: 1,
      walkPhase: Math.random() * Math.PI * 2,
      baseAlpha: baseAlpha,
      alpha: baseAlpha,
      hit: false,
      hitTick: 0
    };
  }

  function stepBug(b, W, H) {
    if (b.hit) {
      b.hitTick++;
      b.alpha -= 0.032;
      b.scale = Math.max(0, b.scale - 0.045);
      b.x += Math.cos(b.angle) * b.speed * 0.3;
      b.y += Math.sin(b.angle) * b.speed * 0.3;
      return b.alpha > 0.02;
    }

    b.turnVel += (Math.random() - 0.5) * 0.008;
    b.turnVel = Math.max(-0.04, Math.min(0.04, b.turnVel));
    b.angle += b.turnVel;
    b.x += Math.cos(b.angle) * b.speed;
    b.y += Math.sin(b.angle) * b.speed;
    b.walkPhase += b.speed * 0.38;

    // Ekran dışına çıkarsa geri döndür
    if (b.x < -45 || b.x > W + 45 || b.y < -45 || b.y > H + 45) {
      return false;
    }
    return true;
  }

  /* ---- HERO: Soldan İlaç Püskürtmesi + Gezen Yeşil Böcekler (Sprey Değince Kaybolur) ---- */
  if (hero && cv) {
    var c = cv.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 2), W = 0, H = 0, mist = [], t = 0, run = true;
    var heroBugs = [];
    var HERO_BUG_COUNT = 13;

    function sizeHero() {
      W = hero.clientWidth;
      H = hero.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    sizeHero();
    window.addEventListener('resize', sizeHero);

    for (var hb = 0; hb < HERO_BUG_COUNT; hb++) {
      heroBugs.push(spawnBug(W, H, false, true, 0.26));
    }

    function puff(x, y, v) {
      mist.push({
        x: x,
        y: y,
        vx: (0.65 + Math.random() * 0.85) * v,
        vy: (Math.random() - 0.5) * v * 0.85,
        r: 18 + Math.random() * 26,
        a: 0.24,
        g: 0.52 + Math.random() * 0.52
      });
    }

    function frameHero() {
      t++;
      c.clearRect(0, 0, W, H);

      if (t % 3 === 0) {
        puff(-10, H * (0.5 + 0.26 * Math.sin(t / 130)), 2.3 + p * 2.5);
      }

      // Sprey partikülleri
      for (var i = mist.length - 1; i >= 0; i--) {
        var m = mist[i];
        m.x += m.vx;
        m.y += m.vy - 0.08;
        m.r += m.g;
        m.a -= 0.00145;
        if (m.a <= 0 || m.x > W + 90) {
          mist.splice(i, 1);
          continue;
        }
        var g = c.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r);
        g.addColorStop(0, 'rgba(29,151,108,' + (m.a * 0.58) + ')');
        g.addColorStop(1, 'rgba(29,151,108,0)');
        c.fillStyle = g;
        c.beginPath();
        c.arc(m.x, m.y, m.r, 0, 6.283);
        c.fill();
      }

      // Böcekleri güncelle ve sprey çarpışmasını kontrol et
      for (var j = heroBugs.length - 1; j >= 0; j--) {
        var bug = heroBugs[j];
        if (!bug.hit && mist.length) {
          for (var k = 0; k < mist.length; k += 2) {
            var mp = mist[k];
            if (mp.a < 0.04) continue;
            var dx = bug.x - mp.x;
            var dy = bug.y - mp.y;
            var hitR = mp.r * 0.85;
            if (dx * dx + dy * dy < hitR * hitR) {
              bug.hit = true;
              break;
            }
          }
        }

        if (!stepBug(bug, W, H)) {
          heroBugs[j] = spawnBug(W, H, true, true, 0.26);
        } else {
          drawGreenBug(c, bug);
        }
      }
    }

    function loopHero() {
      if (!run) return;
      frameHero();
      requestAnimationFrame(loopHero);
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        var was = run;
        run = e[0].isIntersecting;
        if (run && !was && !rm) loopHero();
      }).observe(hero);
    }

    if (rm) {
      for (var n = 0; n < 30; n++) puff(Math.random() * W * 0.6, H * 0.5, 1);
      frameHero();
    } else {
      loopHero();
    }
  }

  /* ---- HERO BÖLÜMÜ (#hx): Arka Plan Filigran Görseli ---- */
  if (hero && !hero.querySelector('.sx-wm')) {
    var wm = document.createElement('div');
    wm.className = 'sx-wm';
    wm.setAttribute('aria-hidden', 'true');
    hero.insertBefore(wm, hero.firstChild);
  }

  /* ---- DİĞER TÜM BÖLÜMLER (.sx): Arka Planda Gezen Yeşil İkon Böcekler ---- */
  if (!rm) {
    var sections = document.querySelectorAll('section.sx:not(#hx)');
    sections.forEach(function (sec) {
      var scv = document.createElement('canvas');
      scv.className = 'sx-bugs-cv';
      scv.setAttribute('aria-hidden', 'true');
      sec.insertBefore(scv, sec.firstChild);

      var sctx = scv.getContext('2d');
      var sdpr = Math.min(window.devicePixelRatio || 1, 2);
      var sW = 0, sH = 0, sRun = false, rafId = null;
      var bugs = [];
      var count = sec.classList.contains('cta-band') ? 6 : 8;

      function sizeSec() {
        sW = sec.clientWidth;
        sH = sec.clientHeight;
        scv.width = sW * sdpr;
        scv.height = sH * sdpr;
        sctx.setTransform(sdpr, 0, 0, sdpr, 0, 0);
      }
      sizeSec();
      window.addEventListener('resize', sizeSec);

      for (var b = 0; b < count; b++) {
        bugs.push(spawnBug(sW, sH, false, false, 0.14));
      }

      function loopSec() {
        if (!sRun) return;
        sctx.clearRect(0, 0, sW, sH);
        for (var i = 0; i < bugs.length; i++) {
          if (!stepBug(bugs[i], sW, sH)) {
            bugs[i] = spawnBug(sW, sH, true, false, 0.14);
          }
          drawGreenBug(sctx, bugs[i]);
        }
        rafId = requestAnimationFrame(loopSec);
      }

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          var visible = entries[0].isIntersecting;
          if (visible && !sRun) {
            sRun = true;
            sizeSec();
            loopSec();
          } else if (!visible && sRun) {
            sRun = false;
            if (rafId) cancelAnimationFrame(rafId);
          }
        }, { rootMargin: '100px 0px' }).observe(sec);
      } else {
        sRun = true;
        loopSec();
      }
    });
  }
})();
