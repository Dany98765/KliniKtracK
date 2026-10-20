"use client";

import dynamic from "next/dynamic";
import Loader from "@/components/loader/page";

const TimelineComponent = dynamic(
    () => import("@/components/timeline/page"),
    {
        ssr: false,
        loading: () => <Loader />
    }
);

export default function TimelineWrapper() {
    return <TimelineComponent />;
}