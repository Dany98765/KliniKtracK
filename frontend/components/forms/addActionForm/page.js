"use client"

import EventDescriptionField from "@/components/fields/actionOrCondition/description/page"
import "./styles.css"
import EventNameField from "@/components/fields/actionOrCondition/name/page"
import EventStartAndEndDatesFields from "@/components/fields/actionOrCondition/startAndEndDates/page"
import EventDoctorNameField from "@/components/fields/doctorName/page"
import EventDoctorIDField from "@/components/fields/doctorID/page"
import ActionTypeField from "@/components/fields/actionType/page"
import CausedConditionsField from "@/components/fields/causedConditions/page"
import SolvedConditionsField from "@/components/fields/solvedConditions/page"
import { useEffect, useState, useTransition } from "react"
import { actionDescription, actionDoctorName, actionName, actionStartAndEndDates, actionTypeValidationFn } from "@/utils/validation/addAction"
import { Alert } from "@mui/material"

export default function AddActionForm() {
    const [isPending, startTransition] = useTransition()
    const [addActionFormFields, setAddActionFormFields] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        doctorName: "",
        doctorID: "",
        causedConditions: [],
        solvedConditions: [],
        actionType: ""
    })

    const [actionFormFieldsValidation, setActionFormFieldsValidation] = useState({
        name: "",
        description: "",
        dates: "",
        doctorName: "",
        actionType: ""
    })
    // useEffect(() => {
    //     console.log(addActionFormFields)
    // }, [addActionFormFields])
    // useEffect(() => {
    //         setState((prev) => ({
    //             ...prev,
    //             startDate: prev?.startDate?.toLocalDateString(),
    //             startDate: prev?.endDate?.toLocalDateString()
    //         }))
    //     }, [state])
    function contributeAction() {

        const { name, description, startDate, endDate, doctorName, doctorID, causedConditions, solvedConditions, actionType } = addActionFormFields
        let actionNameValidationResult = actionName({ name })
        let actionDescriptionValidationResult = actionDescription({ description })
        let startAndEndDateValidationResult = actionStartAndEndDates({ startDate, endDate })
        let actionDoctorNameValidationResult = actionDoctorName({ doctorName })
        let actionTypeValidationResult = actionTypeValidationFn({ actionType })

        if (!actionNameValidationResult.msg &&
            !actionDescriptionValidationResult.msg &&
            !startAndEndDateValidationResult.msg &&
            !actionDoctorNameValidationResult.msg &&
            !actionTypeValidationResult.msg
        ) {
            console.log("SUCCESSFUL VALIDATION!")
            setActionFormFieldsValidation({
                name: "",
                description: "",
                dates: "",
                doctorName: "",
                actionType: ""
            })
            // API Endpoint
        } else {
            console.log("UNSUCCESSFUL VALIDATION!")
            setActionFormFieldsValidation({
                name: actionNameValidationResult.msg,
                description: actionDescriptionValidationResult.msg,
                dates: startAndEndDateValidationResult.msg,
                doctorName: actionDoctorNameValidationResult.msg,
                actionType: actionTypeValidationResult.msg
            })
        }
    }
    let { name, description, dates, doctorName, actionType } = actionFormFieldsValidation
    let errToShow =
        name ||
        description ||
        dates ||
        doctorName ||
        actionType
    return (
        <div className="addActionFormContainer">
            {errToShow &&
                <Alert severity="error" className="errPopup">
                    {errToShow}
                </Alert>
            }
            <div className="splittedFieldTypesContainer">
                <div className="addActionInputFieldsContainer">
                    <EventNameField
                        state={addActionFormFields}
                        setState={setAddActionFormFields}
                    />
                    <EventDescriptionField
                        state={addActionFormFields}
                        setState={setAddActionFormFields}
                    />
                    <EventStartAndEndDatesFields
                        state={addActionFormFields}
                        setState={setAddActionFormFields}
                    />
                    <div className="doctorNameAndIDFIeldsContainer">
                        <EventDoctorNameField
                            state={addActionFormFields}
                            setState={setAddActionFormFields}
                        />
                        <EventDoctorIDField
                            state={addActionFormFields}
                            setState={setAddActionFormFields}
                        />
                    </div>
                    <div className="causedAndSolvedConditionsContainer">
                        <CausedConditionsField
                            state={addActionFormFields}
                            setState={setAddActionFormFields}
                        />
                        <SolvedConditionsField
                            state={addActionFormFields}
                            setState={setAddActionFormFields}
                        />
                    </div>
                </div>
                <div>
                    <ActionTypeField
                        state={addActionFormFields}
                        setState={setAddActionFormFields}
                    />
                </div>
            </div>
            <button className="contributeActionButton" onClick={contributeAction}>
                Contribute Action
            </button>
        </div>
    )
}