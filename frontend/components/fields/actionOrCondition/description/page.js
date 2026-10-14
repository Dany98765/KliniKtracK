"use client"

import "./styles.css"
import TextField from '@mui/material/TextField';

export default function EventDescriptionField() {
    return (
        <div className="eventDescFieldContainer">
            <p className="eventDescTitle">Description <span className="requiredAsteriks">*</span></p>
            <TextField label="Eg: I performed surgery on the patient’s damaged joint, carefully repairing the affected structures and restoring the joint’s movement and function. I then closed the surgical site and monitored the patient’s condition throughout the procedure." variant="standard" sx={{
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
                width: "300px",
            }} />
        </div>
    )
}