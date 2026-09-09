import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "../../components/project-detail";
import { projects } from "../../components/projects-data";
import { projectsInProduction } from "../../components/projects-in-production-data";

const allProjects = [...projects, ...projectsInProduction];

export function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) return {};

  const title = `${project.name} — ${project.service}`;
  const description = project.description[0];

  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      url: `/projects/${project.slug}`,
      title,
      description,
      images: [{ url: project.imageUrl }],
    },
    twitter: {
      images: [{ url: project.imageUrl }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
