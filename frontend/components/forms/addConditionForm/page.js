"use client"

import EventDescriptionField from "@/components/fields/actionOrCondition/description/page"
import "./styles.css"
import EventNameField from "@/components/fields/actionOrCondition/name/page"
import { useState } from "react"
import ConditionTypeField from "@/components/fields/conditionType/page"
import ConditionSymptomsField from "@/components/fields/conditionSymptoms/page"

export default function AddConditionForm() {
    const [addConditionFormFields, setAddConditionFormFields] = useState({
        name: "",
        description: "",
        type: "",
        symptoms: []
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
        </div>
    )
}