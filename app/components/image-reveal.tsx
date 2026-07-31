import Image, { type ImageProps } from "next/image";
import styles from "./image-reveal.module.css";

// Wraps next/image with a solid white veil that fades out on mount, paired with the image itself
// zooming out from a slight scale — matching the inspo site's image intro treatment.
export function ImageReveal({ className, ...props }: ImageProps) {
  return (
    <>
      <Image {...props} className={`${styles.image} ${className ?? ""}`} />
      <div className={styles.veil} aria-hidden />
    </>
  );
}
