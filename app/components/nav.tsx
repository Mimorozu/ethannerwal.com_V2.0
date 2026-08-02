"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ImageReveal } from "./image-reveal";
import { ScrambleText } from "./scramble-text";
import styles from "./nav.module.css";

const links = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/contact", label: "CONTACT" },
];

// Floating menu button, pinned to the top-right corner; toggles a full-screen nav overlay.
export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the overlay whenever the route changes (e.g. a link inside it was clicked).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <div className={styles.wrapper}>
        <button className={styles.button} onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}>
        <div className={styles.overlayColumn}>
          {/* Only mounted while open, so the reveal/zoom animation replays on every open
              instead of playing once (invisibly) at the very first page load. */}
          {open && (
            <div className={styles.overlayImageFrame}>
              <ImageReveal
                src="/teeth.png"
                alt=""
                fill
                sizes="25vw"
                className={styles.overlayImage}
              />
            </div>
          )}
        </div>
        <div className={styles.overlayColumn} />
        <div className={`${styles.overlayColumn} ${styles.linksColumn}`}>
          <nav className={styles.links}>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={styles.link}>
                {link.label}
              </Link>
            ))}
          </nav>
          {/* Only mounted while open, so the scramble-in reveal replays on every open
              instead of playing once (invisibly) at the very first page load. */}
          {open && (
            <div className={styles.contact}>
              <ScrambleText text="mimorozu@gmail.com" trigger="mount" />
              <ScrambleText text="+44-7389-185-503" trigger="mount" />
            </div>
          )}
        </div>
        <div className={styles.overlayColumn} />
      </div>
    </>
  );
}
