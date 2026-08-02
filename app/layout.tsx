import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";
import { Footer } from "./components/footer";
import { HeroGrid } from "./components/hero-grid";
import { Nav } from "./components/nav";

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
  title: "EthanNerwal.com",
  description: "",
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
        <HeroGrid />
        <Nav />
        <div className={styles.content}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
