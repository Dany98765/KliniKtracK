"use client";

import dynamic from "next/dynamic";

const Timeline = dynamic(
  () => import("@/components/pages/timeline/page"),
  {
    ssr: false,
  }
);

export default function Page() {
  return <Timeline />;
}
