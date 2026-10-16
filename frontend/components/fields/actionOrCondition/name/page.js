"use client"

import "./styles.css"
import TextField from '@mui/material/TextField';

export default function EventNameField({ state, setState }) {
    return (
        <div className="eventNameFieldContainer">
            <p className="eventNameTitle">Name <span className="requiredAsteriks">*</span></p>
            <TextField
                label="Eg: Joint Replacement"
                variant="standard"
                className="eventNameField"
                value={state.name}
                onChange={(e) => {
                    setState((prev) => ({
                        ...prev,
                        name: e.target.value
                    }))
                }}
                sx={{
                    color: "white",
                    '& .MuiInput-root': {
                        '&:before': {
                            borderBottomColor: '#FFFFFF90',
                        },
                        '&:hover:not(.Mui-disabled):before': {
                            borderBottomColor: '#FFFFFF90',
                        },
                        '&:after': {
                            borderBottomColor: '#FFFFFF90',
                        },
                    },
                    '& input': {
                        color: '#FFFFFF',
                        fontSize: '16px',
                    },
                    '& .MuiInputLabel-root': { color: '#FFFFFF90' },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#FFFFFF90' },
                }}
            />
        </div>
    )
}