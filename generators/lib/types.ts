// ============= IDENTITY =============
export interface Identity {
  name: string;
  role: string;          // e.g. "Agentic Designer · Product Engineer"
  location: string;      // e.g. "Quito · Ecuador"
  languages: string;     // e.g. "EN native-like · ES native"
  availability: string;  // e.g. "Open to work · Remote global"
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
  thesis: {
    en: string;
    es: string;
  };
  tagline: {
    en: string;
    es: string;
  };
  proofNumbers: Array<{
    value: string;      // e.g. "346"
    unit?: string;      // e.g. "+" or ".0"
    labelEn: string;
    labelEs: string;
  }>;
}

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
  axis: string;     // e.g. "axis · product layer"
  groups: SkillGroup[];
}

export interface Skills {
  byLayer: SkillAxis;
  byOutcome: SkillAxis;
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
  badge?: string;            // e.g. "paying pilots", "Army · DoD"
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
  clientEn: string;            // e.g. "Booz Allen Hamilton · Developer Portal"
  clientEs: string;
  yearStart: number;
  yearEnd: number | "present";
  hookEn: string;              // one-paragraph pitch
  hookEs: string;
  bulletsEn: string[];         // 2–4 bullet points
  bulletsEs: string[];
  stack: string[];             // short tech tags
  featured: boolean;           // if true, can be rendered as the featured card
}

// ============= EDUCATION =============
export interface EducationItem {
  year: number | null;         // null for items without a specific year
  name: string;
  institution: string;
  location?: string;
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
