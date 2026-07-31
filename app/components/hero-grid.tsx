"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { ImageReveal } from "./image-reveal";
import styles from "./hero-grid.module.css";

// Each route owns one grid column: the image shown behind it and the hero copy shown on top of it.
const columns = [
  {
    path: "/about",
    src: "/street.jpg",
    title: "About",
    subtitle: "Placeholder — page content coming soon.",
    accent: true,
  },
  {
    path: "/",
    src: "/walk.jpg",
    title: "ETHAN\nNERWAL",
    subtitle: "Software engineer — portfolio in progress.",
    accent: false,
  },
  {
    path: "/projects",
    src: "/street.jpg",
    title: "Projects",
    subtitle: "Placeholder — page content coming soon.",
    accent: true,
  },
  {
    path: "/contact",
    src: "/street.jpg",
    title: "Contact",
    subtitle: "Placeholder — page content coming soon.",
    accent: true,
  },
];

// Renders the 4-column background grid (only the active route's image shows) plus that route's
// headline, blended with mix-blend-difference so the text color reacts to the image behind it.
export function HeroGrid() {
  const pathname = usePathname();
  const activeIndex = columns.findIndex((column) => column.path === pathname);
  const active = columns[activeIndex];

  return (
    <div className={styles.grid}>
      {columns.map((column, i) => (
        <div key={column.path} className={styles.column}>
          {i === activeIndex && (
            <ImageReveal
              src={column.src}
              alt=""
              fill
              priority={i === 1}
              sizes="(min-width: 640px) 25vw, 50vw"
              className={styles.image}
            />
          )}
          {i === 3 && (
            <div className={styles.nestedGrid}>
              <span>Custom <br></br>software</span>
              <span>Web<br></br>Development</span>
              <span>Optimized <br></br>Workflows</span>
            </div>
          )}
        </div>
      ))}

      {active && (
        <HeroCopy title={active.title} subtitle={active.subtitle} accent={active.accent} />
      )}
    </div>
  );
}

// Headline + subhead for the active route. Every line renders as its own element, independently
// font-sized (never stretched) so each line's natural width fills the same edge — this has to run
// per line rather than off a single static font-size, since word length and font both affect it.
function HeroCopy({
  title,
  subtitle,
  accent,
}: {
  title: string;
  subtitle: string;
  accent: boolean;
}) {
  const lines = title.split("\n");

  return (
    <div className={styles.copy}>
      <div className={styles.copyBox}>
        <h1 className={styles.srOnly}>{title.replace(/\n/g, " ")}</h1>
        {lines.map((line) => (
          <FitLine key={line} text={line} accent={accent} aria-hidden />
        ))}
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
}

// One line of text, scaled (never stretched) so its natural width exactly fills its container.
// Measures itself at a reference size, then derives the font-size that hits 100% width.
function FitLine({
  text,
  accent,
  ...rest
}: { text: string; accent?: boolean } & React.AriaAttributes) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<number | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const el = textRef.current;
    if (!container || !el) return;

    const fit = () => {
      // Measure on a detached clone at a reference size instead of mutating the live element —
      // touching el.style directly here can get stranded if the resulting setState is a no-op
      // (e.g. re-measuring to the same value), since React then skips reapplying the real style.
      const probe = el.cloneNode(true) as HTMLElement;
      probe.style.position = "absolute";
      probe.style.visibility = "hidden";
      probe.style.fontSize = "100px";
      document.body.appendChild(probe);
      const naturalWidth = probe.getBoundingClientRect().width;
      document.body.removeChild(probe);

      const targetWidth = container.getBoundingClientRect().width;
      if (naturalWidth > 0) setFontSize((100 * targetWidth) / naturalWidth);
    };

    fit();
    // Container width alone won't change when the web font finishes loading, so re-measure then too.
    document.fonts.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    return () => observer.disconnect();
  }, [text]);

  return (
    <div ref={containerRef} className={styles.fitLineContainer}>
      <div
        {...rest}
        ref={textRef}
        style={{ fontSize: fontSize ?? 100, visibility: fontSize ? "visible" : "hidden" }}
        className={`${styles.fitLineText} ${accent ? styles.fitLineTextAccent : ""}`}
      >
        {text}
      </div>
    </div>
  );
}
