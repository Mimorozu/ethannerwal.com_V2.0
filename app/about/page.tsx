import { Certifications } from "../components/certifications";
import { TechStack } from "../components/tech-stack";

// Hero copy for "/about" renders inside HeroGrid; this page holds the below-the-fold content.
export default function About() {
  return (
    <>
      <TechStack />
      <Certifications />
    </>
  );
}
