"use client";

import { useState } from "react";
import { Gantt, Willow } from "@svar-ui/react-gantt";
import "@svar-ui/react-gantt/all.css";
import "./styles.css"
import SummarisedTimelineCard from "@/components/cards/summarisedTimelineCard/page";
import DetailedActionCard from "../cards/detailedActionCard/page";

const initialTasks = [
  {
    id: "0",
    title: "Joint Replacement",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus laoreet dui at vestibulum. Curabitur in nisi mattis, porttitor ante eget, luctus leo. Ut et libero commodo, pulvinar augue vitae, cursus eros. Fusce hendrerit condimentum mollis. Sed tempor velit at elit porttitor viverra. Donec cursus pretium quam, mollis consequat justo hendrerit id. ",
    type: "Action",
    subType: "Surgical Operation",
    doctor: "Mina Fayez",
    start: new Date(2026, 8, 17),
    date: "10-07-2018 → 11-07-2018",
    duration: 1,
    color: "#DDDDDD",
  },

  {
    id: "1",
    title: "Cortisone Tablets",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus laoreet dui at vestibulum. Curabitur in nisi mattis, porttitor ante eget, luctus leo. Ut et libero commodo, pulvinar augue vitae, cursus eros. Fusce hendrerit condimentum mollis. Sed tempor velit at elit porttitor viverra. Donec cursus pretium quam, mollis consequat justo hendrerit id. ",
    type: "Action",
    subType: "Medicine",
    start: new Date(2026, 8, 5),
    date: "10-07-2018 → 11-07-2018",
    duration: 10,
    color: "#23BAE7",
  },

  {
    id: "2",
    title: "Avascular Necrosis",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus laoreet dui at vestibulum. Curabitur in nisi mattis, porttitor ante eget, luctus leo. Ut et libero commodo, pulvinar augue vitae, cursus eros. Fusce hendrerit condimentum mollis. Sed tempor velit at elit porttitor viverra. Donec cursus pretium quam, mollis consequat justo hendrerit id. ",
    type: "Condition",
    subType: "Joint Disorder",
    tags: ['joint pain', 'stifness', 'difficulty walking'],
    start: new Date(2026, 8, 1),
    date: "10-07-2018 → 11-07-2018",
    duration: 15,
    color: "#A411D9",
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
  const links = [
    {
      source: "1",
      target: "2",
      type: "s2e" // "e2s" | "s2s" | "e2e" | "s2e",
    },
    {
      source: "3",
      target: "2",
      type: "e2e" // "e2s" | "s2s" | "e2e" | "s2e",
    }
  ]
  return (
    <div className="timeline">
      {showCard.isShowing && (
        showCard.type === "Action" ? (
          <div className="detailedActionCard">
            <DetailedActionCard 
              title={initialTasks[showCard.id].title}
              desc={initialTasks[showCard.id].desc}
              subType={initialTasks[showCard.id].subType}
              date={initialTasks[showCard.id].date}
              doctor={initialTasks[showCard.id].doctor || null}
              // doctor ID
            />
          </div>
        ) : (
          <p>Hello</p>
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
