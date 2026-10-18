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
import { fetchAllActions } from "@/utils/actions/userActions.action";

export default function TimelineComponent() {
  const { data } = useSession()
  let userId = data?.user?.id
  const [tasks, setTasks] = useState();
  console.log(userId + " FROM CLIENT SIDE")
  useEffect(() => {
    if (userId) {
      async function localUseEffectFn() {
        let fetchActionsRes = await fetchAllActions({ userId })
        setTasks(fetchActionsRes)
      }
      localUseEffectFn()
    }
  }, [])
  let searchParams = useSearchParams();
  let revealAssocTable = searchParams?.get("revealAssocTable") || "false"
  const router = useRouter()
  const [showCard, setShowCard] = useState({
    id: "",
    type: "Action", // action - condition
    isShowing: false
  })

  function changeTaskColor(id, color) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
            ...task,
            color,
          }
          : task
      )
    );
  }

  function taskTemplate(props) {
    return (
      <SummarisedTimelineCard
        id={props.data.id}
        color={props.data.color}
        title={props.data.title}
        type={props.data.type}
        setShowCard={setShowCard}
        onColorChange={changeTaskColor}
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
              title={fetchActionsRes[showCard.id].title}
              desc={fetchActionsRes[showCard.id].desc}
              subType={fetchActionsRes[showCard.id].subType}
              date={fetchActionsRes[showCard.id].start.toLocaleDateString()}
              duration={fetchActionsRes[showCard.id].duration}
              doctor={fetchActionsRes[showCard.id].doctor || null}
              setShowCard={setShowCard}
              revealAssocTable={revealAssocTable}
              caused={fetchActionsRes[showCard.id].caused}
              solved={fetchActionsRes[showCard.id].solved}
            // doctor ID
            />
          </div>
        ) : (
          <DetailedConditionCard
            title={fetchActionsRes[showCard.id].title}
            desc={fetchActionsRes[showCard.id].desc}
            subType={fetchActionsRes[showCard.id].subType}
            date={fetchActionsRes[showCard.id].start.toLocaleDateString()}
            duration={fetchActionsRes[showCard.id].duration}
            tags={fetchActionsRes[showCard.id].tags}
            setShowCard={setShowCard}
            revealAssocTable={revealAssocTable}
            caused={fetchActionsRes[showCard.id].caused}
            wasSolved={fetchActionsRes[showCard.id].wasSolved}
          // doctor ID
          />
        )
      )}
      <div className="willowContainer">
        <Willow>
          {/* style={{ height: `${tasks.length}00px` }} */}
          <div className="ganttContainer" >
            <Gantt
              tasks={tasks}
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