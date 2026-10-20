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
  const [allActionsAndConditions, setAllActionsAndConditions] = useState([]);
  useEffect(() => {
    if (userId) {
      async function localUseEffectFn() {
        const { initialTasks, allConditions } = await fetchAllActionsAndConditions({ userId });
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
  const selectedItem = allActionsAndConditions.find(
    (item) => item.id === showCard.id
  );

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
      {showCard.isShowing && selectedItem && (
        showCard.type === "Action" ? (
          <div className="detailedActionCard">
            <DetailedActionCard
              userId={userId}
              DBID={selectedItem.DBID}
              title={selectedItem.title}
              desc={selectedItem.desc}
              subType={selectedItem.subType}
              date={selectedItem.date}
              start={selectedItem.start}
              duration={selectedItem.duration}
              doctor={selectedItem.doctor}
              setShowCard={setShowCard}
              revealAssocTable={revealAssocTable}
            />
          </div>
        ) : (
          <DetailedConditionCard
            userId={userId}
            DBID={selectedItem.DBID}
            title={selectedItem.title}
            desc={selectedItem.desc}
            subType={selectedItem.subType}
            date={selectedItem.date}
            start={selectedItem.start}
            duration={selectedItem.duration}
            tags={selectedItem.symptoms}
            setShowCard={setShowCard}
            revealAssocTable={revealAssocTable}
          />
        )
      )}
      <div className="willowContainer">
        <Willow>
          <div className="ganttContainer" style={{ height: allActionsAndConditions?.length == 1 ? '200px' : `${allActionsAndConditions?.length}00px` }} >
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
    </div >
  );
}