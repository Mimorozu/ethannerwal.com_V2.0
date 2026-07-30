"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import styles from "./hero-grid.module.css";

// Each route owns one grid column: the image shown behind it and the hero copy shown on top of it.
const columns = [
  {
    path: "/about",
    src: "/street.jpg",
    title: "About",
    subtitle: "Placeholder — page content coming soon.",
  },
  {
    path: "/",
    src: "/walk.jpg",
    title: "ETHAN\nNERWAL",
    subtitle: "Software engineer — portfolio in progress.",
  },
  {
    path: "/projects",
    src: "/street.jpg",
    title: "Projects",
    subtitle: "Placeholder — page content coming soon.",
  },
  {
    path: "/contact",
    src: "/street.jpg",
    title: "Contact",
    subtitle: "Placeholder — page content coming soon.",
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
            <Image
              src={column.src}
              alt=""
              fill
              priority={i === 1}
              sizes="(min-width: 640px) 25vw, 50vw"
              className={styles.image}
            />
          )}
        </div>
      ))}

      {active && <HeroCopy title={active.title} subtitle={active.subtitle} />}
    </div>
  );
}

// Headline + subhead for the active route. Multi-line titles render each word as its own element,
// independently font-sized (never stretched) so every line's natural width fills the same edge.
function HeroCopy({ title, subtitle }: { title: string; subtitle: string }) {
  const lines = title.split("\n");

  return (
    <div className={styles.copy}>
      <div className={styles.copyBox}>
        {lines.length > 1 ? (
          <h1 className={styles.srOnly}>{title.replace(/\n/g, " ")}</h1>
        ) : null}
        {lines.map((line, i) =>
          lines.length > 1 ? (
            <FitLine key={line} text={line} aria-hidden />
          ) : (
            <h1 key={line} className={styles.headline}>
              {line}
            </h1>
          ),
        )}
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
}

// One line of text, scaled (never stretched) so its natural width exactly fills its container.
// Measures itself at a reference size, then derives the font-size that hits 100% width.
function FitLine({ text, ...rest }: { text: string } & React.AriaAttributes) {
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
        className={styles.fitLineText}
      >
        {text}
      </div>
    </div>
  );
}
