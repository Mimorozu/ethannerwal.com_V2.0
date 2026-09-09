"use client";

import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa6";
import {
  SiExpress,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiRailway,
  SiReact,
  SiVercel,
} from "react-icons/si";
import { TbBrandAzure, TbDatabase } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";
import styles from "./tech-stack.module.css";

// Placeholder groupings/items — swap in the real stack.
const categories = [
  { label: "Languages", items: ["JavaScript", "Python", "PHP", "SQL"] },
  {
    label: "Frameworks & Libraries",
    items: ["React", "Next.js", "Node.js", "Express"],
  },
  { label: "Tools & Platforms", items: ["Git", "GitHub", "VS Code", "npm"] },
  {
    label: "Cloud & Infrastructure",
    items: ["MongoDB", "PostgreSQL", "Vercel", "AWS", "Azure", "Railway"],
  },
];

// SQL has no single owning brand, so it gets a generic database glyph instead of a logo.
const techIcons: Record<string, IconType> = {
  JavaScript: SiJavascript,
  Python: SiPython,
  PHP: SiPhp,
  SQL: TbDatabase,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  Git: SiGit,
  GitHub: SiGithub,
  "VS Code": VscVscode,
  npm: SiNpm,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Vercel: SiVercel,
  AWS: FaAws,
  Azure: TbBrandAzure,
  Railway: SiRailway,
};

export function TechStack() {
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
        <span className={styles.label}>Skills</span>
        <div className={styles.headingGroup}>
          <h2 className={`${styles.heading} ${titleVisible ? styles.titleVisible : ""}`}>
            Tech Stack
          </h2>
          <p className={`${styles.subtitle} ${titleVisible ? styles.titleVisible : ""}`}>
            The tools and technologies I work with.
          </p>
        </div>
      </div>

      <div className={styles.terminal}>
        <div className={styles.terminalHeader}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.terminalPath}>~/stack.json</span>
        </div>
        <div className={styles.categories}>
          {categories.map((category, i) => (
            <CategoryRow
              key={category.label}
              label={category.label}
              items={category.items}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Same reveal as ServiceTile: fades/rises/sharpens in once, the first time it scrolls into view.
function CategoryRow({
  label,
  items,
  index,
}: {
  label: string;
  items: string[];
  index: number;
}) {
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
      className={`${styles.category} ${visible ? styles.categoryVisible : ""}`}
      style={{ transitionDelay: `${Math.min(index * 0.06, 0.3)}s` }}
    >
      <span className={styles.categoryLabel}>// {label}</span>
      <div className={styles.tags}>
        {items.map((item, i) => {
          const Icon = techIcons[item];
          return (
            <span key={`${item}-${i}`} className={styles.tag}>
              {Icon && <Icon className={styles.tagIcon} aria-hidden />}
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}
