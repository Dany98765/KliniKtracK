"use client"

import "./styles.css"
import TextField from '@mui/material/TextField';

export default function EventDoctorNameField({ state, setState }) {
    return (
        <div className="eventDoctorNameFieldContainer">
            <p className="eventDoctorNameTitle">Doctor Name <span className="requiredAsteriks">*</span></p>
            <TextField
                label="Eg: John Smith"
                variant="standard"
                className="doctorNameField"
                value={state.doctorName}
                onChange={(e) => {
                    setState((prev) => ({
                        ...prev,
                        doctorName: e.target.value
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