import type { Metadata } from "next";
import { Certifications } from "../components/certifications";
import { TechStack } from "../components/tech-stack";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full stack developer with certifications in AWS and Azure, working across React, PostgreSQL, and modern cloud infrastructure.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

// Hero copy for "/about" renders inside HeroGrid; this page holds the below-the-fold content.
export default function About() {
  return (
    <>
      <TechStack />
      <Certifications />
    </>
  );
}
