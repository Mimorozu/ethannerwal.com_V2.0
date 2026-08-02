"use client";

import { useEffect, useRef, useState } from "react";
import { ImageReveal } from "./image-reveal";
import styles from "./services.module.css";

const services = [
  {
    title: "Bespoke Software",
    description:
      "Custom-built applications tailored to your business logic, not templates.",
    imageUrl: "/laptop.png",
  },
  {
    title: "AI Solutions",
    description:
      "Fast, modern interfaces that scale from prototype to production.",
    imageUrl: "/chip.jpg",
    // The chip sits left-of-center in the source photo; the 4:3 tile crop otherwise
    // centers on the full 16:9 frame and cuts into it.
    imagePosition: "25% 40%",
  },
  {
    title: "Website & Web Applications",
    description:
      "Streamlined tooling and automation that removes repetitive work.",
    imageUrl: "/world.png",
  },
  {
    title: "AI Solutions",
    description:
      "Streamlined tooling and automation that removes repetitive work.",
    imageUrl: "/gold.jpg",
  },
  {
    title: "System Intergrations",
    description:
      "Streamlined tooling and automation that removes repetitive work.",
    imageUrl: "/gold.jpg",
  },
  {
    title: "Data Reporting",
    description:
      "Streamlined tooling and automation that removes repetitive work.",
    imageUrl: "/gold.jpg",
  },
];

export function Services() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    let timeoutId = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Same "reveal shortly after, not the instant it's technically visible" delay
          // FitLine uses — firing the fade immediately reads as too quick to register.
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
    <div className={styles.services}>
      <div ref={titleRef} className={styles.services_title}>
        <span className={styles.services_label}>What I Do</span>
        <div className={styles.services_headingGroup}>
          <h2
            className={`${styles.services_heading} ${titleVisible ? styles.services_titleVisible : ""}`}
          >
            Services
          </h2>
          <p
            className={`${styles.services_subtitle} ${titleVisible ? styles.services_titleVisible : ""}`}
          >
            Bespoke builds for your specific needs
          </p>
        </div>
      </div>
      <div className={styles.list}>
        {services.map((service, i) => (
          <ServiceTile key={`${service.title}-${i}`} {...service} index={i} />
        ))}
      </div>
    </div>
  );
}

// Fades/rises/sharpens in once, the first time it scrolls into view.
function ServiceTile({
  title,
  description,
  imageUrl,
  imagePosition,
  index,
}: {
  title: string;
  description: string;
  imageUrl: string;
  imagePosition?: string;
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
      // Triggers as the tile is still entering from the bottom (rather than once
      // 35% of it is already on screen) so the rise/blur has room to play out
      // while it's visibly still on its way into place, not just popping in place.
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
      <span className={styles.title}>{title}</span>
      <p className={styles.description}>{description}</p>
      <div className={styles.imageFrame}>
        <ImageReveal
          src={imageUrl}
          alt=""
          fill
          sizes="(min-width: 640px) 20vw, 40vw"
          className={styles.image}
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
      </div>
    </div>
  );
}
