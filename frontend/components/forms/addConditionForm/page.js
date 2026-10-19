"use client"

import "./styles.css"
import EventDescriptionField from "@/components/fields/actionOrCondition/description/page"
import EventNameField from "@/components/fields/actionOrCondition/name/page"
import { startTransition, useEffect, useState, useTransition } from "react"
import ConditionTypeField from "@/components/fields/conditionType/page"
import ConditionSymptomsField from "@/components/fields/conditionSymptoms/page"
import CausedConditionsField from "@/components/fields/causedConditions/page"
import SolvedConditionsField from "@/components/fields/solvedConditions/page"
import { causedWhichActions, sideEffectForWhichActions } from "@/tooltip-msg"
import EventStartAndEndDatesFields from "@/components/fields/actionOrCondition/startAndEndDates/page"
import { conditionDescription, conditionName, conditionStartAndEndDates, conditionSymptoms, conditionType } from "@/utils/validation/addCondition"
import { Alert } from "@mui/material"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/routes"

export default function AddConditionForm() {
    const { data } = useSession()
    let userId = data?.user?.id
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [assocActions, setAssocActions] = useState([])
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
        dates: "",
        general: ""
    })

    function contributeCondition() {
        startTransition(async () => {
            let { name, description, type, symptoms, causedConditions, solvedConditions, startDate, endDate } = addConditionFormFields
            let conditionNameValidationResult = conditionName({ name })
            let conditionDescriptionValidationResult = conditionDescription({ description })
            let typeValidationResult = conditionType({ type })
            let symptomsValidationResult = conditionSymptoms({ symptoms })
            let startAndEndDateValidationResult = conditionStartAndEndDates({ startDate, endDate })

            console.log(causedConditions, solvedConditions)
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
                try {
                    const response = await fetch(`http://localhost:5000/conditions/${userId}`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name, description, type, symptoms, startDate, endDate, causedWhichActions: solvedConditions, sideEffectForWhichActions: causedConditions })
                    })

                    let data = await response.text()

                    if (response.status == 201) {
                        console.log(data)
                        setConditionFormFieldsValidation((prev) => ({
                            ...prev,
                            general: "Success!"
                        }))
                        console.log("CONDITION CREATED SUCCESSFULLY!-------------------->")
                        router.push(ROUTES.TIMELINE)
                    } else {
                        setConditionFormFieldsValidation((prev) => ({
                            ...prev,
                            general: data
                        }))
                    }
                } catch (err) {
                    setConditionFormFieldsValidation((prev) => ({
                        ...prev,
                        general: err
                    }))

                    throw new Error(`An error occured while creating condition: ${err}`)
                }
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
        })
    }
    useEffect(() => {
        if (userId) {
            async function fetchAssocActions() {
                const response = await fetch(`http://localhost:5000/actions/${userId}`, {
                    method: "GET",
                    next: { revalidate: 60 }
                })
                if (response.status === 200) {
                    const fetchAllActionsData = await response.json();
                    if (Array.isArray(fetchAllActionsData.actions)) {
                        fetchAllActionsData.actions.map(({ name, id }) =>
                            setAssocActions(prev => [...prev, { id, name }])
                        );
                    }
                } else {
                    const err = await response.text()
                    console.log(err + ")))))))))))))))))))))))))))))))")
                    throw new Error(`Failed to fetch conditions: ${err}`)
                }
            }
            fetchAssocActions()
        }
    }, [userId])
    console.log(JSON.stringify(assocActions) + "-----------------------")

    let { name, description, dates, type, symptoms, general } = conditionFormFieldsValidation
    let errToShow =
        name ||
        description ||
        type ||
        symptoms ||
        dates ||
        general
    return (
        <div className="addConditionFormContainer">
            {errToShow &&
                <Alert severity="error" className="errPopup">
                    {errToShow}
                </Alert>
            }
            {general == 'Success!' &&
                <Alert severity="success" className="successPopup">
                    Condition Created Successfully!
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
                    assocEvents={assocActions}
                />
                <CausedConditionsField
                    title="Side-Effect for which Actions"
                    tooltip={sideEffectForWhichActions}
                    state={addConditionFormFields}
                    setState={setAddConditionFormFields}
                    assocEvents={assocActions}
                />
            </div>
            <EventStartAndEndDatesFields
                state={addConditionFormFields}
                setState={setAddConditionFormFields}
            />
            <button className="contributeConditionButton" onClick={contributeCondition}>
                {isPending ? 'Contributing Condition...' : 'Contribute Condition'}
            </button>
        </div>
    )
}