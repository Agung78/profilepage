import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Mas Agung Denisa Bekam",
    template: "%s | Mas Agung Denisa Bekam",
  },
  description:
    "Senior Full-Stack Engineer and CTO specializing in Data Engineering, Enterprise Architecture, and Scalable Systems. Expert in Next.js, Python, and Azure.",
  keywords: [
    "Full-Stack Engineer",
    "Data Engineer",
    "CTO",
    "Software Architect",
    "Next.js",
    "React",
    "Python",
    "Azure Databricks",
    "PySpark",
    "Web Development",
    "Mas Agung Denisa Bekam",
  ],
  authors: [{ name: "Mas Agung Denisa Bekam" }],
  creator: "Mas Agung Denisa Bekam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://agoengdenisa.vercel.app/", // Replace with actual domain if known, or use localhost for now/placeholder
    title: "Mas Agung Denisa Bekam - Full-Stack & Data Engineer",
    description:
      "Senior Full-Stack Engineer and CTO specializing in Data Engineering and Enterprise Architecture.",
    siteName: "Mas Agung Denisa Bekam Portfolio",
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
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
