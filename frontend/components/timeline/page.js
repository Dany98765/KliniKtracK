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
  useEffect(() => {
    if (userId) {
      async function localUseEffectFn() {
        let { initialTasks } = await fetchAllActions({ userId })
        setTasks(initialTasks)
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
      current?.map((task) =>
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
  console.log(JSON.stringify(tasks) + "[[")
  const currentTask = tasks?.map((task) => {
    console.log(task.id)
  })
  return (
    <div className="timeline">
      {/* {showCard.isShowing && (
        showCard.type === "Action" ? (
          <div className="detailedActionCard">
            <DetailedActionCard
              title={currentTask[showCard.id]?.title}
              desc={currentTask[showCard.id].desc}
              subType={currentTask[showCard.id].subType}
              date={currentTask[showCard.id].date}
              start={currentTask[showCard.id].start}
              duration={currentTask[showCard.id].duration}
              doctor={currentTask[showCard.id].doctor || null}
              setShowCard={setShowCard}
              revealAssocTable={revealAssocTable}
              caused={currentTask[showCard.id].caused}
              solved={currentTask[showCard.id].solved}
            // doctor ID
            />
          </div>
        ) : (
          <DetailedConditionCard
            title={tasks[showCard.id].title}
            desc={tasks[showCard.id].desc}
            subType={tasks[showCard.id].subType}
            date={tasks[showCard.id].start.toLocaleDateString()}
            duration={tasks[showCard.id].duration}
            tags={tasks[showCard.id].tags}
            setShowCard={setShowCard}
            revealAssocTable={revealAssocTable}
            caused={tasks[showCard.id].caused}
            wasSolved={tasks[showCard.id].wasSolved}
          // doctor ID
          />
        )
      )} */}
      {showCard.isShowing && currentTask && (
        showCard.type === "Action" ? (
          <div className="detailedActionCard">
            <DetailedActionCard
              title={currentTask.title}
              desc={currentTask.desc}
              subType={currentTask.subType}
              date={currentTask.date}
              start={currentTask.start}
              duration={currentTask.duration}
              doctor={currentTask.doctor || null}
              setShowCard={setShowCard}
              revealAssocTable={revealAssocTable}
              caused={currentTask.caused}
              solved={currentTask.solved}
            />
          </div>
        ) : (
          <DetailedConditionCard
            title={currentTask.title}
            desc={currentTask.desc}
            subType={currentTask.subType}
            date={new Date(currentTask.start).toLocaleDateString("en-GB", { timeZone: "UTC" })}
            duration={currentTask.duration}
            tags={currentTask.tags}
            setShowCard={setShowCard}
            revealAssocTable={revealAssocTable}
            caused={currentTask.caused}
            wasSolved={currentTask.wasSolved}
          />
        )
      )}


      <div className="willowContainer">
        <Willow>
          <div className="ganttContainer" style={{ height: `${tasks?.length}00px` }} >
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