"use client"

import { useRouter } from "next/navigation"
import "./styles.css"
import { ROUTES } from "@/routes"
import { FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip } from "@mui/material"
import HelpOutlineIcon from "@mui/icons-material/HelpOutlined"
import { whatIsAction, whatIsCondition } from "@/tooltip-msg"

export default function AddActionOrConditionButtons() {
    const router = useRouter()
    return (
        <div className="addActionOrConditionButtonsContainer">
            <div className="addActionButtonAndToolTipContainer">
                <button className="addActionButton" onClick={() => router.push(ROUTES.ADD_ACTION)}>
                    Add Action +
                </button>
                <Tooltip title={whatIsAction} arrow>
                    <IconButton aria-label="help" size="small">
                        <HelpOutlineIcon fontSize="small" color="info" />
                    </IconButton>
                </Tooltip>
            </div>
            <div className="addConditionButtonAndToolTipContainer">
                <button className="addConditionButton" onClick={() => router.push(ROUTES.ADD_CONDITION)}>
                    Add Condition +
                </button>
                <Tooltip title={whatIsCondition} arrow>
                    <IconButton aria-label="help" size="small">
                        <HelpOutlineIcon fontSize="small" color="info" />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}