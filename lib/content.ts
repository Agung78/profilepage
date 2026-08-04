/**
 * Single source of truth for every piece of profile copy.
 * Sourced verbatim from the LinkedIn CV export (Profile.pdf, Aug 2026).
 * Update this file — never hardcode content in components.
 */

export const SITE_URL = "https://agoengdenisa.vercel.app";

export const person = {
  name: "Mas Agung Denisa Bekam",
  shortName: "Agoeng Denisa",
  headline:
    "Full-Stack Engineer | Node.js, Next.js, Python | Building Scalable Web & Data Solutions",
  currentRole: "Full Stack Engineer",
  currentCompany: "HeyRCG!",
  concurrentRole: "Co-Founder & CTO",
  concurrentCompany: "AI WorkLabs",
  location: "Bali, Indonesia",
  remoteFor: "Australia · Singapore · Remote",
  email: "agungmethodist78@gmail.com",
  linkedin: "https://www.linkedin.com/in/agung78/",
  github: "https://github.com/Agung78/",
  resume: "/Mas-Agung-Denisa-Bekam-CV.pdf",
  availability: "Open to senior full-stack & platform roles",
} as const;

export const summary = [
  "From the data pipeline to the pixel, I bridge the gap between complex enterprise architecture and intuitive user experiences.",
  "As a full-stack engineer and former Assistant Professor, I don't just build applications — I translate technical complexity into business value. Whether it's migrating legacy systems to modern Next.js architectures or optimizing massive data flows, I focus on scalability, security, and the human at the other end of the screen.",
] as const;

/** Hero footer strip. Three orienting facts, all CV-backed. */
export const nowStrip = [
  {
    label: "Now",
    value: "GCP infrastructure & CVE hardening at HeyRCG!",
  },
  {
    label: "Also",
    value: "Co-Founder & CTO, AI WorkLabs",
  },
  {
    label: "Before",
    value: "4 years on AIA Singapore's PayEZ gateway",
  },
] as const;

/** Headline numbers. Every one traces back to a line in the CV. */
export const metrics = [
  {
    value: "weeks → hours",
    label: "Datamart processing cycle",
    detail: "PL/SQL stored procedures rebuilt on Azure Databricks with PySpark",
  },
  {
    value: "4 yrs",
    label: "Owning a payment gateway",
    detail: "PayEZ at AIA Singapore — features, security, systems analysis",
  },
  {
    value: "2",
    label: "Bank rails integrated",
    detail: "UOB TMRW and OCBC payment methods shipped inside PayEZ",
  },
  {
    value: "3",
    label: "Pen-test partners cleared",
    detail: "EY, Black Duck and Accenture enhancement cycles",
  },
] as const;

export const pillars = [
  {
    icon: "gauge",
    title: "Performance first",
    body: "Rebuilt a batch data platform on Azure Databricks and PySpark, cutting processing cycles from weeks to hours and reducing operational cost.",
    tone: "emerald",
  },
  {
    icon: "shield",
    title: "Security-first mindset",
    body: "Three major enhancement cycles under penetration testing by EY, Black Duck and Accenture, with Snyk, Veracode and CVE tracking in the loop.",
    tone: "sky",
  },
  {
    icon: "users",
    title: "Teaching as leverage",
    body: "Former Assistant Professor and programming instructor. Mentoring engineers and explaining architecture to non-technical stakeholders is the day job, not a side effect.",
    tone: "emerald",
  },
] as const;

export type CaseStudy = {
  org: string;
  title: string;
  kind: string;
  period: string;
  icon: "code" | "database" | "cloud" | "wifi";
  tone: "emerald" | "sky";
  challenge: string;
  approach: string;
  impact: string;
  tech: readonly string[];
};

export const caseStudies: readonly CaseStudy[] = [
  {
    org: "HeyRCG!",
    title: "GCP platform for tmrwlabs.io & Dairy Farmers PNS",
    kind: "Cloud architecture · Current",
    period: "2026 — Present",
    icon: "cloud",
    tone: "emerald",
    challenge:
      "Two production systems — tmrwlabs.io and the Australian Dairy Farmers Corporation PNS System — needed infrastructure that could scale without a platform team behind it.",
    approach:
      "Architected and scaled the cloud infrastructure on Google Cloud Platform, then hardened it by actively monitoring and resolving vulnerabilities through CVE tracking.",
    impact:
      "Both platforms run on infrastructure I designed, with security posture maintained as an ongoing practice rather than a release-gate scramble.",
    tech: ["Google Cloud Platform", "Docker", "CVE tracking", "NestJS"],
  },
  {
    org: "TMRW LABS",
    title: "Secure WiFi captive portal",
    kind: "Full-stack product",
    period: "2026",
    icon: "wifi",
    tone: "sky",
    challenge:
      "A guest WiFi portal sits directly in the trust boundary — it has to be fast, and it has to be safe.",
    approach:
      "Designed, built and maintained the portal end to end on Vue.js and NestJS, with security treated as a first-class requirement.",
    impact:
      "A secure, high-performing WiFi portal in production for TMRW LABS.",
    tech: ["Vue.js", "NestJS", "TypeScript"],
  },
  {
    org: "AIA Singapore",
    title: "PayEZ re-platform: AEM → Next.js",
    kind: "Fintech migration",
    period: "2021 — 2026",
    icon: "code",
    tone: "emerald",
    challenge:
      "PayEZ, AIA's payment gateway, was built on legacy AEM and Java — slow to change and hard to keep consistent across surfaces.",
    approach:
      "Migrated the gateway to Next.js and built out a documented Storybook component library, then led the frontend for the PayEZ Elevate Project and redesigned the UI to AIA's Digital Design Standard.",
    impact:
      "A maintainable, performant gateway carrying UOB TMRW and OCBC payment methods, integrated into AIA+ Singapore, with Adobe Analytics tagging and an in-product feedback review system.",
    tech: [
      "Next.js",
      "React",
      "Storybook",
      "Adobe Analytics",
      "Digital Design Standard",
    ],
  },
  {
    org: "AIA Singapore",
    title: "Datamart migration to Azure Databricks",
    kind: "Data engineering",
    period: "2021 — 2022",
    icon: "database",
    tone: "sky",
    challenge:
      "PL/SQL stored procedures were grinding through the Datamart over a window measured in weeks.",
    approach:
      "Converted the procedures to Azure Databricks using SparkSQL and PySpark, built the ingestion pipelines in Azure Data Factory, and translated Autosys job definitions into new JIL scripts.",
    impact:
      "Processing cycles dropped from weeks to hours, with a matching cut in operational cost.",
    tech: [
      "Azure Databricks",
      "PySpark",
      "SparkSQL",
      "Azure Data Factory",
      "Autosys / JIL",
    ],
  },
] as const;

export const stackGroups = [
  {
    title: "Front-End",
    icon: "code",
    tone: "emerald",
    items: [
      { name: "Next.js", current: true },
      { name: "React", current: true },
      { name: "Vue.js", current: true },
      { name: "TypeScript", current: true },
      { name: "Tailwind CSS", current: false },
      { name: "Storybook", current: false },
      { name: "React Native", current: false },
      { name: "Phaser3", current: false },
    ],
  },
  {
    title: "Back-End",
    icon: "terminal",
    tone: "sky",
    items: [
      { name: "Node.js", current: true },
      { name: "NestJS", current: true },
      { name: "Python", current: true },
      { name: "Flask", current: false },
      { name: "Laravel", current: false },
    ],
  },
  {
    title: "Data & Cloud",
    icon: "database",
    tone: "emerald",
    items: [
      { name: "Google Cloud Platform", current: true },
      { name: "Azure Databricks", current: false },
      { name: "PySpark", current: false },
      { name: "SparkSQL", current: false },
      { name: "Azure Data Factory", current: false },
      { name: "Autosys / JIL", current: false },
    ],
  },
  {
    title: "Security & DevOps",
    icon: "shield",
    tone: "sky",
    items: [
      { name: "CVE tracking", current: true },
      { name: "Snyk", current: false },
      { name: "Veracode", current: false },
      { name: "Black Duck", current: false },
      { name: "Docker", current: true },
      { name: "Git", current: true },
    ],
  },
  {
    title: "AI Tooling",
    icon: "sparkles",
    tone: "emerald",
    items: [
      { name: "Claude Code", current: true },
      { name: "OpenAI Codex", current: true },
      { name: "Chainlit", current: false },
      { name: "TensorFlow", current: false },
      { name: "Keras", current: false },
      { name: "SciKit-Learn", current: false },
      { name: "NLTK", current: false },
      { name: "EasyOCR", current: false },
    ],
  },
  {
    title: "Analytics",
    icon: "chart",
    tone: "sky",
    items: [
      { name: "Adobe Analytics", current: false },
      { name: "Digital Design Standard", current: false },
    ],
  },
] as const;

export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  current: boolean;
  points: readonly string[];
};

export const roles: readonly Role[] = [
  {
    company: "HeyRCG!",
    title: "Full Stack Engineer",
    period: "Mar 2026 — Present",
    location: "Australia",
    current: true,
    points: [
      "Architected and scaled cloud infrastructure on Google Cloud Platform for tmrwlabs.io and the Australian Dairy Farmers Corporation PNS System.",
      "Hardened infrastructure by actively monitoring and resolving vulnerabilities via CVE tracking.",
      "Acted as strategic technical advisor, evaluating system requirements to design best-fit architecture aligned with long-term business goals.",
      "Built and maintained full-stack applications on Vue.js and NestJS, including a secure WiFi Portal for TMRW LABS.",
    ],
  },
  {
    company: "AI WorkLabs",
    title: "Co-Founder & CTO",
    period: "Jan 2025 — Present",
    location: "Indonesia",
    current: true,
    points: [
      "Lead technology strategy, product development and IT operations.",
      "Manage client technical requirements, keeping solutions aligned to business goals.",
      "Oversee all technical aspects from architecture through deployment.",
      "Lead and mentor the engineering team, fostering innovation and collaboration.",
    ],
  },
  {
    company: "AIA",
    title: "Engineer/Analyst Fullstack ReactJS",
    period: "Apr 2022 — Feb 2026",
    location: "Singapore",
    current: false,
    points: [
      "Owned the PayEZ payment gateway: new features, enhancements, bug fixing, security improvements and systems analysis.",
      "Directed the PayEZ UI/UX redesign against the Digital Design Standard, and led frontend for the PayEZ Elevate Project.",
      "Improved performance and security through penetration testing cycles with EY, Black Duck and Accenture.",
      "Integrated UOB TMRW and OCBC payment methods, plus PayEZ support inside the AIA+ Singapore apps.",
      "Shipped a feedback review system, Adobe Analytics tagging, and a ChatGPT-like internal AI tool built on Chainlit.",
      "Handled the business-facing surface: User Business, Internal Security, Enterprise Governance, Risk and Compliance.",
    ],
  },
  {
    company: "PT. Timedoor Indonesia",
    title: "Programming Teacher",
    period: "Jul 2021 — Mar 2023",
    location: "Bali, Indonesia",
    current: false,
    points: [
      "Taught intermediate Vanilla JavaScript and Phaser3 game development.",
      "Ran the pro-level full-stack course covering frontend, backend and database across the end-to-end app flow.",
      "Delivered React Native mobile training and web development in HTML, CSS and JavaScript.",
      "Introduced AI foundations with Keras, NLTK, TensorFlow, SciKit-Learn and EasyOCR.",
    ],
  },
  {
    company: "AIA Singapore",
    title: "Data Engineer",
    period: "May 2021 — Apr 2022",
    location: "Singapore",
    current: false,
    points: [
      "Migrated the Datamart to Azure Databricks, optimizing storage and processing.",
      "Converted PL/SQL stored procedures to Databricks using SparkSQL and PySpark.",
      "Built data pipelines in Azure Data Factory and transformed Autosys job definitions into JIL scripts.",
      "Migrated the PayEZ payment gateway from Java to Next.js and documented components in Storybook.",
    ],
  },
  {
    company: "Yayasan Perguruan Sutomo",
    title: "Computer Teacher",
    period: "Jul 2018 — Jun 2021",
    location: "Medan, Indonesia",
    current: false,
    points: [],
  },
  {
    company: "Universitas Mikroskil",
    title: "Assistant Professor",
    period: "Jul 2018 — May 2021",
    location: "Medan, Indonesia",
    current: false,
    points: [],
  },
] as const;

export const education = [
  {
    school: "Hacktiv8 Indonesia",
    credential: "Graduate, Fullstack Javascript",
    period: "Nov 2020 — Mar 2021",
  },
  {
    school: "Universitas Mikroskil",
    credential: "Bachelor's degree, Informatics Engineering",
    period: "Jul 2016 — Jul 2020",
  },
] as const;

export const certifications = [
  "Fundamentals of Machine Learning",
  "Fundamentals of Lakehouse Architecture",
  "Fundamentals of Structured Streaming",
  "Business Continuity Management — Awareness Training",
] as const;

/** Proficiency labels are taken directly from the CV. */
export const languages = [
  { name: "Bahasa Indonesia", level: "Professional working" },
  { name: "English", level: "Working" },
  { name: "Bahasa Jawa", level: "Working" },
  { name: "Hokkien", level: "Working" },
  { name: "Bahasa Bali", level: "Elementary" },
] as const;

export const navItems = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
] as const;
