import type { Identity } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";

export type CvVariant = "warm" | "serious" | "bairesdev";

export interface IdentityBlockOptions {
  variant: CvVariant;
  lang: Lang;
}

function splitName(name: string): { first: string; last: string } {
  const parts = name.split(" ");
  return {
    first: parts.slice(0, -1).join(" "),
    last: parts.slice(-1)[0] ?? "",
  };
}

function roleForVariant(identity: Identity, variant: CvVariant): string {
  if (variant === "bairesdev") {
    return "Product Designer & Engineer · 15+ years";
  }
  return identity.role;
}

function renderContactRow(identity: Identity): string {
  const c = identity.contact;
  const items: string[] = [];
  items.push(`<span class="cv-identity__contact-item">${escapeHtml(c.email)}</span>`);
  if (c.linkedin) items.push(`<span class="cv-identity__contact-item">${escapeHtml(c.linkedin)}</span>`);
  if (c.github) items.push(`<span class="cv-identity__contact-item">${escapeHtml(c.github)}</span>`);
  if (c.behance) items.push(`<span class="cv-identity__contact-item">${escapeHtml(c.behance)}</span>`);
  return items.join(' · ');
}

export function renderIdentityBlock(identity: Identity, options: IdentityBlockOptions): string {
  const { first, last } = splitName(identity.name);
  const role = escapeHtml(roleForVariant(identity, options.variant));

  const liveDot = options.variant === "warm"
    ? '<span class="cv-identity__live-dot" aria-hidden="true"></span>'
    : "";

  const availability = options.variant === "warm"
    ? `<span class="cv-identity__availability">${liveDot}${escapeHtml(identity.availability)}</span>`
    : `<span class="cv-identity__availability">${escapeHtml(identity.availability)}</span>`;

  return `
<header class="cv-identity cv-identity--${options.variant}">
  <div class="cv-identity__main">
    <h1 class="cv-identity__name">${escapeHtml(first)} <span class="cv-identity__name-accent">${escapeHtml(last)}</span></h1>
    <div class="cv-identity__role">${role}</div>
    ${availability}
  </div>
  <div class="cv-identity__contact">
    ${renderContactRow(identity)}
  </div>
</header>`;
}
