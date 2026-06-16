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
  "life-update-mobile": {
    folder: "animations-life-update",
    filePrefix: "alt-4-live-annotation",
    naturalWidth: 668,
    naturalHeight: 640,
    titleEn: "Life Update Mobile — live annotation",
    titleEs: "Life Update Mobile — anotación en vivo",
  },
  "developer-portal": {
    folder: "animations-te",
    filePrefix: "alt-2-picture-in-picture",
    naturalWidth: 820,
    naturalHeight: 500,
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

  const src = `${basePath}assets/animations/gallery/${source.folder}/${source.filePrefix}-${lang}.html?embed=1`;
  const title = lang === "en" ? source.titleEn : source.titleEs;
  const ratio = `${source.naturalWidth} / ${source.naturalHeight}`;

  // The iframe is rendered at the animation's natural stage size so its
  // internal layout (which uses fixed pixel dimensions) never triggers
  // scrollbars. A tiny runtime then CSS-scales the iframe so its full
  // width fits the wrapper, and the wrapper's aspect-ratio reserves the
  // resulting scaled height.
  return `<div class="v11-anim-frame" style="--v11-anim-ratio: ${ratio};" data-anim-fit data-anim-natural-w="${source.naturalWidth}" data-anim-natural-h="${source.naturalHeight}">
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
  // Pure CSS-transform scaling driven only by the wrapper width and the
  // iframe's declared natural size (data-anim-natural-w + width attr). We
  // never read the iframe document, so this works under file:// and across
  // origins. The embedded animation handles its own chrome-stripping and
  // autoplay via the ?embed=1 flag in its URL.
  // Leave a margin so the stage never touches the frame edges.
  var FILL = 0.82;
  function fitOne(wrapper){
    var iframe = wrapper.querySelector('iframe');
    if (!iframe) return;
    var naturalW = parseFloat(wrapper.getAttribute('data-anim-natural-w'))
                || parseFloat(iframe.getAttribute('width')) || 1;
    var naturalH = parseFloat(wrapper.getAttribute('data-anim-natural-h'))
                || parseFloat(iframe.getAttribute('height')) || naturalW;
    var w = wrapper.clientWidth;
    var h = wrapper.clientHeight;
    if (!w) return;
    var scale = (w / naturalW) * FILL;
    wrapper.style.setProperty('--v11-anim-scale', String(scale));
    // Center the scaled stage within the frame.
    iframe.style.left = Math.max(0, (w - naturalW * scale) / 2) + 'px';
    iframe.style.top  = Math.max(0, (h - naturalH * scale) / 2) + 'px';
  }
  function fitAll(){
    var wrappers = document.querySelectorAll('[data-anim-fit]');
    for (var i = 0; i < wrappers.length; i++) fitOne(wrappers[i]);
  }
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
