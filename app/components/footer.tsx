"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import styles from "./footer.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

// Structure borrowed from spacer.framer.ai's footer: a closing CTA line, a divider, four link
// columns, and a full-bleed wordmark — recolored to this site's dark theme instead of copying
// their light one.
export function Footer() {
  const pathname = usePathname();

  return (
    <footer className={styles.footer}>
      <div className={styles.cta}>
        <div className={styles.ctaText}>
          <h2 className={styles.ctaHeading}>
            Fewer templates. More outcomes.
            <br />
            Software built to last.
          </h2>
          <p className={styles.ctaSubtitle}>
            Every project starts with a conversation — let&apos;s talk about yours.
          </p>
        </div>
        <Link href="/contact" className={styles.ctaButton}>
          Start a project
          <span className={styles.ctaButtonIcon}>↗</span>
        </Link>
      </div>

      <div className={styles.divider} />

      <div className={styles.columns}>
        <nav className={styles.column}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${pathname === link.href ? styles.linkActive : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.column}>
          <a href="mailto:mimorozu@gmail.com" className={styles.link}>
            mimorozu@gmail.com
          </a>
          <a href="tel:+447389185503" className={styles.linkMuted}>
            +44-7389-185-503
          </a>
        </div>

        <div className={styles.column}>
          <a href="#" className={styles.linkMuted}>
            GitHub
          </a>
          <a href="#" className={styles.linkMuted}>
            LinkedIn
          </a>
          <a href="#" className={styles.linkMuted}>
            X / Twitter
          </a>
        </div>

        <div className={styles.column}>
          <a href="#" className={styles.linkMuted}>
            Privacy Policy
          </a>
          <div className={styles.copyright}>
            <span>{new Date().getFullYear()}© Ethan Nerwal</span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </div>

      <Wordmark text="ETHAN NERWAL" />
    </footer>
  );
}

// Scaled (never stretched) so its natural width exactly fills the footer, edge to edge — same
// measure-then-scale technique as HeroCopy's FitLine, since a fixed clamp() can't guarantee a
// true full-bleed fit across arbitrary viewport widths.
function Wordmark({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<number | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const el = textRef.current;
    if (!container || !el) return;

    const fit = () => {
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
    document.fonts.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    return () => observer.disconnect();
  }, [text]);

  return (
    <div ref={containerRef} className={styles.wordmark} aria-hidden>
      <div
        ref={textRef}
        style={{ fontSize: fontSize ?? 100, visibility: fontSize ? "visible" : "hidden" }}
        className={styles.wordmarkText}
      >
        {text}
      </div>
    </div>
  );
}
