"use client"

import "./styles.css"
import TextField from '@mui/material/TextField';

export default function EventDescriptionField({ state, setState, className }) {
    return (
        <div className="eventDescFieldContainer">
            <p className="eventDescTitle">Description <span className="requiredAsteriks">*</span></p>
            <TextField
                label={className == 'actionDescriptionField' ? "Eg: I performed a surgery on my damaged joint where the affected structures were carefully repaired and restored for the joint’s movements and functions. Finally, my condition was carefully monitored." : "Eg: I faced a condition called Avascular Necrosis after having a surgery in my knee which lead to stiffness, joint pain and difficulty in walking."}
                variant="standard"
                className={className}
                value={state.description}
                onChange={(e) => {
                    setState((prev) => ({
                        ...prev,
                        description: e.target.value
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