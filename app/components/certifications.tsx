"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./certifications.module.css";

// Placeholder entries — swap in the real certifications (and real badge images).
const certifications = [
  {
    title: "Certification Title",
    issuer: "Issuing Organization",
    date: "Month Year",
    badgeUrl: "/badge-placeholder.svg",
  },
  {
    title: "Certification Title",
    issuer: "Issuing Organization",
    date: "Month Year",
    badgeUrl: "/badge-placeholder.svg",
  },
  {
    title: "Certification Title",
    issuer: "Issuing Organization",
    date: "Month Year",
    badgeUrl: "/badge-placeholder.svg",
  },
];

export function Certifications() {
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
        <span className={styles.label}>Credentials</span>
        <div className={styles.headingGroup}>
          <h2 className={`${styles.heading} ${titleVisible ? styles.titleVisible : ""}`}>
            Certifications
          </h2>
          <p className={`${styles.subtitle} ${titleVisible ? styles.titleVisible : ""}`}>
            Placeholder — licenses and certifications earned along the way.
          </p>
        </div>
      </div>

      <div className={styles.list}>
        {certifications.map((cert, i) => (
          <CertTile key={`${cert.title}-${i}`} {...cert} index={i} />
        ))}
      </div>
    </div>
  );
}

// Same reveal as ServiceTile: fades/rises/sharpens in once, the first time it scrolls into view.
function CertTile({
  title,
  issuer,
  date,
  badgeUrl,
  index,
}: {
  title: string;
  issuer: string;
  date: string;
  badgeUrl: string;
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
      className={`${styles.tile} ${visible ? styles.tileVisible : ""}`}
      style={{ transitionDelay: `${Math.min(index * 0.06, 0.3)}s` }}
    >
      <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
      <div className={styles.info}>
        <span className={styles.certTitle}>{title}</span>
        <span className={styles.issuer}>{issuer}</span>
      </div>
      <span className={styles.date}>{date}</span>
      <div className={styles.badge}>
        <img src={badgeUrl} alt="" className={styles.badgeImage} />
      </div>
    </div>
  );
}
