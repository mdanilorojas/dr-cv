/**
 * Huly-landing runtime: scroll state, hero mask cursor reveal, copy-email.
 */
export const HULY_SCRIPT = `
(function(){
  "use strict";

  // nav: add .is-scrolled when page scrolled past hero top
  var nav = document.querySelector('.hl-nav');
  function onScroll(){
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else                     nav.classList.remove('is-scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // hero mask — cursor-reactive circle reveal
  var hero = document.querySelector('.hl-section--hero');
  var mask = document.querySelector('.hl-hero__mask');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (hero && mask && !reduceMotion) {
    hero.addEventListener('mousemove', function(e){
      var r = hero.getBoundingClientRect();
      var x = ((e.clientX - r.left) / r.width) * 100;
      var y = ((e.clientY - r.top)  / r.height) * 100;
      mask.style.setProperty('--hl-mask-x', x + '%');
      mask.style.setProperty('--hl-mask-y', y + '%');
      mask.style.setProperty('--hl-mask-size', '420px');
    });
    hero.addEventListener('mouseleave', function(){
      mask.style.setProperty('--hl-mask-size', '0px');
    });
  }

  // copy-email
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

  // subtle scroll reveal
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
