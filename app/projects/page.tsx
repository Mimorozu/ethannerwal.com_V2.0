import type { Metadata } from "next";
import { Projects as ProjectsList } from "../components/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of websites, CRMs, and SEO systems built by Ethan Nerwal for real businesses.",
  alternates: { canonical: "/projects" },
  openGraph: { url: "/projects" },
};

// Hero copy for "/projects" renders inside HeroGrid; this page holds the below-the-fold content.
export default function Projects() {
  return <ProjectsList />;
}
