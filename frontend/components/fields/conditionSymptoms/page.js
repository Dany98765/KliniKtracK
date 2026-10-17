"use client"

import { useState } from "react";
import "./styles.css"
import TextField from '@mui/material/TextField';

export default function ConditionSymptomsField({ state, setState }) {
    const [currentSymptom, setCurrentSymptom] = useState("")
    let isDisabled = state?.symptoms?.length === 5 ? true : false
    return (
        <div className="conditionTypeFieldContainer">
            <p className="conditionSymptomsTitle">Symptoms <span className="requiredAsteriks">*</span></p>
            <TextField
                label="Eg: Joint Pain"
                variant="standard"
                className="conditionSymptomsField"
                value={currentSymptom}
                onChange={(e) => setCurrentSymptom(e.target.value)}
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
            <div className="allSymptomsAndAddSymptomButtonContainer">
                <div className="allSymptomsContainer">
                    {state.symptoms && state.symptoms?.map((symptom, id) => (
                        <span key={id} className="symptomTag">
                            {symptom}
                            <p className="deleteSymptomTag" onClick={() => {
                                let symptomsArr = state.symptoms;
                                symptomsArr.splice(id, 1)
                                setState((prev) => ({
                                    ...prev,
                                    symptoms: [...symptomsArr]
                                }))
                            }
                            }>×</p>
                        </span>
                    )
                    )}
                </div>
                <button className="addSymptomButton" style={{ backgroundColor: isDisabled ? "#FFFFFF95" : "#FFFFFF" }} disabled={isDisabled} onClick={(e) => {
                    if (currentSymptom.trim().length > 0) {
                        setState((prev) => ({
                            ...prev,
                            symptoms: [...prev.symptoms, currentSymptom]
                        }))
                        setCurrentSymptom("")
                    }
                }}>
                    +
                </button>
            </div>
        </div>
    )
}