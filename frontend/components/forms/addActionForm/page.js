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
import { useEffect, useState } from "react"

export default function AddActionForm() {
    const [addActionFormFields, setAddActionFormFields] = useState({
        name: "",
        description: "",
        startDate: new Date(),
        endDate: new Date(),
        doctorName: "",
        doctorID: "",
        causedConditions: [],
        solvedConditions: [],
        actionType: ""
    })

    useEffect(() => {
        console.log(addActionFormFields.startDate.toLocaleDateString())
    }, [addActionFormFields])
    return (
        <div className="addActionFormContainer">
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
            <button className="contributeActionButton">
                Contribute Action
            </button>
        </div>
    )
}