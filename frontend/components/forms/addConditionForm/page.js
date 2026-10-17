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

export default function AddConditionForm() {
    const [addConditionFormFields, setAddConditionFormFields] = useState({
        name: "",
        description: "",
        type: "",
        symptoms: [],
        causedConditions: [],
        solvedConditions: []
    })
    return (
        <div className="addConditionFormContainer">
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
        </div>
    )
}