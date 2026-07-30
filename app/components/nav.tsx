import styles from "./nav.module.css";

// Floating menu button, pinned to the top-right corner above all page content.
export function Nav() {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button}>Menu</button>
    </div>
  );
}
