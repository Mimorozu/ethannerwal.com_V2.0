import type { Metadata } from "next";
import { Contact as ContactSection } from "../components/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ethan Nerwal to discuss a website, CRM, or SEO project for your business.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

// Hero copy for "/contact" renders inside HeroGrid; this page holds the below-the-fold content.
export default function Contact() {
  return <ContactSection />;
}
