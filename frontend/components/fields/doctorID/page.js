"use client"

import "./styles.css"
import TextField from '@mui/material/TextField';

export default function EventDoctorIDField({ state, setState, form = "addActionOrCondition", className = "doctorIDField" }) {
    return (
        <div className="eventDoctorIDFieldContainer">
            <p className="eventDoctorIDTitle">
                {form == 'grantPermission' && "Doctor's" }
                <span className="coloredK"> K</span>
                lini
                <span className="coloredK">K</span>
                trac
                <span className="coloredK">K </span>
                Profile ID
                {form == 'grantPermission' && <span className="requiredAsteriks"> *</span>}
                </p>
            <TextField
                label="Eg: 3847028409288940"
                variant="standard"
                className={className}
                value={state.doctorID}
                onChange={(e) => {
                    setState((prev) => ({
                        ...prev,
                        doctorID: e.target.value
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