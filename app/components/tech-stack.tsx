"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./tech-stack.module.css";

// Placeholder groupings/items — swap in the real stack.
const categories = [
  { label: "Languages", items: ["Skill Name", "Skill Name", "Skill Name", "Skill Name"] },
  {
    label: "Frameworks & Libraries",
    items: ["Skill Name", "Skill Name", "Skill Name", "Skill Name"],
  },
  { label: "Tools & Platforms", items: ["Skill Name", "Skill Name", "Skill Name", "Skill Name"] },
  {
    label: "Cloud & Infrastructure",
    items: ["Skill Name", "Skill Name", "Skill Name", "Skill Name"],
  },
];

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
            Placeholder — the tools and technologies I work with.
          </p>
        </div>
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
      <span className={styles.categoryLabel}>{label}</span>
      <div className={styles.tags}>
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className={styles.tag}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
