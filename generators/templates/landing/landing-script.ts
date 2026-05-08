/**
 * Runtime script for the landing page. ~90 lines of vanilla JS, no deps.
 * Injected inline at the end of <body>.
 */
export const LANDING_SCRIPT = `
(function(){
  "use strict";

  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('[role="tabpanel"]'));
  var TAB_IDS = tabs.map(function(t){ return t.getAttribute('data-tab'); });

  function activateTab(id, opts){
    opts = opts || {};
    if (TAB_IDS.indexOf(id) < 0) id = TAB_IDS[0];
    tabs.forEach(function(t){
      var match = t.getAttribute('data-tab') === id;
      t.setAttribute('aria-selected', match ? 'true' : 'false');
      t.setAttribute('tabindex', match ? '0' : '-1');
      t.classList.toggle('lp-tab--active', match);
    });
    panels.forEach(function(p){
      var match = p.id === 'tabpanel-' + id;
      if (match) { p.removeAttribute('hidden'); }
      else       { p.setAttribute('hidden', ''); }
    });
    if (!opts.skipHash) {
      var hash = '#' + id;
      if (opts.replace) { history.replaceState(null, '', hash); }
      else              { history.pushState(null, '', hash); }
    }
    if (opts.focus){
      var focused = tabs.filter(function(t){ return t.getAttribute('data-tab') === id; })[0];
      if (focused) focused.focus();
    }
  }

  // initial tab from hash (or default)
  var initialHash = (location.hash || '').replace('#','');
  activateTab(initialHash || TAB_IDS[0], { replace: true, skipHash: !initialHash });

  // click handlers — also catch brand + in-copy anchors with data-tab
  document.addEventListener('click', function(e){
    var trigger = e.target && e.target.closest ? e.target.closest('[data-tab]') : null;
    if (!trigger) return;
    var id = trigger.getAttribute('data-tab');
    if (TAB_IDS.indexOf(id) < 0) return;
    e.preventDefault();
    activateTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // keyboard nav on tablist (arrow / home / end / enter / space)
  document.addEventListener('keydown', function(e){
    if (!e.target || e.target.getAttribute('role') !== 'tab') return;
    var currentIdx = tabs.indexOf(e.target);
    var nextIdx = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextIdx = (currentIdx + 1) % tabs.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') nextIdx = (currentIdx - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = tabs.length - 1;
    else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      activateTab(e.target.getAttribute('data-tab'), { focus: true });
      return;
    } else {
      return;
    }
    e.preventDefault();
    activateTab(tabs[nextIdx].getAttribute('data-tab'), { focus: true });
  });

  // back/forward sync
  window.addEventListener('popstate', function(){
    var id = (location.hash || '').replace('#','') || TAB_IDS[0];
    activateTab(id, { skipHash: true });
  });

  // case expanders
  document.addEventListener('click', function(e){
    var btn = e.target && e.target.closest ? e.target.closest('[data-action="toggle-case"]') : null;
    if (!btn) return;
    var controls = btn.getAttribute('aria-controls');
    if (!controls) return;
    var body = document.getElementById(controls);
    if (!body) return;
    var expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    if (expanded) { body.setAttribute('hidden', ''); }
    else          { body.removeAttribute('hidden'); }
  });

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
})();
`;
