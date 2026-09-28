import Image from "next/image";
import styles from "./page.module.css";
import HeroSection from "@/components/pages/home/heroSection/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <HeroSection />
    </div>
  );
}
