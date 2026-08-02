import { Statement } from "./components/statement";
import { Services } from "./components/services";

// Hero copy for "/" renders inside HeroGrid; this page holds the below-the-fold content.
export default function Home() {
  return (
    <>
      <Statement />
      <Services />
    </>
  );
}
