"use client"

import "./styles.css"
import { selectFieldProps } from "./selectFieldProps"
import { FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip } from "@mui/material"
import HelpOutlineIcon from "@mui/icons-material/HelpOutlined"

export default function SolvedConditionsField({ title, tooltip, state, setState, assocEvents }) {
    return (
        <div className="solvedConditionsFieldContainer">
            <div className="titleAndTooltipContainer">
                <p className="causedConditionsTitle">{title}</p>
                <Tooltip title={tooltip} arrow>
                    <IconButton aria-label="help" size="small">
                        <HelpOutlineIcon fontSize="small" color="info" />
                    </IconButton>
                </Tooltip>
            </div>
            <FormControl
                className="solvedConditionsField"
                sx={selectFieldProps}
            >
                <InputLabel id="demo-simple-select-label">--Select Conditions--</InputLabel>
                <Select
                    multiple
                    labelId="demo-simple-select-label"
                    variant="outlined"
                    value={state.solvedConditions}
                    onChange={(e) => {
                        setState((prev) => ({
                            ...prev,
                            solvedConditions: e.target.value
                        }))
                    }}
                >
                    {assocEvents?.map((condition, id) => (
                        <MenuItem value={id}>{condition.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}