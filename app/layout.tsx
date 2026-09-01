import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";
import { Footer } from "./components/footer";
import { HeroGrid } from "./components/hero-grid";
import { Nav } from "./components/nav";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "./lib/site";

const title = Space_Grotesk({
  variable: "--font-title",
  weight: ["500"],
  subsets: ["latin"],
});

const secondary = Space_Mono({
  variable: "--font-secondary",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Ethan Nerwal",
    "full stack developer",
    "web developer",
    "CRM development",
    "SEO",
    "React developer",
    "Next.js developer",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Full Stack Developer",
  sameAs: [
    "https://github.com/Mimorozu",
    "https://www.instagram.com/alwayshungryforchicken/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${title.variable} ${secondary.variable} ${styles.html}`}
    >
      <body className={styles.body}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <HeroGrid />
        <Nav />
        <div className={styles.content}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
