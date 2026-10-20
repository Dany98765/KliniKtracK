"use client"

import { selectFieldProps } from "./selectFieldProps"
import "./styles.css"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

export default function PermissionScopeField({ state, setState, className = "" }) {
    return (
        <div className="permissionScopeFieldContainer">
            <p className="permissionScopeTitle">Permission Scope</p>
            <FormControl
                className="permissionScopeField"
                sx={selectFieldProps}
            >
                <InputLabel id="demo-simple-select-label">--Select Scope--</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    variant="outlined"
                    className={className}
                    value={state.permissionScope}
                    onChange={(e) => {
                        setState((prev) => ({
                            ...prev,
                            permissionScope: e.target.value
                        }))
                    }}
                >
                    <MenuItem value="Read only">Read Only</MenuItem>
                    <MenuItem value="Write only">Write Only</MenuItem>
                    <MenuItem value="Read and write">Read & Write</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}