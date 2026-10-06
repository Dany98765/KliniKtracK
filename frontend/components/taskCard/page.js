"use client";

import styles from "./styles.module.css"

export default function TaskCard({
  data,
}) {
  const color =
    data.color || "#434345";

  const progress =
    data.progress || 0;

  return (
    <div
      className={styles.card}
      style={{
        backgroundColor: color,

        boxShadow:
          `0 6px 20px ${color}35`,
      }}
    >
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.titleWrapper}>
            <span className={styles.dot} />

            <span className={styles.title}>
              {data.text}
            </span>
          </div>

          <span className={styles.duration}>
            {data.duration}d
          </span>
        </div>
      </div>
    </div>
  );
}
