"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ImageReveal } from "./image-reveal";
import { ScrambleText } from "./scramble-text";
import { useParallax } from "./use-parallax";
import styles from "./hero-grid.module.css";

// Each route's image/copy renders into a fixed grid column: home owns column 2 (index 1),
// while about/projects/contact all share column 3 (index 2) — column 1 stays empty and
// column 4 (index 3) is reserved for the permanent nested-grid decoration below.
const routes = [
  {
    path: "/",
    src: "/walk.jpg",
    title: "ETHAN\nNERWAL",
    subtitle: "Software engineer — portfolio in progress.",
    accent: false,
    column: 1,
  },
  {
    path: "/about",
    src: "/street.jpg",
    title: "About",
    subtitle: "Placeholder — page content coming soon.",
    accent: true,
    column: 2,
  },
  {
    path: "/projects",
    src: "/ring.png",
    title: "Projects",
    subtitle: "Placeholder — page content coming soon.",
    accent: true,
    column: 2,
  },
  {
    path: "/contact",
    src: "/teeth.png",
    title: "Contact",
    subtitle: "Placeholder — page content coming soon.",
    accent: true,
    column: 2,
  },
];

// Renders the 4-column background grid (only the active route's image shows, in its assigned
// column) plus that route's headline, blended with mix-blend-difference so the text color
// reacts to the image behind it.
export function HeroGrid() {
  const pathname = usePathname();
  const active = routes.find((route) => route.path === pathname);

  const nestedLine1Ref = useParallax<HTMLSpanElement>(0.6);
  const nestedLine2Ref = useParallax<HTMLSpanElement>(0.6);
  const nestedLine3Ref = useParallax<HTMLSpanElement>(0.6);

  // Routes outside the fixed nav (e.g. /projects/[slug] detail pages) have no hero image or
  // headline to show — render nothing rather than a full-viewport empty grid.
  if (!active) return null;

  return (
    <div className={styles.grid}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className={styles.column}>
          {active && i === active.column && (
            <>
              <ImageReveal
                src={active.src}
                alt=""
                fill
                priority={active.path === "/"}
                sizes="(min-width: 640px) 25vw, 50vw"
                className={styles.image}
              />
              <div className={styles.imageOverlay} />
            </>
          )}
          {i === 3 && (
            <div className={styles.nestedGrid}>
              <span ref={nestedLine1Ref}>
                <ScrambleText text="Bespoke" trigger="mount" />
                <ScrambleText text="software" trigger="mount" />
              </span>
              <span ref={nestedLine2Ref}>
                <ScrambleText text="Web" trigger="mount" />
                <ScrambleText text="Applications" trigger="mount" />
              </span>
              <span ref={nestedLine3Ref}>
                <ScrambleText text="Optimized" trigger="mount" />
                <ScrambleText text="Workflows" trigger="mount" />
              </span>
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
  const copyBoxRef = useParallax<HTMLDivElement>(0.3, "margin");

  return (
    <div className={styles.copy}>
      <div ref={copyBoxRef} className={styles.copyBox}>
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
  const [revealed, setRevealed] = useState(false);

  // Fade in shortly after mount (and on every route change, since each line remounts),
  // rather than as soon as fontSize resolves — otherwise the reveal is too quick to see.
  useEffect(() => {
    setRevealed(false);
    const id = setTimeout(() => setRevealed(true), 50);
    return () => clearTimeout(id);
  }, [text]);

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
        style={{
          fontSize: fontSize ?? 100,
          visibility: fontSize ? "visible" : "hidden",
          opacity: fontSize && revealed ? 1 : 0,
        }}
        className={`${styles.fitLineText} ${accent ? styles.fitLineTextAccent : ""}`}
      >
        {text}
      </div>
    </div>
  );
}
