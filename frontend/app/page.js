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
/////////////////////////////////////////
// "use client";

// import styles from "./page.module.css";
// import HeroSection from "@/components/pages/home/heroSection/page";
// import WhyUsSection from "@/components/pages/home/whyUsSection/page";

// import { Timeline } from "vis-timeline/standalone";
// import { DataSet } from "vis-data";
// import "vis-timeline/styles/vis-timeline-graph2d.css";

// import { useEffect, useRef } from "react";

// export default function Home() {
//   const timelineRef = useRef(null);

//   useEffect(() => {
//     if (!timelineRef.current) return;

//     const items = new DataSet([
//       {
//         id: 1,
//         title: "Web Development",
//         start: "2024-01-10",
//         priority: "high",
//         assignee: "John Doe",
//         progress: 75,
//       },
//       {
//         id: 2,
//         title: "Competitor Research",
//         start: "2024-01-07",
//         priority: "low",
//         assignee: "Jane Smith",
//         progress: 40,
//       },
//     ]);

//     const options = {
//       orientation: "top",

//       // Make the timeline easier to style
//       editable: false,

//       template: (item) => {
//         return `
//           <div class="custom-card ${item.priority || ""}">
//             <div class="custom-card-title">
//               ${item.title || ""}
//             </div>

//             <div class="custom-card-assignee">
//               ${item.assignee || ""}
//             </div>

//             <div class="custom-card-progress">
//               ${item.progress || 0}%
//             </div>
//           </div>
//         `;
//       },
//     };

//     const timeline = new Timeline(
//       timelineRef.current,
//       items,
//       options
//     );

//     return () => {
//       timeline.destroy();
//     };
//   }, []);

//   return (
//     <div className={styles.page}>
//       <HeroSection />

//       <WhyUsSection />

//       <div
//         ref={timelineRef}
//         className={styles.timeline}
//       />
//     </div>
//   );
// }
