"use client";

import { useEffect, useState } from "react";
import { Gantt, Willow } from "@svar-ui/react-gantt";
import "@svar-ui/react-gantt/all.css";
import "./styles.css"
import SummarisedTimelineCard from "@/components/cards/summarisedTimelineCard/page";
import DetailedActionCard from "../cards/detailedActionCard/page";
import DetailedConditionCard from "../cards/detailedConditionCard/page";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function colorIndicator(type, subType = "") {
  if (type == 'Action') {
    switch (subType) {
      case "Surgical Operation":
        return "#A411D9"
      case "Tablet":
        return "#23BAE7"
      case "Genetic":
        return "#DDDDDD"
    }
  } else {
    return "#FFFFFF"
  }
}

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
    color: colorIndicator("Action", "Surgical Operation"),
  },

  {
    id: "1",
    title: "Cortisone Tablets",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus laoreet dui at vestibulum. Curabitur in nisi mattis, porttitor ante eget, luctus leo. Ut et libero commodo, pulvinar augue vitae, cursus eros. Fusce hendrerit condimentum mollis. Sed tempor velit at elit porttitor viverra. Donec cursus pretium quam, mollis consequat justo hendrerit id. ",
    type: "Action",
    subType: "Tablet",
    start: new Date(2026, 8, 1),
    date: "10-07-2018 → 11-07-2018",
    duration: 10,
    color: colorIndicator("Action", "Tablet"),
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
    color: colorIndicator("Condition"),
  },

  {
    id: "3",
    title: "Diabetes Type 2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus laoreet dui at vestibulum. Curabitur in nisi mattis, porttitor ante eget, luctus leo. Ut et libero commodo, pulvinar augue vitae, cursus eros. Fusce hendrerit condimentum mollis. Sed tempor velit at elit porttitor viverra. Donec cursus pretium quam, mollis consequat justo hendrerit id. ",
    type: "Action",
    subType: "Genetic",
    tags: ['high blood pressure', 'diabetic coma'],
    start: new Date(2026, 8, 15),
    date: "10-07-2018 → 11-07-2018",
    duration: 15,
    color: colorIndicator("Action", "Genetic")
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
