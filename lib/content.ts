/**
 * Single source of truth for every piece of profile copy.
 * Sourced from LinkedIn (2026-10-13). Update this file, never hardcode copy in components.
 */

export const SITE_URL = "https://agoengdenisa.vercel.app";

export const person = {
  name: "Mas Agung Denisa Bekam",
  shortName: "Agoeng Denisa",
  headline:
    "Forward Deployed & Platform Engineer | Vue · NestJS · Next.js · GCP | Data Pipelines (BigQuery, Databricks) | Co-Founder @AIWorkLabs",
  currentRole: "Forward Deployed Engineer",
  currentCompany: "HeyRCG!",
  concurrentRole: "Co-Founder & CTO",
  concurrentCompany: "AI WorkLabs",
  location: "Bali, Indonesia",
  remoteFor: "Australia · Singapore · Remote",
  email: "agungmethodist78@gmail.com",
  linkedin: "https://www.linkedin.com/in/agung78/",
  github: "https://github.com/Agung78/",
  resume: "https://drive.google.com/file/d/1_RWa2N-laQPTV45hVfhIcBNuyfB0fBHG/view?usp=sharing",
  availability: "Open to Forward Deployed, Solutions and Platform engineering roles",
} as const;

export const summary = [
  "I go where the client's problem is, learn it from the inside, and ship the system that solves it to production.",
  "Former Assistant Professor, now embedded with clients at HeyRCG! in Australia: translating business requirements into architecture, then building, deploying and operating it across Vue, NestJS, GCP and data pipelines on BigQuery, Snowflake and Databricks. Teaching taught me to explain the same system to an engineer and to a venue manager.",
] as const;

/** Hero ledger: the engagement in four facts. */
export const nowStrip = [
  { label: "Embedded at", value: "HeyRCG!, Australia · Remote, since Mar 2026" },
  { label: "Running", value: "A 4-service platform for multi-venue hospitality" },
  { label: "Also", value: "Co-Founder & CTO, AI WorkLabs" },
  { label: "Based", value: "Bali, Indonesia" },
] as const;

/** How an engagement runs. Each step restates work already described in caseStudies / roles. */
export const engagement = [
  {
    step: "Problem",
    title: "Start from the business requirement",
    body: "Translate what the client needs into the best-fit architecture, and sequence delivery against their long-term goals rather than the next ticket.",
  },
  {
    step: "Embedded",
    title: "Work inside the client's constraints",
    body: "Production apps on Vue 3, NestJS, Express and Prisma, alongside the client's security, governance and stakeholder reality.",
  },
  {
    step: "Shipped",
    title: "Own it in production",
    body: "Cloud Run, managed Postgres and CI/CD on GCP, with CVE tracking, dependency audits and automated SAST/DAST in the pipeline.",
  },
  {
    step: "Measured",
    title: "Report in the client's terms",
    body: "Analytics over Snowflake and BigQuery: repeat-visit rates, cross-venue visitation and discovery-source attribution on the dashboards clients read.",
  },
] as const;

export type CaseStudy = {
  client: string;
  title: string;
  period: string;
  problem: string;
  deployed: string;
  outcome: string;
  tech: readonly string[];
};

export const caseStudies: readonly CaseStudy[] = [
  {
    client: "TMRW LABS",
    title: "WiFi onboarding and customer intelligence for multi-venue hospitality",
    period: "2026 — Present",
    problem:
      "Hospitality venues put guests on WiFi but could not see who comes back, who visits more than one venue, or where guests discovered them.",
    deployed:
      "A four-service distributed system: API, dashboard, cron scheduler and queue consumer. Vue 3, NestJS, Express and Prisma, with the captive-portal onboarding flow at the edge.",
    outcome:
      "In production. Client dashboards report repeat-visit rates, cross-venue visitation and discovery-source attribution from Snowflake and BigQuery pipelines.",
    tech: ["Vue 3", "NestJS", "Express", "Prisma", "Snowflake", "BigQuery"],
  },
  {
    client: "Australian Dairy Farmers Corporation",
    title: "PNS System and PNS Estimator",
    period: "2026 — Present",
    problem:
      "A production system for an Australian industry body needed infrastructure that could scale and stay secure without a platform team behind it.",
    deployed:
      "Architected and scaled the GCP footprint: Cloud Run, managed Postgres and CI/CD, with continuous CVE tracking, dependency auditing and SAST/DAST in the pipeline.",
    outcome:
      "The PNS System runs on infrastructure I designed, with security maintained as a continuous practice instead of a release-gate scramble.",
    tech: ["GCP", "Cloud Run", "Postgres", "CI/CD", "SAST / DAST"],
  },
  {
    client: "Customer Zero",
    title: "Customer Zero Framework & Applied AI | IKMJ",
    period: "2026 — Present",
    problem:
      "Customer Zero needed a management dashboard and a platform to run it on, shaped around how the client actually works.",
    deployed:
      "The Customer Zero management dashboard on Vue 3, NestJS, Express and Prisma, with GCP infrastructure and CI/CD architected and scaled alongside it.",
    outcome:
      "Dashboard and infrastructure in production on the same GCP foundation as the other HeyRCG! systems.",
    tech: ["Vue 3", "NestJS", "Prisma", "GCP", "CI/CD"],
  },
  {
    client: "AIA Singapore",
    title: "PayEZ payment gateway: Java to Next.js, then end-to-end ownership",
    period: "2021 — 2026",
    problem:
      "AIA's PayEZ gateway ran on Java, slow to change and inconsistent across surfaces, while sitting under repeated penetration testing and compliance scrutiny.",
    deployed:
      "Migrated PayEZ from Java to Next.js with a Storybook component library, then led frontend for PayEZ Elevate and a UI/UX redesign to the Digital Design Standard. Integrated UOB TMRW and OCBC payments and PayEZ inside the AIA+ Singapore app.",
    outcome:
      "Remediated three pen-test cycles (EY, Accenture, Black Duck). UOB TMRW and OCBC rails live. Adobe Analytics and a feedback system wired in.",
    tech: ["Next.js", "Storybook", "Adobe Analytics", "Chainlit"],
  },
  {
    client: "AIA Singapore",
    title: "Datamart migration to Azure Databricks",
    period: "2021 — 2022",
    problem:
      "PL/SQL stored procedures ground through the Datamart on a cycle measured in weeks.",
    deployed:
      "Rewrote them as SparkSQL and PySpark on Azure Databricks, built the Azure Data Factory pipelines, and converted Autosys jobs to JIL scripts.",
    outcome: "Processing went from weeks to hours.",
    tech: ["Azure Databricks", "PySpark", "SparkSQL", "Azure Data Factory", "Autosys / JIL"],
  },
] as const;

export const stackGroups = [
  {
    title: "Client surfaces",
    items: ["Vue 3", "Next.js", "React", "TypeScript", "Tailwind CSS", "Storybook", "React Native"],
  },
  {
    title: "Services",
    items: ["NestJS", "Express", "Node.js", "Prisma", "Python", "Chainlit"],
  },
  {
    title: "Data pipelines",
    items: ["BigQuery", "Snowflake", "Azure Databricks", "PySpark", "SparkSQL", "Azure Data Factory"],
  },
  {
    title: "Platform and security",
    items: ["Google Cloud Platform", "Cloud Run", "Managed Postgres", "CI/CD", "SAST / DAST", "CVE tracking", "Docker", "Snyk", "Veracode"],
  },
  {
    title: "Applied AI",
    items: ["Claude Code", "OpenAI Codex", "Keras", "TensorFlow", "scikit-learn", "NLTK", "EasyOCR"],
  },
] as const;

export type Role = {
  company: string;
  title: string;
  type: string;
  period: string;
  location: string;
  current: boolean;
  points: readonly string[];
};

export const roles: readonly Role[] = [
  {
    company: "HeyRCG!",
    title: "Forward Deployed Engineer",
    type: "Full-time",
    period: "Mar 2026 — Present",
    location: "Australia · Remote",
    current: true,
    points: [
      "Built and operate a 4-service distributed system (API, dashboard, cron scheduler, queue consumer) for WiFi captive-portal onboarding and customer analytics across multi-venue hospitality networks.",
      "Vue 3, NestJS, Express and Prisma across production apps, including the TMRW LABS WiFi Portal and the Customer Zero management dashboard.",
      "Architected and scaled GCP infrastructure (Cloud Run, managed Postgres, CI/CD) for tmrwlabs.io, the Australian Dairy Farmers Corporation PNS System and Customer Zero.",
      "Analytics pipelines over Snowflake and BigQuery powering repeat-visit rates, cross-venue visitation and discovery-source attribution for client dashboards.",
      "Continuous CVE tracking and remediation, dependency auditing, and automated SAST/DAST in CI.",
      "Translate business requirements into best-fit architecture and sequence delivery against long-term goals.",
    ],
  },
  {
    company: "AI WorkLabs",
    title: "Co-Founder & CTO",
    type: "Part-time",
    period: "Jan 2025 — Present",
    location: "Indonesia",
    current: true,
    points: [
      "AI agent products that automate team alerts and predict customer churn risk.",
      "Took the architecture from prototype to production; build and mentor the team.",
      "Scope AI solutions to each client's goals.",
    ],
  },
  {
    company: "PT. Timedoor Indonesia",
    title: "Programming Teacher",
    type: "Freelance",
    period: "Jul 2021 — Present",
    location: "Bali",
    current: true,
    points: [
      "JavaScript and Phaser3 game development, a pro full-stack course, web development and React Native.",
      "Introductory AI with Keras, NLTK, TensorFlow, scikit-learn and EasyOCR.",
    ],
  },
  {
    company: "AIA Singapore",
    title: "Full-Stack Engineer (Lead, PayEZ)",
    type: "Full-time",
    period: "Apr 2022 — Feb 2026",
    location: "Hybrid",
    current: false,
    points: [
      "Owned the PayEZ payment gateway end to end.",
      "Led frontend for PayEZ Elevate and a DDS-compliant UI/UX redesign.",
      "Integrated UOB TMRW and OCBC payments, and PayEZ into the AIA+ Singapore app.",
      "Remediated three pen-test cycles (EY, Accenture, Black Duck).",
      "Built an internal ChatGPT-style assistant with Chainlit, Adobe Analytics and a feedback system; healthcare UI/UX and HumanableCX welcome pages.",
      "Owned business, security and GRC alignment.",
    ],
  },
  {
    company: "AIA Singapore",
    title: "Data Engineer",
    type: "Contract",
    period: "May 2021 — Apr 2022",
    location: "Singapore",
    current: false,
    points: [
      "Migrated PL/SQL to SparkSQL and PySpark on Azure Databricks (Datamart migration, weeks to hours).",
      "Azure Data Factory pipelines; Autosys converted to JIL scripts.",
      "Migrated PayEZ from Java to Next.js; Storybook components.",
    ],
  },
  {
    company: "Yayasan Perguruan Sutomo",
    title: "Computer Teacher",
    type: "",
    period: "Jul 2018 — Jun 2021",
    location: "Medan",
    current: false,
    points: [],
  },
  {
    company: "Universitas Mikroskil",
    title: "Assistant Professor",
    type: "Part-time",
    period: "Jul 2018 — May 2021",
    location: "Medan",
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
  { href: "#how", label: "Method" },
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#journey", label: "Career" },
  { href: "#contact", label: "Contact" },
] as const;
