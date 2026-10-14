"use client";

import { useEffect, useState } from "react";
import { Gantt, Willow } from "@svar-ui/react-gantt";
import "@svar-ui/react-gantt/all.css";
import "./styles.css"
import SummarisedTimelineCard from "@/components/cards/summarisedTimelineCard/page";
import DetailedActionCard from "../cards/detailedActionCard/page";
import DetailedConditionCard from "../cards/detailedConditionCard/page";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { initialTasks, links, scales } from "./timeline-config";

export default function TimelineComponent() {
  const [tasks, setTasks] = useState(initialTasks);
  let searchParams = useSearchParams();
  let revealAssocTable = searchParams?.get("revealAssocTable") || "false"
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter()
  const pathname = usePathname();
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
              title={initialTasks[showCard.id].title}
              desc={initialTasks[showCard.id].desc}
              subType={initialTasks[showCard.id].subType}
              date={initialTasks[showCard.id].start.toLocaleDateString()}
              duration={initialTasks[showCard.id].duration}
              doctor={initialTasks[showCard.id].doctor || null}
              setShowCard={setShowCard}
              revealAssocTable={revealAssocTable}
              caused={initialTasks[showCard.id].caused}
              solved={initialTasks[showCard.id].solved}
            // doctor ID
            />
          </div>
        ) : (
          <DetailedConditionCard
            title={initialTasks[showCard.id].title}
            desc={initialTasks[showCard.id].desc}
            subType={initialTasks[showCard.id].subType}
            date={initialTasks[showCard.id].start.toLocaleDateString()}
            duration={initialTasks[showCard.id].duration}
            tags={initialTasks[showCard.id].tags}
            setShowCard={setShowCard}
            revealAssocTable={revealAssocTable}
            caused={initialTasks[showCard.id].caused}
            wasSolved={initialTasks[showCard.id].wasSolved}
          // doctor ID
          />
        )
      )}
      <div className="willowContainer">
        <Willow>
          <div className="ganttContainer" style={{ height: `${initialTasks.length}00px` }}>
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