import type { CvData, ExperienceItem } from "../../lib/types.js";
import { escapeHtml } from "../skills-sheet-page-1.js";
import { renderIdentityBlock } from "./components/identity-block.js";
import { renderSkillsSidebar } from "./components/skills-sidebar.js";
import { renderExperienceItem } from "./components/experience-item.js";
import { renderCaseCard } from "./components/case-card.js";
import { renderEducationBlock } from "./components/education-block.js";
import { renderSkillsInventory } from "./components/skills-inventory.js";
import { BAIRESDEV_TOKENS, BAIRESDEV_STYLES } from "./bairesdev.js";

// Sharper, ATS-friendlier rewrites of the shared experience copy. These live
// here (not in perfil/data/experience.yaml) so the rewording only affects
// this variant — warm/serious/bairesdev keep the original wording verbatim.
const EXPERIENCE_COPY_V2: Record<string, string> = {
  "Booz Allen Hamilton":
    "Lead design-engineer for the federal Trusted Environments program — own the landing experience, the Developer Portal product, and PM collaboration end-to-end. Architected two parallel design systems (/te-skin, an agent-consumable skill, and TE Black, dark-first) with accessibility audited directly into the design tokens. Built and shipped a SharePoint SPA. Consult cross-team to Army/DoD product groups, with additional support delivered to the FAA and the VA veterans benefits/payment system.",
  "Compliance SaaS · LATAM (independent)":
    "Founded and shipped a multi-site compliance SaaS for LATAM SMBs end-to-end — product strategy, UX, and full-stack delivery. Took it from 0 to a validated 1.0 MVP in production in 40 days: 346 commits, 21 SQL migrations, 31 production UI components, and a cron-driven edge function. Ran a 17-part design-system migration across 5 recursive review rounds, raising the system score from 78.4 to 95.6.",
  "Xentinels DesignOps":
    "Built and led a DesignOps practice inside Central Design, scaling a distributed-yet-centralized design system and token library for enterprise clients (Merck, Mondelēz, Banco Pichincha, Quifatex, Grupo Superior, Moderna Corp., Azzorti, Flamingo CO.). Owned the roadmap, governance, and contribution model that let other teams ship into the system safely.",
  "Arpatel Cia. Ltda.":
    "Co-founded the company and set long-term product strategy. Built the website, CRM templates, and order-management flows; designed and shipped a Retail POS experience (alpha + beta) with prototyped search and scan interaction patterns.",
  "Tecniequipos S.A.":
    "Developed a proprietary event platform and managed e-commerce, reporting, and business-systems administration, delivering production requirements in PHP, JavaScript, HTML, CSS, and MariaDB.",
  "Canadian Bank Note":
    "Administered a regional electrical-network project — supervised installation and inventory management, and designed execution strategy driven by historical data.",
};

function withSharperCopy(item: ExperienceItem): ExperienceItem {
  const override = EXPERIENCE_COPY_V2[item.company];
  return override ? { ...item, descriptionEn: override } : item;
}

function renderCoreCompetencies(): string {
  const line =
    "Product Strategy & Roadmapping · UX Research & Usability Testing · Design Systems & Design Tokens (W3C) · Figma · Design Engineering (TypeScript, React 19, Next.js) · Accessibility (WCAG 2.1 AA) · Agentic UX / LLM-driven workflows (Claude Code, MCP) · SQL · Supabase";
  return `<p class="cv-summary__competencies">${escapeHtml(line)}</p>`;
}

function renderSummaryV2(thesisEn: string): string {
  return `
<section class="cv-summary cv-summary--bairesdev">
  <div class="cv-summary__eyebrow">Professional Summary</div>
  <h2 class="cv-summary__thesis">${escapeHtml(thesisEn)}</h2>
  ${renderCoreCompetencies()}
</section>`;
}

const V2_EXTRA_STYLES = `
.cv-summary__competencies {
  font-size: 8.3pt;
  line-height: 1.5;
  color: var(--ink-muted);
  margin: 0;
}
`;

export function renderBairesdevV2Cv(data: CvData): string {
  const lang = "en" as const;
  const variant = "bairesdev-v2" as const;
  const title = escapeHtml(`${data.identity.name} — CV`);

  // Reverse-chronological work history first — the ATS-standard order —
  // ahead of the supporting case studies.
  const allXp = [...data.experience.current, ...(data.experience.past ?? [])]
    .sort((a, b) => b.startYear - a.startYear)
    .map(withSharperCopy);

  const experienceHtml = allXp
    .map((x) => renderExperienceItem(x, { lang, density: "full" }))
    .join("\n");

  const featured = data.cases.find((c) => c.featured);
  const others = data.cases
    .filter((c) => !c.featured)
    .sort((a, b) => b.yearStart - a.yearStart)
    .slice(0, 1);
  const cases = featured ? [featured, ...others] : others.slice(0, 2);

  const casesHtml = cases
    .map((c) => renderCaseCard(c, { variant, lang, featured: false }))
    .join("\n");

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
${BAIRESDEV_TOKENS}
${BAIRESDEV_STYLES}
${V2_EXTRA_STYLES}
</style>
</head>
<body>

<article class="cv-page">
  ${renderIdentityBlock(data.identity, { variant, lang })}

  ${renderSkillsSidebar(data.skills, { variant, lang })}

  <div class="cv-right">
    ${renderSummaryV2(data.positioning.thesisBairesdev?.en ?? data.positioning.thesis.en)}

    <section class="cv-section">
      <h3 class="cv-section__heading">Professional Experience</h3>
      ${experienceHtml}
    </section>
  </div>
</article>

<article class="cv-page">
  <aside>
    ${renderEducationBlock(data.education, lang)}
  </aside>

  <div class="cv-right">
    <section class="cv-section">
      <h3 class="cv-section__heading">Selected Case Studies</h3>
      ${cases.length > 0 ? casesHtml : ""}
    </section>

    <section class="cv-section">
      <h3 class="cv-section__heading">References</h3>
      <p class="cv-references">Senior references available on request from:</p>
      <ul class="cv-references__list">
        <li>Booz Allen Hamilton · Design Engineering</li>
        <li>Banco Pichincha · Digital Products</li>
        <li>Mondelēz Latin America · DesignOps</li>
        <li>Xentinels · DesignOps Lead</li>
      </ul>
    </section>

    ${data.skills.inventory && data.skills.inventory.length > 0
      ? renderSkillsInventory(data.skills.inventory, lang)
      : ""}
  </div>
</article>

</body>
</html>`;
}
