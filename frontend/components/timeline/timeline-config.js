import { duration } from "@mui/material";

export const scales = [
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

export const links = [
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