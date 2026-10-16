"use client"

import "./styles.css"
import { selectFieldProps } from "./selectFieldProps"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
export default function SolvedConditionsField() {
    return (
        <div className="solvedConditionsFieldContainer">
            <p className="solvedConditionsTitle">Solved Conditions <span className="requiredAsteriks">*</span></p>
            <FormControl
                className="solvedConditionsField"
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