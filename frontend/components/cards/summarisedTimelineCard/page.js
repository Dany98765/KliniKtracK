"use client";

import "./styles.css"

export default function SummarisedTimelineCard({ id, color, title, type, setShowCard }) {
  let colour = color || "#434345";
  return (
    <div
      className="card"
      style={{
        backgroundColor: colour,
        boxShadow:
          `0 6px 20px ${colour}35`,
      }}
      onClick={() => setShowCard((prev) => ({
        ...prev,
        id,
        type,
        isShowing: true
      }))}
    >
      <div className="overlay" />
      <div className="content">
        <div className="top">
          <div className="titleWrapper">
            <span className="dot" />
            <span className="title">
              {title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
