import { Suspense } from "react";
import "./styles.css"
import dynamic from "next/dynamic";
import Loader from "@/components/loader/page";

const TimelineComponent = dynamic(
    () => import("@/components/timeline/page"),
    { ssr: false, suspense: true, loading: () => <Loader /> }
);

export default function TimelinePage() {
    return (
        <div>
            <div className="timelinePageHeroSection">
                <h1 className="timelineHeroSectionTitle">Unlock the Potential <br /> <span className="remarkableTimelinePageTitlePhrase">Hidden With <span className="usTxt">Us</span></span></h1>
                <div className="circle"></div>
                <p className="timelineHeroSectionDesc">Using our platform, you can add down here all of your medical history and track all symptoms, surgical operations done and genetical diseases with an elegant timeline!</p>
                <div className="addActionOrConditionButtonsContainer">
                    <button className="addActionButton">
                        Add Action +
                    </button>
                    <button className="addConditionButton">
                        Add Condition +
                    </button>
                </div>
            </div>
            <Suspense fallback={<div className="kk">
                <Loader />
            </div>}>
                <TimelineComponent />
            </Suspense>
        </div>
    )
}