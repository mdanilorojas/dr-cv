import type { Identity, Landing } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";

export function renderContactBlock(
  identity: Identity,
  landing: Landing,
  lang: Lang,
): string {
  const cta = lang === "en" ? landing.cta.en : landing.cta.es;
  const copyLabel = lang === "en" ? "Copy email" : "Copiar email";
  const copiedLabel = lang === "en" ? "Copied" : "Copiado";
  const availability = escapeHtml(identity.availability);
  const email = identity.contact.email;

  const socials: Array<[string, string | undefined]> = [
    ["LinkedIn", identity.contact.linkedin],
    ["GitHub", identity.contact.github],
    ["Behance", identity.contact.behance],
  ];
  const socialHtml = socials
    .filter((s): s is [string, string] => typeof s[1] === "string")
    .map(([label, handle]) => {
      const href = handle.startsWith("http") ? handle : `https://${handle}`;
      return `<a class="lp-contact__social" href="${escapeHtml(href)}" rel="noopener" target="_blank">
      <span class="lp-contact__social-label">${escapeHtml(label)}</span>
      <span class="lp-contact__social-handle">${escapeHtml(handle)}</span>
    </a>`;
    })
    .join("\n    ");

  return `<div class="lp-contact">
  <div class="lp-contact__headline">
    <span class="lp-live-dot" aria-hidden="true"></span>
    <span>${availability}</span>
  </div>
  <a class="lp-btn lp-btn--primary lp-btn--large" href="mailto:${escapeHtml(email)}">
    ${escapeHtml(cta)}
    <span class="lp-btn__arrow" aria-hidden="true">→</span>
  </a>
  <div class="lp-contact__email-row">
    <span class="lp-contact__email">${escapeHtml(email)}</span>
    <button
      type="button"
      class="lp-contact__copy"
      data-action="copy-email"
      data-email="${escapeHtml(email)}"
      data-copied-label="${escapeHtml(copiedLabel)}"
      data-copy-label="${escapeHtml(copyLabel)}"
    >${escapeHtml(copyLabel)}</button>
  </div>
  <div class="lp-contact__socials">
    ${socialHtml}
  </div>
</div>`;
}
