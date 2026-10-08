"use client";

import { useState } from "react";
import "./styles.css"
import DetailedActionCard from "../detailedActionCard/page";

export default function SummarisedTimelineCard({ data, setShowCard }) {
  const color = data.color || "#434345";

  return (
    <div
      className="card"
      style={{
        backgroundColor: color,
        boxShadow:
          `0 6px 20px ${color}35`,
      }}
      onClick={() => setShowCard((prev) => ({
        ...prev,
        type: "action",
        isShowing: true
      }))}
    >
      <div className="overlay" />
      <div className="content">
        <div className="top">
          <div className="titleWrapper">
            <span className="dot" />
            <span className="title">
              {data.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
