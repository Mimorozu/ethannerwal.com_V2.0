"use client";

import { useEffect, useRef, useState } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Shuffles each character through random glyphs before it settles on the real
// text, left to right. Triggered on hover, or once on mount for a "load in" reveal.
export function ScrambleText({
  text,
  className,
  trigger = "hover",
}: {
  text: string;
  className?: string;
  trigger?: "hover" | "mount";
}) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);
  const frameRequest = useRef<number>(0);
  const queue = useRef<{ to: string; start: number; end: number }[]>([]);

  const stop = () => cancelAnimationFrame(frameRequest.current);

  const tick = () => {
    let output = "";
    let settled = 0;
    for (const { to, end } of queue.current) {
      if (frame.current >= end) {
        settled++;
        output += to;
      } else if (to === " ") {
        output += " ";
      } else {
        output += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
    }
    setDisplay(output);
    if (settled === queue.current.length) return;
    frame.current++;
    frameRequest.current = requestAnimationFrame(tick);
  };

  const scramble = () => {
    queue.current = text.split("").map((to) => {
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 30) + 20;
      return { to, start, end };
    });
    frame.current = 0;
    stop();
    tick();
  };

  const reset = () => {
    stop();
    setDisplay(text);
  };

  useEffect(() => {
    if (trigger === "mount") scramble();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hoverProps =
    trigger === "hover" ? { onMouseEnter: scramble, onMouseLeave: reset } : {};

  return (
    <span className={className} {...hoverProps}>
      {display}
    </span>
  );
}
