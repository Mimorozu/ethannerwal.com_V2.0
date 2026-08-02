import Link from "next/link";
import { ImageReveal } from "./image-reveal";
import type { Project } from "./projects-data";
import styles from "./project-detail.module.css";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article>
      <div className={styles.hero}>
        <ImageReveal src={project.imageUrl} alt="" fill sizes="100vw" className={styles.image} />
        <div className={styles.imageOverlay} />
        <div className={styles.heroText}>
          <span className={styles.service}>{project.service}</span>
          <h1 className={styles.name}>{project.name}</h1>
        </div>
        <svg
          className={styles.scrollHint}
          aria-hidden
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>

      <div className={styles.body}>
        <Link href="/projects" className={styles.back}>
          ← All projects
        </Link>

        <div className={styles.bodyGrid}>
          <p className={styles.description}>{project.description}</p>

          <div className={styles.infoGrid}>
            <div className={styles.infoCell}>
              <h2 className={styles.infoLabel}>Services Delivered</h2>
              <ul className={styles.infoList}>
                {project.servicesDelivered.map((item, i) => (
                  <li key={`${item}-${i}`}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.infoCell}>
              <h2 className={styles.infoLabel}>Tech Stack</h2>
              <ul className={styles.infoList}>
                {project.techStack.map((item, i) => (
                  <li key={`${item}-${i}`}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
