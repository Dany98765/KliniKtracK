import styles from "./page.module.css";
import HeroSection from "@/components/pages/home/heroSection/page";
import WhyUsSection from "@/components/pages/home/whyUsSection/page";

export default async function Home() {
  return (
    <div className={styles.page}>
      <HeroSection />
      <WhyUsSection />
    </div>
  );
}
