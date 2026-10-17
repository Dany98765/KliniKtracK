"use client"

import EventDescriptionField from "@/components/fields/actionOrCondition/description/page"
import "./styles.css"
import EventNameField from "@/components/fields/actionOrCondition/name/page"
import { useState } from "react"
import ConditionTypeField from "@/components/fields/conditionType/page"
import ConditionSymptomsField from "@/components/fields/conditionSymptoms/page"
import CausedConditionsField from "@/components/fields/causedConditions/page"
import SolvedConditionsField from "@/components/fields/solvedConditions/page"
import { causedWhichActions, sideEffectForWhichActions } from "@/tooltip-msg"
import EventStartAndEndDatesFields from "@/components/fields/actionOrCondition/startAndEndDates/page"
import { conditionDescription, conditionName, conditionStartAndEndDates, conditionSymptoms, conditionType } from "@/utils/validation/addCondition"
import { Alert } from "@mui/material"

export default function AddConditionForm() {
    const [addConditionFormFields, setAddConditionFormFields] = useState({
        name: "",
        description: "",
        type: "",
        symptoms: [],
        causedConditions: [],
        solvedConditions: [],
        startDate: "",
        endDate: ""
    })
    const [conditionFormFieldsValidation, setConditionFormFieldsValidation] = useState({
        name: "",
        description: "",
        type: "",
        symptoms: "",
        dates: ""
    })

    function contributeCondition() {
        let { name, description, type, symptoms, causedConditions, solvedConditions, startDate, endDate } = addConditionFormFields
        let conditionNameValidationResult = conditionName({ name })
        let conditionDescriptionValidationResult = conditionDescription({ description })
        let typeValidationResult = conditionType({ type })
        let symptomsValidationResult = conditionSymptoms({ symptoms })
        let startAndEndDateValidationResult = conditionStartAndEndDates({ startDate, endDate })

        if (!conditionNameValidationResult.msg &&
            !conditionDescriptionValidationResult.msg &&
            !startAndEndDateValidationResult.msg &&
            !typeValidationResult.msg &&
            !symptomsValidationResult.msg
        ) {
            console.log("SUCCESSFUL VALIDATION!")
            setConditionFormFieldsValidation({
                name: "",
                description: "",
                type: "",
                symptoms: "",
                dates: ""
            })
            // API Endpoint
        } else {
            console.log("UNSUCCESSFUL VALIDATION!")
            setConditionFormFieldsValidation({
                name: conditionNameValidationResult.msg,
                description: conditionDescriptionValidationResult.msg,
                type: typeValidationResult.msg,
                symptoms: symptomsValidationResult.msg,
                dates: startAndEndDateValidationResult.msg,
            })

        }
    }
    let { name, description, dates, type, symptoms } = conditionFormFieldsValidation
    console.log(symptoms + "{}{}{}{}{}{}")
    let errToShow =
        name ||
        description ||
        type ||
        symptoms ||
        dates 
    return (
        <div className="addConditionFormContainer">
            {errToShow &&
                <Alert severity="error" className="errPopup">
                    {errToShow}
                </Alert>
            }
            <EventNameField
                state={addConditionFormFields}
                setState={setAddConditionFormFields}
                className="conditionNameField"
            />
            <EventDescriptionField
                state={addConditionFormFields}
                setState={setAddConditionFormFields}
                className="conditionDescriptionField"
            />
            <ConditionTypeField
                state={addConditionFormFields}
                setState={setAddConditionFormFields}
            />
            <ConditionSymptomsField
                state={addConditionFormFields}
                setState={setAddConditionFormFields}
            />
            <div className="causedWhichActionsAndSideEffectForWhichActionsContainer">
                <SolvedConditionsField
                    title="Caused which Actions"
                    tooltip={causedWhichActions}
                    state={addConditionFormFields}
                    setState={setAddConditionFormFields}
                />
                <CausedConditionsField
                    title="Side-Effect for which Actions"
                    tooltip={sideEffectForWhichActions}
                    state={addConditionFormFields}
                    setState={setAddConditionFormFields}
                />
            </div>
            <EventStartAndEndDatesFields
                state={addConditionFormFields}
                setState={setAddConditionFormFields}
            />
            <button className="contributeConditionButton" onClick={contributeCondition}>
                Contribute Condition
            </button>
        </div>
    )
}