/**
 * Iframe-based case animations.
 *
 * Each animation is a standalone HTML document living under
 *   assets/animations/gallery/<folder>/<file>-<lang>.html
 * with its own layout, CSS and still images. We embed them in
 * the landing case card (and anywhere else) via <iframe> so the
 * animation's CSS does not collide with the V11 design system.
 *
 * The EN/ES pair is picked by the `lang` parameter.
 */

import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";

interface AnimationSource {
  /** Folder under assets/animations/gallery/. */
  folder: string;
  /** HTML filename prefix — "-en.html" / "-es.html" is appended. */
  filePrefix: string;
  /**
   * Natural width/height of the animation's stage in pixels.
   * The iframe is sized to these dimensions and then CSS-scaled by JS
   * to fit the card aside container.
   */
  naturalWidth: number;
  naturalHeight: number;
  /** Accessible title used for iframe title + fallback. */
  titleEn: string;
  titleEs: string;
}

const ANIMATION_BY_SLUG: Record<string, AnimationSource> = {
  "enregla": {
    folder: "animations-enregla",
    filePrefix: "alt-1-screenshot-to-animation",
    naturalWidth: 820,
    naturalHeight: 640,
    titleEn: "EnRegla — screenshot to live animation",
    titleEs: "EnRegla — screenshot a animación en vivo",
  },
  "life-update-mobile": {
    folder: "animations-life-update",
    filePrefix: "alt-4-live-annotation",
    naturalWidth: 780,
    naturalHeight: 800,
    titleEn: "Life Update Mobile — live annotation",
    titleEs: "Life Update Mobile — anotación en vivo",
  },
  "developer-portal": {
    folder: "animations-te",
    filePrefix: "alt-2-picture-in-picture",
    naturalWidth: 920,
    naturalHeight: 660,
    titleEn: "Developer Portal — picture in picture",
    titleEs: "Developer Portal — picture in picture",
  },
};

interface RenderInput {
  slug: string;
  lang: Lang;
  /** Relative prefix from the rendered HTML back to dist/ root. */
  basePath: string;
}

export function renderIframeAnimation(input: RenderInput): string {
  const { slug, lang, basePath } = input;
  const source = ANIMATION_BY_SLUG[slug];
  if (!source) return "";

  const src = `${basePath}assets/animations/gallery/${source.folder}/${source.filePrefix}-${lang}.html`;
  const title = lang === "en" ? source.titleEn : source.titleEs;
  const ratio = `${source.naturalWidth} / ${source.naturalHeight}`;

  // The iframe is rendered at the animation's natural stage size so its
  // internal layout (which uses fixed pixel dimensions) never triggers
  // scrollbars. A tiny runtime then CSS-scales the iframe so its full
  // width fits the wrapper, and the wrapper's aspect-ratio reserves the
  // resulting scaled height.
  return `<div class="v11-anim-frame" style="--v11-anim-ratio: ${ratio};" data-anim-fit data-anim-natural-w="${source.naturalWidth}">
  <iframe
    class="v11-anim-frame__iframe"
    src="${escapeHtml(src)}"
    title="${escapeHtml(title)}"
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
    referrerpolicy="no-referrer"
    width="${source.naturalWidth}"
    height="${source.naturalHeight}"
    style="width:${source.naturalWidth}px;height:${source.naturalHeight}px;"
  ></iframe>
</div>`;
}

export const iframeAnimationCss = `
.v11-anim-frame {
  position: relative;
  width: 100%;
  aspect-ratio: var(--v11-anim-ratio, 880 / 620);
  border-radius: var(--v11-radius-card, 10px);
  overflow: hidden;
  border: 1px solid var(--v11-line);
  background: var(--v11-bg-inset, #0D0F13);
  box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.6);
}
.v11-anim-frame__iframe {
  position: absolute;
  top: 0;
  left: 0;
  border: 0;
  display: block;
  background: transparent;
  transform-origin: top left;
  transform: scale(var(--v11-anim-scale, 1));
  /* fallback while JS hasn't measured yet */
  pointer-events: auto;
}
`;

export const iframeAnimationScript = `
(function(){
  // CSS injected into each animation iframe to strip captions, labels,
  // hints, and sibling callouts — only the UI stage (.window / .phone)
  // should render. Also removes stage padding and body centering so the
  // iframe content box hugs the animation's intrinsic size.
  var EMBED_CSS = [
    'html, body { margin:0 !important; padding:0 !important; min-height:0 !important; background:transparent !important; display:block !important; place-items:initial !important; }',
    '.stage { padding:0 !important; gap:0 !important; grid-template-columns:auto !important; display:block !important; text-align:left !important; }',
    '.caption, .alt-label, .hint, .callouts { display:none !important; }',
    /* keep only the primary visual (window OR phone-wrap) */
    '.window { margin:0 !important; }',
    '.phone-wrap { margin:0 !important; }'
  ].join('\\n');

  function fitOne(wrapper){
    var iframe = wrapper.querySelector('iframe');
    if (!iframe) return;
    var doc;
    try { doc = iframe.contentDocument; } catch(_){ return; }
    if (!doc || !doc.body) return;

    // Inject embed CSS once.
    if (!doc.getElementById('v11-embed-style')) {
      var style = doc.createElement('style');
      style.id = 'v11-embed-style';
      style.textContent = EMBED_CSS;
      (doc.head || doc.documentElement).appendChild(style);
    }

    // Measure the primary stage element — fall back to body if absent.
    var target = doc.querySelector('.window')
              || doc.querySelector('.phone-wrap')
              || doc.querySelector('.stage')
              || doc.body;
    var rect = target.getBoundingClientRect();
    var naturalW = Math.max(1, Math.round(rect.width));
    var naturalH = Math.max(1, Math.round(rect.height));

    // Size the iframe to the measured natural box so no scrollbars appear.
    iframe.style.width  = naturalW + 'px';
    iframe.style.height = naturalH + 'px';
    iframe.setAttribute('width', String(naturalW));
    iframe.setAttribute('height', String(naturalH));

    // Update aspect ratio on wrapper so it reserves the right height.
    wrapper.style.setProperty('--v11-anim-ratio', naturalW + ' / ' + naturalH);

    // Apply scale to fit wrapper width.
    var w = wrapper.clientWidth;
    if (!w) return;
    var scale = w / naturalW;
    wrapper.style.setProperty('--v11-anim-scale', String(scale));
  }

  function fitAll(){
    var wrappers = document.querySelectorAll('[data-anim-fit]');
    for (var i = 0; i < wrappers.length; i++) fitOne(wrappers[i]);
  }

  // Hook each iframe's load so we inject + measure as soon as its doc is ready.
  document.querySelectorAll('[data-anim-fit] iframe').forEach(function(iframe){
    iframe.addEventListener('load', function(){
      var wrapper = iframe.closest('[data-anim-fit]');
      if (wrapper) fitOne(wrapper);
    });
    // If already loaded (cache), run now.
    try { if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
      var wrapper = iframe.closest('[data-anim-fit]');
      if (wrapper) fitOne(wrapper);
    }} catch(_){}
  });

  fitAll();
  window.addEventListener('resize', fitAll, { passive: true });
  window.addEventListener('load', fitAll);
  if (typeof ResizeObserver !== 'undefined') {
    var ro = new ResizeObserver(fitAll);
    document.querySelectorAll('[data-anim-fit]').forEach(function(el){ ro.observe(el); });
  }
})();
`;

export function hasIframeAnimation(slug: string): boolean {
  return slug in ANIMATION_BY_SLUG;
}
