"use client";

import { useState } from "react";

import {
  Gantt,
  Willow,
} from "@svar-ui/react-gantt";

import "@svar-ui/react-gantt/all.css";

import styles from "./styles.module.css";
import TaskCard from "@/components/taskCard/page";

const initialTasks = [
  {
    id: "1",
    text: "Research",
    start: new Date(2026, 5, 1),
    duration: 1,
    progress: 80,
    color: "#d51010",
    type: "summary",
  },

  {
    id: "2",
    text: "Design",
    start: new Date(2026, 9, 3),
    duration: 5,
    progress: 100,
    color: "#10B981",
    type: "task",
  },

  {
    id: "3",
    text: "Project Overview",
    start: new Date(2026, 9, 5),
    duration: 6,
    progress: 40,
    color: "#F59E0B",
    type: "task",
  },

  // {
  //   id: "4",
  //   text: "Development",
  //   start: new Date(2026, 9, 8),
  //   duration: 7,
  //   progress: 30,
  //   color: "#8f3bf6",
  //   type: "task",
  // },

  // {
  //   id: "5",
  //   text: "Messages",
  //   start: new Date(2026, 9, 7),
  //   duration: 4,
  //   progress: 90,
  //   color: "#EC4899",
  //   type: "task",
  // },
  // {
  //   id: "6",
  //   text: "Research",
  //   start: new Date(2026, 9, 1),
  //   duration: 4,
  //   progress: 80,
  //   color: "#8B5CF6",
  //   type: "task",
  // },

  // {
  //   id: "7",
  //   text: "Design",
  //   start: new Date(2026, 9, 3),
  //   duration: 5,
  //   progress: 60,
  //   color: "#10B981",
  //   type: "task",
  // },

  // {
  //   id: "8",
  //   text: "Project Overview",
  //   start: new Date(2026, 9, 5),
  //   duration: 6,
  //   progress: 40,
  //   color: "#F59E0B",
  //   type: "task",
  // },

  // {
  //   id: "9",
  //   text: "Development",
  //   start: new Date(2026, 9, 8),
  //   duration: 7,
  //   progress: 30,
  //   color: "#8f3bf6",
  //   type: "task",
  // },

  // {
  //   id: "10",
  //   text: "Messages",
  //   start: new Date(2026, 9, 7),
  //   duration: 4,
  //   progress: 90,
  //   color: "#EC4899",
  //   type: "task",
  // },
  // {
  //   id: "11",
  //   text: "Research",
  //   start: new Date(2026, 9, 1),
  //   duration: 4,
  //   progress: 80,
  //   color: "#8B5CF6",
  //   type: "task",
  // },

  // {
  //   id: "12",
  //   text: "Design",
  //   start: new Date(2026, 9, 3),
  //   duration: 5,
  //   progress: 60,
  //   color: "#10B981",
  //   type: "task",
  // },

  // {
  //   id: "13",
  //   text: "Project Overview",
  //   start: new Date(2026, 9, 5),
  //   duration: 6,
  //   progress: 40,
  //   color: "#000000",
  //   type: "task",
  // },

  // {
  //   id: "14",
  //   text: "Development",
  //   start: new Date(2026, 9, 8),
  //   duration: 7,
  //   progress: 30,
  //   color: "#8f3bf6",
  //   type: "task",
  // },
  // {
  //   id: "15",
  //   text: "Development",
  //   start: new Date(2026, 9, 8),
  //   duration: 7,
  //   progress: 30,
  //   color: "#8f3bf6",
  //   type: "task",
  // },
  // {
  //   id: "16",
  //   text: "Development",
  //   start: new Date(2026, 9, 8),
  //   duration: 7,
  //   progress: 30,
  //   color: "#8f3bf6",
  //   type: "task",
  // },
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

export default function Timeline() {
  const [tasks, setTasks] =
    useState(initialTasks);

  const [background, setBackground] =
    useState("#08090d");

  const [selectedColor, setSelectedColor] =
    useState("#8B5CF6");

  const [showSettings, setShowSettings] =
    useState(false);

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
      <TaskCard
        data={props.data}
        onColorChange={changeTaskColor}
      />
    );
  }

  return (
    <div
      className={styles.timeline}
      style={{
        backgroundColor: background,
      }}
    >
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>
            Project Timeline
          </h1>

          <p className={styles.subtitle}>
            January 2026
          </p>
        </div>

      </header>

      <div className={styles.ganttWrapper}>
        <Willow>
          <Gantt
            tasks={tasks}
            scales={scales}
            taskTemplate={taskTemplate}
            cellWidth={80}
            cellHeight={52}
            readonly={true}
          />
        </Willow>
      </div>
    </div>
  );
}
