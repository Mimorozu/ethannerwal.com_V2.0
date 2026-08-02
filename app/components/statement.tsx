"use client";

import { Fragment } from "react";
import { useScrollReveal } from "./use-scroll-reveal";
import styles from "./statement.module.css";

const LEAD =
  "The businesses growing fastest today aren't working harder—they're working smarter with technology.";
const SUPPORT =
  "I build custom software that automates repetitive tasks, streamlines operations, and helps businesses scale more efficiently.";

// Two-sentence statement whose words sharpen into focus as the section scrolls through the
// viewport — scrubbed continuously by scroll position (lead words resolve before support
// words start, purely from reading order) rather than triggered once as a block.
export function Statement() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div className={styles.wrapper}>
      <div ref={ref} className={styles.text_wrapper}>
        <p className={styles.lead}>
          <Words text={LEAD} />
        </p>
        <p className={styles.support}>
          <Words text={SUPPORT} />
        </p>
      </div>
    </div>
  );
}

function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className={styles.word} data-word>
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </>
  );
}
