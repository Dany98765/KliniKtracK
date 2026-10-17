"use client"

import { selectFieldProps } from "./selectFieldProps"
import "./styles.css"
import { FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip } from "@mui/material"
import HelpOutlineIcon from "@mui/icons-material/HelpOutlined"

export default function CausedConditionsField({ title, tooltip, state, setState }) {
    return (
        <div className="causedConditionsFieldContainer">
            <div className="titleAndTooltipContainer">
                <p className="causedConditionsTitle">{title}</p>
                <Tooltip title={tooltip} arrow>
                    <IconButton aria-label="help" size="small">
                        <HelpOutlineIcon fontSize="small" color="info" />
                    </IconButton>
                </Tooltip>
            </div>
            <FormControl
                className="causedConditionsField"
                sx={selectFieldProps}
            >
                <InputLabel id="demo-simple-select-label">--Select Conditions--</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    variant="outlined"
                    multiple
                    value={state.causedConditions}
                    onChange={(e) => {
                        setState((prev) => ({
                            ...prev,
                            causedConditions: e.target.value
                        }))
                    }}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}