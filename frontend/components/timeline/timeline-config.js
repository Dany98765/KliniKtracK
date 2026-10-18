import { duration } from "@mui/material";

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