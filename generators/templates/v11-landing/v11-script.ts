/**
 * V11 runtime script. Vanilla JS, ~70 lines, no dependencies.
 * Responsibilities: nav scroll state, copy-email, lang-toggle scroll
 * preservation, artifact-frame focus-lock.
 */
export const V11_SCRIPT = `
(function(){
  "use strict";

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* nav scroll state */
  var nav = document.querySelector('.v11-nav');
  function onScroll(){
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else                     nav.classList.remove('is-scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* lang-toggle — preserve hash + scroll target across languages */
  document.querySelectorAll('a.v11-nav__lang').forEach(function(a){
    a.addEventListener('click', function(){
      var href = a.getAttribute('href') || '';
      if (location.hash) {
        a.setAttribute('href', href.split('#')[0] + location.hash);
      }
    });
  });

  /* copy-email */
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

  /* scroll-reveal — only if motion allowed */
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
