import type { SkillsSheetData, Skill, SkillAxis } from "../lib/types.js";

export type Lang = "en" | "es";

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderSkillItem(s: Skill): string {
  const cls = s.level === "learning" ? ' class="learn"' : "";
  return `<li${cls}>${escapeHtml(s.name)}</li>`;
}

function renderAxisGroup(group: { title: string; skills: Skill[] }): string {
  const mastered = group.skills.filter((s) => s.level === "mastered").length;
  const learning = group.skills.filter((s) => s.level === "learning").length;
  const count = `${mastered} mastered · ${learning} learning`;
  return `
    <div class="group">
      <div class="group__head">
        <span class="group__title">${escapeHtml(group.title)}</span>
        <span class="group__count">${escapeHtml(count)}</span>
      </div>
      <ul class="group__list">
        ${group.skills.map(renderSkillItem).join("\n")}
      </ul>
    </div>`;
}

function renderAxis(axis: SkillAxis): string {
  return `
    <div class="ss-col">
      <header class="ss-col-head">
        <span class="name">${escapeHtml(axis.name)}</span>
        <span class="axis">${escapeHtml(axis.axis)}</span>
      </header>
      ${axis.groups.map(renderAxisGroup).join("\n")}
    </div>`;
}

export function renderPage1(data: SkillsSheetData, lang: Lang): string {
  const { identity, positioning, skills } = data;
  const availability = escapeHtml(identity.availability);

  const proof = positioning.proofNumbers
    .map((p) => {
      const valueHtml = `${escapeHtml(p.value)}${p.unit ? `<span class="accent">${escapeHtml(p.unit)}</span>` : ""}`;
      const label = lang === "en" ? p.labelEn : p.labelEs;
      return `
        <div>
          <div class="n">${valueHtml}</div>
          <div class="l">${escapeHtml(label)}</div>
        </div>`;
    })
    .join("\n");

  const lead = lang === "en"
    ? `<span>${escapeHtml(positioning.thesis.en)}</span> <span class="faint">${escapeHtml(positioning.tagline.en)}</span>`
    : `<span>${escapeHtml(positioning.thesis.es)}</span> <span class="faint">${escapeHtml(positioning.tagline.es)}</span>`;

  const nameParts = identity.name.split(" ");
  const firstNames = nameParts.slice(0, -1).join(" ");
  const lastName = nameParts.slice(-1)[0] ?? "";

  return `
<article class="page">
  <div class="ss">

    <header class="ss-head">
      <div>
        <span class="eyebrow">skills sheet · v1.0 · 2026.05</span>
        <h1>${escapeHtml(firstNames)} <span class="accent">${escapeHtml(lastName)}</span>
          <span class="tag">${escapeHtml(identity.role)}</span>
        </h1>
      </div>
      <div class="meta">
        <div>${escapeHtml(identity.location)}</div>
        <div>${escapeHtml(identity.languages)}</div>
        <div>${availability}</div>
      </div>
    </header>

    <section class="ss-intro">
      <p class="lead">${lead}</p>
      <div class="proof">
        ${proof}
      </div>
    </section>

    <section class="ss-body">
      ${renderAxis(skills.byLayer)}
      ${renderAxis(skills.byOutcome)}
    </section>

    <footer class="ss-foot">
      <div class="left">
        <span class="legend">
          <span class="dot"></span><span>${lang === "en" ? "Mastered · defensible" : "Dominada · defendible"}</span>
          <span class="dot hollow"></span><span>${lang === "en" ? "Learning · honest" : "En curso · honesta"}</span>
        </span>
      </div>
      <div class="pills">
        ${identity.contact.github ? `<span class="k">${escapeHtml(identity.contact.github)}</span>` : ""}
        <span class="k">${escapeHtml(identity.contact.email)}</span>
      </div>
    </footer>

  </div>
</article>`;
}
