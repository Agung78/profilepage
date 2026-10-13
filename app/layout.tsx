import "./globals.css";
import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { SmoothScroll } from "@/components/smooth-scroll";
import {
  SITE_URL,
  certifications,
  education,
  person,
  stackGroups,
} from "@/lib/content";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

const DESCRIPTION =
  "Forward Deployed Engineer embedded with clients at HeyRCG!: Vue, NestJS, Next.js, GCP and data pipelines on BigQuery, Snowflake and Databricks. Co-Founder & CTO at AI WorkLabs. Based in Bali, Indonesia.";

export const metadata: Metadata = {
  /* Without metadataBase, Next resolves social image and canonical URLs
     against http://localhost:3000 at build time. */
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${person.name} — Forward Deployed Engineer`,
    template: `%s | ${person.name}`,
  },
  description: DESCRIPTION,
  applicationName: `${person.name} — Portfolio`,
  keywords: [
    "Forward Deployed Engineer",
    "Solutions Engineer",
    "Platform Engineer",
    "BigQuery",
    "Snowflake",
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
    title: `${person.name} — Forward Deployed Engineer`,
    description: DESCRIPTION,
    siteName: `${person.name} — Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name} — Forward Deployed Engineer`,
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
  icons: { icon: "/favicon.ico", apple: "/apple-icon" },
};

/** Person schema, kept in sync with the CV. */
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
  hasCredential: certifications.map((cert) => ({
    "@type": "EducationalOccupationalCredential",
    name: cert.name,
    url: cert.url,
    recognizedBy: { "@type": "Organization", name: cert.issuer },
  })),
  knowsAbout: Array.from(
    new Set(stackGroups.flatMap((group) => group.items))
  ),
  sameAs: [person.linkedin, person.github],
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
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
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
