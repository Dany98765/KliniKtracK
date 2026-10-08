"use client";

import { useState } from "react";
import { Gantt, Willow } from "@svar-ui/react-gantt";
import "@svar-ui/react-gantt/all.css";
import "./styles.css"
import SummarisedTimelineCard from "@/components/cards/summarisedTimelineCard/page";
import DetailedActionCard from "../cards/detailedActionCard/page";

const initialTasks = [
  {
    id: "1",
    text: "Research",
    start: new Date(2026, 9, 1),
    duration: 1,
    color: "#DDDDDD",
    type: "summary",
  },

  {
    id: "2",
    text: "Design",
    start: new Date(2026, 9, 3),
    duration: 5,
    color: "#23BAE7",
    type: "task",
  },

  {
    id: "3",
    text: "Project Overview",
    start: new Date(2026, 9, 5),
    duration: 6,
    color: "#A411D9",
    type: "task",
  },
];

const scales = [
  {
    unit: "month",
    step: 1,
    format: "%F %Y",
  },
  {
    unit: "day",
    step: 1,
    format: "%D %j",
  },
];

export default function TimelineComponent() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showCard, setShowCard] = useState({
    type: "action", // action - condition
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
        data={props.data}
        setShowCard={setShowCard}
        onColorChange={changeTaskColor}
      />
    );
  }
  const links = [
    {
      source: "2",
      target: "3",
      type: "s2s" // "e2s" | "s2s" | "e2e" | "s2e",
    }
  ]
  return (
    <div className="timeline" >
      {showCard.isShowing && (
        <div className="detailedActionCard">
          <DetailedActionCard />
        </div>
      )}
      <div className="willowContainer">
        <Willow>
          <div className="ganttContainer">
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
