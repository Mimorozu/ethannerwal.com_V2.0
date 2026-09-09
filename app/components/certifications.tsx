"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./certifications.module.css";

// Placeholder entries — swap in the real certifications (and real badge images).
const certifications = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    // date: "Month Year",
    badgeUrl: "/aws-cloud-practitioner.webp",
    verifyUrl: "https://www.credly.com/badges/fcf0059e-19ba-48fa-ad44-a373b139e4c1/public_url",
  },
  {
    title: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    // date: "Month Year",
    badgeUrl: "/azure-fundamentals.webp",
    verifyUrl: "https://learn.microsoft.com/api/credentials/share/en-gb/EthanNerwal-3817/4A1B46223F1D683D?sharingId=18D0B72EF21991E3",
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
            Licenses and certifications I've earned along the way
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
  verifyUrl,
  index,
}: {
  title: string;
  issuer: string;
  date?: string;
  badgeUrl: string;
  verifyUrl?: string;
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
      {date && <span className={styles.date}>{date}</span>}
      <div className={styles.badge}>
        <img src={badgeUrl} alt="" className={styles.badgeImage} />
      </div>
      {verifyUrl && (
        <a
          href={verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.verify}
        >
          Verify
        </a>
      )}
    </div>
  );
}
