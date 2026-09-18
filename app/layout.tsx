import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import {
  SITE_URL,
  certifications,
  education,
  person,
  stackGroups,
} from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  /* Never used above the fold in size that matters for LCP — don't let its
     preload compete for bandwidth with the CSS on the critical path. */
  preload: false,
});

const DESCRIPTION =
  "Full-stack engineer spanning product UX, cloud infrastructure, fintech and data platforms. Currently Full Stack Engineer at HeyRCG! and Co-Founder & CTO at AI WorkLabs.";

export const metadata: Metadata = {
  /* Without metadataBase, Next resolves social image and canonical URLs
     against http://localhost:3000 at build time. */
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${person.name} — Full-Stack & Platform Engineer`,
    template: `%s | ${person.name}`,
  },
  description: DESCRIPTION,
  applicationName: `${person.name} — Portfolio`,
  keywords: [
    "Full-Stack Engineer",
    "Platform Engineer",
    "Next.js",
    "NestJS",
    "Vue.js",
    "Node.js",
    "Python",
    "Google Cloud Platform",
    "Azure Databricks",
    "PySpark",
    "Data Engineering",
    "Fintech",
    "CTO",
    person.name,
  ],
  authors: [{ name: person.name, url: person.linkedin }],
  creator: person.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE_URL,
    title: `${person.name} — Full-Stack & Platform Engineer`,
    description: DESCRIPTION,
    siteName: `${person.name} — Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name} — Full-Stack & Platform Engineer`,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: { icon: "/favicon.ico" },
};

/** Person schema, kept in sync with the CV rather than the old CTO-only claim. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  url: SITE_URL,
  email: `mailto:${person.email}`,
  jobTitle: [person.currentRole, person.concurrentRole],
  description: DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bali",
    addressCountry: "ID",
  },
  worksFor: [
    { "@type": "Organization", name: person.currentCompany },
    { "@type": "Organization", name: person.concurrentCompany },
  ],
  alumniOf: education.map((item) => ({
    "@type": "EducationalOrganization",
    name: item.school,
  })),
  hasCredential: certifications.map((name) => ({
    "@type": "EducationalOccupationalCredential",
    name,
  })),
  knowsAbout: Array.from(
    new Set(stackGroups.flatMap((group) => group.items.map((i) => i.name)))
  ),
  sameAs: [person.linkedin, person.github],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      {/* No `scroll-smooth` class: Lenis owns smooth scrolling when it is
          instantiated, and fighting it with the native CSS behaviour causes
          stutter. Under `prefers-reduced-motion` Lenis never mounts, so
          anchor jumps fall back to plain, instant native scroll. */}
      <head>
        {/* Reveal wrappers start at opacity 0 once GSAP takes over. If scripts
            never run, this rule guarantees the page is still fully readable. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-mint focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
