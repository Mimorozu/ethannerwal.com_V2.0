"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ImageReveal } from "./image-reveal";
import { projects, type Project } from "./projects-data";
import styles from "./projects.module.css";

export function Projects() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    let timeoutId = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = window.setTimeout(() => setTitleVisible(true), 50);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className={styles.section}>
      <div ref={titleRef} className={styles.title}>
        <span className={styles.label}>Selected Work</span>
        <div className={styles.headingGroup}>
          <h2 className={`${styles.heading} ${titleVisible ? styles.titleVisible : ""}`}>
            Projects
          </h2>
          <p className={`${styles.subtitle} ${titleVisible ? styles.titleVisible : ""}`}>
            Placeholder — a selection of things I&apos;ve built. Click one for more.
          </p>
        </div>
      </div>

      <div className={styles.list}>
        {projects.map((project, i) => (
          <ProjectTile key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}

// Same reveal as ServiceTile; clicking navigates to that project's detail page instead of
// expanding in place.
function ProjectTile({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.tile} ${visible ? styles.tileVisible : ""}`}
      style={{ transitionDelay: `${Math.min(index * 0.06, 0.3)}s` }}
    >
      <Link href={`/projects/${project.slug}`} className={styles.summary}>
        <ImageReveal src={project.imageUrl} alt="" fill sizes="100vw" className={styles.image} />
        <div className={styles.imageOverlay} />
        <div className={styles.overlayText}>
          <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
          <span className={styles.name}>{project.name}</span>
          <span className={styles.service}>{project.service}</span>
        </div>
      </Link>
    </div>
  );
}
