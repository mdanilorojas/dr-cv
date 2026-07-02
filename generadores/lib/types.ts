// ============= IDENTITY =============
export interface Identity {
  name: string;
  role: string;          // e.g. "Agentic Designer Â· Product Engineer"
  location: string;      // e.g. "Quito Â· Ecuador"
  languages: string;     // e.g. "EN native-like Â· ES native"
  availability: string;  // e.g. "Open to work Â· Remote global"
  contact: {
    email: string;
    phone?: string;
    linkedin?: string;
    github?: string;
    behance?: string;
    site?: string;
  };
}

// ============= POSITIONING =============
export interface Positioning {
  thesis: { en: string; es: string };
  tagline: { en: string; es: string };
  heroLine?: { en: string; es: string };
  heroEmphasis?: { en: string; es: string };
  heroSub?: { en: string; es: string };
  trustStrip?: { en: string[]; es: string[] };
  thesisBairesdev?: { en: string };
  proofNumbers: Array<{
    value: string;
    unit?: string;
    labelEn: string;
    labelEs: string;
  }>;
}

// ============= NOTES (POV) =============
export interface Note {
  slug: string;
  titleEn: string;
  titleEs: string;
  bodyEn: string;
  bodyEs: string;
}
export type Notes = Note[];

// ============= SKILLS =============
export interface Skill {
  name: string;
  level: "mastered" | "learning";
  note?: string;
}

export interface SkillGroup {
  title: string;    // e.g. "Strategy"
  skills: Skill[];
}

export interface SkillAxis {
  name: string;     // e.g. "Visual A"
  axis: string;     // e.g. "axis Â· product layer"
  groups: SkillGroup[];
}

export interface SkillInventoryItem {
  skill: string;
  years: string;
}

export interface Skills {
  byLayer: SkillAxis;
  byOutcome: SkillAxis;
  inventory?: SkillInventoryItem[];
}

// ============= EXPERIENCE =============
export interface ExperienceItem {
  company: string;
  role: string;
  startYear: number;
  endYear: number | "present";
  descriptionEn: string;
  descriptionEs: string;
  stack: string[];
  highlight?: boolean;       // marks if it's "current" / featured
  badge?: string;            // e.g. "paying pilots", "Army Â· DoD"
}

export interface Experience {
  current: ExperienceItem[];  // for "Current work" section
  past?: ExperienceItem[];    // for later phases
}

// ============= CLIENTS =============
export interface Client {
  name: string;
  industryEn: string;
  industryEs: string;
}

export type Clients = Client[];

// ============= TESTIMONIALS =============
export interface Testimonial {
  quote: string;           // English primary
  quoteEs?: string;        // optional Spanish translation
  author: string;
  role: string;            // role + project + company, short
  company?: string;
  source: "verified" | "attributed";
}

export type Testimonials = Testimonial[];

// ============= ROOT =============
export interface SkillsSheetData {
  identity: Identity;
  positioning: Positioning;
  skills: Skills;
  experience: Experience;
  clients: Clients;
  testimonials: Testimonials;
}

// ============= CASES =============
export interface Case {
  slug: string;                // unique id, matches file name
  titleEn: string;
  titleEs: string;
  clientEn: string;            // e.g. "Booz Allen Hamilton Â· Developer Portal"
  clientEs: string;
  yearStart: number;
  yearEnd: number | "present";
  hookEn: string;              // one-paragraph pitch
  hookEs: string;
  bulletsEn: string[];         // 2â€“4 bullet points
  bulletsEs: string[];
  stack: string[];             // short tech tags
  featured: boolean;           // if true, can be rendered as the featured card
  animation?: string;          // optional animation slug (matches perfil/assets/animations/<slug>/)
}

// ============= EDUCATION =============
export interface EducationItem {
  year: number | null;         // null for items without a specific year
  name: string;
  institution: string;
  location?: string;
  inProgress?: boolean;        // cursándose actualmente; se muestra "in progress / en curso"
}

export type Education = EducationItem[];

// ============= ATTRIBUTED TESTIMONIALS =============
export interface AttributedTestimonial {
  quote: string;
  quoteEs?: string;
  author: string;              // e.g. "Head of Product"
  role: string;                // e.g. "EnRegla pilot customer"
  company?: string;
  source: "attributed";
}

// ============= CV DATA =============
export interface CvData extends SkillsSheetData {
  education: Education;
  cases: Case[];
  attributedTestimonials: AttributedTestimonial[];
}

// ============= LANDING =============
export type LandingTabId = "overview" | "work" | "method" | "about" | "contact";
export type LandingVisualKind = "particles" | "grid" | "flow" | "timeline" | "signature";

export interface LandingTab {
  id: LandingTabId;
  labelEn: string;
  labelEs: string;
  visual: LandingVisualKind;
  default?: boolean;
}

export interface Landing {
  tabs: LandingTab[];
  cta: { en: string; es: string };
  seo: {
    titleEn: string;
    titleEs: string;
    descriptionEn: string;
    descriptionEs: string;
  };
}

// ============= HORIZON =============
export interface HorizonChip {
  label: { en: string; es: string };
  href?: string;           // if present â†’ <a>; if absent â†’ <span>
  kind?: "evidence" | "bet"; // used by the `horizon` column
}

export interface HorizonColumn {
  id: string;              // stable id: "earned" | "investing" | "horizon"
  stage: { en: string; es: string };
  heading: { en: string; es: string };
  body: { en: string; es: string };
  emphasis?: boolean;      // true for the "investing" column
  tools?: string[];        // pipeline tools for this stage (rendered as a neutral rail)
  chips: HorizonChip[];
}

export interface HorizonSection {
  eyebrow: { en: string; es: string };
  sectionTitle: { en: string; es: string };
  columns: HorizonColumn[];
}

export interface LandingData extends CvData {
  landing: Landing;
  horizon: HorizonSection;
  notes: Notes;
}

// ============= LECTURA / READING GUIDE =============
export interface LecturaItem {
  title: string;
  url: string;
  badge: string;
  time: string;
  extract: string;
}

export interface LecturaBlock {
  blockTitle: string;
  items: LecturaItem[];
}
