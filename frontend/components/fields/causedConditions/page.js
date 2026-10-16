"use client"

import { selectFieldProps } from "./selectFieldProps"
import "./styles.css"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

export default function CausedConditionsField() {
    return (
        <div className="causedConditionsFieldContainer">
            <p className="causedConditionsTitle">Caused Conditions <span className="requiredAsteriks">*</span></p>
            <FormControl
                className="causedConditionsField"
                sx={selectFieldProps}
            >
                <InputLabel id="demo-simple-select-label">--Select Conditions--</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    variant="outlined"
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}