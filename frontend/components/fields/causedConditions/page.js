"use client"

import { selectFieldProps } from "./selectFieldProps"
import "./styles.css"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

export default function CausedConditionsField({ state, setState }) {
    return (
        <div className="causedConditionsFieldContainer">
            <p className="causedConditionsTitle">Caused Conditions</p>
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