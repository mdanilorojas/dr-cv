/**
 * Huly-landing runtime: nav state, CTA cursor-follow glow, hero beam particles,
 * copy-email, reveal-on-scroll.
 */
export const HULY_SCRIPT = `
(function(){
  "use strict";

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============== nav scroll state ============== */
  var nav = document.querySelector('.hl-nav');
  function onScroll(){
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else                     nav.classList.remove('is-scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ============== CTA cursor-follow glow ============== */
  document.querySelectorAll('.hl-cta').forEach(function(cta){
    cta.addEventListener('pointermove', function(e){
      var r = cta.getBoundingClientRect();
      var x = ((e.clientX - r.left) / r.width) * 100;
      var y = ((e.clientY - r.top)  / r.height) * 100;
      cta.style.setProperty('--hl-mx', x + '%');
      cta.style.setProperty('--hl-my', y + '%');
    });
    cta.addEventListener('pointerleave', function(){
      cta.style.setProperty('--hl-mx', '50%');
      cta.style.setProperty('--hl-my', '50%');
    });
  });

  /* ============== hero beam — ascending particles ============== */
  var canvas = document.querySelector('.hl-hero__particles');
  if (canvas && !reduceMotion) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, parts = [], rafId = 0;

    function resize(){
      W = canvas.width  = canvas.offsetWidth  * dpr;
      H = canvas.height = canvas.offsetHeight * dpr;
    }
    resize();
    window.addEventListener('resize', resize);

    function spawn(initial){
      return {
        x: W/2 + (Math.random() - 0.5) * 110 * dpr,
        y: initial ? Math.random() * H : H + Math.random() * 40,
        vy: -(0.25 + Math.random() * 0.95) * dpr,
        r: (0.4 + Math.random() * 1.6) * dpr,
        life: 0,
        max: 220 + Math.random() * 320,
        tint: Math.random() < 0.18 ? 'warm' : 'cool'
      };
    }
    for (var i = 0; i < 48; i++) parts.push(spawn(true));

    function tick(){
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < parts.length; i++){
        var p = parts[i];
        p.y += p.vy;
        p.life++;
        p.x += Math.sin(p.life * 0.02) * 0.25 * dpr;
        var a = Math.min(1, p.life / 40) * Math.max(0, 1 - p.life / p.max);
        if (p.tint === 'warm') {
          ctx.fillStyle = 'rgba(255, 210, 180,' + (a * 0.85) + ')';
        } else {
          ctx.fillStyle = 'rgba(220, 230, 255,' + (a * 0.85) + ')';
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.fill();
        if (p.life > p.max || p.y < -10) parts[i] = spawn(false);
      }
      rafId = requestAnimationFrame(tick);
    }
    tick();

    // pause when hero leaves viewport
    if ('IntersectionObserver' in window) {
      var hero = document.querySelector('.hl-section--hero');
      if (hero) {
        var pio = new IntersectionObserver(function(entries){
          entries.forEach(function(en){
            if (en.isIntersecting && !rafId) tick();
            else if (!en.isIntersecting && rafId) {
              cancelAnimationFrame(rafId);
              rafId = 0;
            }
          });
        }, { threshold: 0 });
        pio.observe(hero);
      }
    }
  }

  /* ============== copy-email ============== */
  document.addEventListener('click', function(e){
    var btn = e.target && e.target.closest ? e.target.closest('[data-action="copy-email"]') : null;
    if (!btn) return;
    var email = btn.getAttribute('data-email') || '';
    var copiedLabel = btn.getAttribute('data-copied-label') || 'Copied';
    var copyLabel   = btn.getAttribute('data-copy-label')   || 'Copy email';

    function flash(){
      btn.textContent = copiedLabel;
      btn.setAttribute('data-copied', 'true');
      setTimeout(function(){
        btn.textContent = copyLabel;
        btn.removeAttribute('data-copied');
      }, 1800);
    }
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(email).then(flash, function(){
        window.prompt(copyLabel, email);
      });
    } else {
      window.prompt(copyLabel, email);
    }
  });

  /* ============== reveal on scroll ============== */
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach(function(el){ io.observe(el); });
  }
})();
`;
