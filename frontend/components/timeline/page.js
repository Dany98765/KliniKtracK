"use client";

import { useEffect, useState } from "react";
import { Gantt, Willow } from "@svar-ui/react-gantt";
import "@svar-ui/react-gantt/all.css";
import "./styles.css"
import SummarisedTimelineCard from "@/components/cards/summarisedTimelineCard/page";
import DetailedActionCard from "../cards/detailedActionCard/page";
import DetailedConditionCard from "../cards/detailedConditionCard/page";
import { useRouter, useSearchParams } from "next/navigation";
import { links, scales } from "./timeline-config";
import { useSession } from "next-auth/react";
import { fetchAllActionsAndConditions } from "@/utils/actions/actionsAndConditions.action";

export default function TimelineComponent() {
  const { data } = useSession()
  let userId = data?.user?.id
  const [allActionsAndConditions, setAllActionsAndConditions] = useState();
  useEffect(() => {
    if (userId) {
      async function localUseEffectFn() {
        let { initialTasks, allConditions } = await fetchAllActionsAndConditions({ userId });
        setAllActionsAndConditions([...initialTasks, ...allConditions]);
      }
      localUseEffectFn();
    }
  }, [userId]);
  let searchParams = useSearchParams();
  let revealAssocTable = searchParams?.get("revealAssocTable") || "false"
  const router = useRouter()
  const [showCard, setShowCard] = useState({
    id: "",
    type: "Action", // action - condition
    isShowing: false
  })

  function taskTemplate(props) {
    return (
      <SummarisedTimelineCard
        id={props.data.id}
        color={props.data.color}
        title={props.data.title}
        type={props.data.type}
        setShowCard={setShowCard}
      />
    );
  }
  useEffect(() => {
    const newParams = new URLSearchParams(window.location.search);
    if (!newParams.has("revealAssocTable")) return;
    newParams.delete("revealAssocTable");
    const query = newParams.toString();
    const newUrl = query
      ? `${window.location.pathname}?${query}`
      : window.location.pathname;
    router.replace(newUrl);
  }, []);
  return (
    <div className="timeline">
      {showCard.isShowing && (
        showCard.type === "Action" ? (
          <div className="detailedActionCard">
            <DetailedActionCard
              title={allActionsAndConditions[showCard.id]?.title}
              desc={allActionsAndConditions[showCard.id].desc}
              subType={allActionsAndConditions[showCard.id].subType}
              date={allActionsAndConditions[showCard.id].date}
              start={allActionsAndConditions[showCard.id].start}
              duration={allActionsAndConditions[showCard.id].duration}
              doctor={allActionsAndConditions[showCard.id].doctor || null}
              setShowCard={setShowCard}
              revealAssocTable={revealAssocTable}
              caused={allActionsAndConditions[showCard.id].caused}
              solved={allActionsAndConditions[showCard.id].solved}
            // doctor ID
            />
          </div>
        ) : (
          <DetailedConditionCard
            title={conditions[showCard.id].title}
            desc={conditions[showCard.id].desc}
            subType={conditions[showCard.id].subType}
            date={conditions[showCard.id].start.toLocaleDateString()}
            duration={conditions[showCard.id].duration}
            tags={conditions[showCard.id].tags}
            setShowCard={setShowCard}
            revealAssocTable={revealAssocTable}
            caused={conditions[showCard.id].caused}
            wasSolved={conditions[showCard.id].wasSolved}
          // doctor ID
          />
        )
      )}
      <div className="willowContainer">
        <Willow>
          <div className="ganttContainer" style={{ height: `${allActionsAndConditions?.length}00px` }} >
            <Gantt
              tasks={allActionsAndConditions}
              links={links}
              scales={scales}
              taskTemplate={taskTemplate}
              cellWidth={80}
              cellHeight={52}
              readonly={true}
              columns={false}
            />
          </div>
        </Willow>
      </div>
    </div>
  );
}