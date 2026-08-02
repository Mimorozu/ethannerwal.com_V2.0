"use client";

import { useEffect, useRef } from "react";

// Lifts an element upward faster than the page scrolls, by `speed` extra pixels of
// travel per pixel scrolled — so it visibly outpaces the (normal-speed) background
// image behind it. The extra lift is capped at one viewport height, since by then
// the element is already well offscreen and further growth would just keep
// dragging everything below it up the page for no visible benefit.
//
// `mode` picks how the offset is applied:
// - "transform" (default): a plain translateY. Cheapest and doesn't affect layout.
// - "margin": use this only when a mix-blend-mode descendant (e.g. FitLine) needs
//   its ancestor to stay out of its own stacking context — transform would create
//   one, cutting the blend off from content outside that subtree (like the
//   background image behind it). Don't use "margin" on a stretch-sized flex/grid
//   item: since height there is "available space minus margin," a negative margin
//   grows the box instead of moving it, leaving anchored content looking static.
export function useParallax<T extends HTMLElement>(
  speed: number,
  mode: "transform" | "margin" = "transform",
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    const update = () => {
      const scrolled = Math.min(window.scrollY, window.innerHeight);
      const offset = -scrolled * speed;
      if (mode === "margin") {
        el.style.marginTop = `${offset}px`;
      } else {
        el.style.transform = `translateY(${offset}px)`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed, mode]);

  return ref;
}
