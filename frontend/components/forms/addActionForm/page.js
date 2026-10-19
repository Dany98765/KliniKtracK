"use client"

import "./styles.css"
import EventDescriptionField from "@/components/fields/actionOrCondition/description/page"
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
import { causedConditions, solvedConditions } from "@/tooltip-msg"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/routes"

export default function AddActionForm() {
    const { data } = useSession()
    let userId = data?.user?.id
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [addActionFormFields, setAddActionFormFields] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        doctorName: "",
        doctorID: undefined,
        causedConditions: [],
        solvedConditions: [],
        actionType: ""
    })

    const [actionFormFieldsValidation, setActionFormFieldsValidation] = useState({
        name: "",
        description: "",
        dates: "",
        doctorName: "",
        actionType: "",
        general: ""
    })

    const [assocConditions, setAssocConditions] = useState([])
    function contributeAction() {
        startTransition(async () => {
            const { name, description, startDate, endDate, doctorName, doctorID, causedConditions, solvedConditions, actionType } = addActionFormFields
            let actionNameValidationResult = actionName({ name })
            let actionDescriptionValidationResult = actionDescription({ description })
            let startAndEndDateValidationResult = actionStartAndEndDates({ startDate, endDate })
            let actionDoctorNameValidationResult = actionDoctorName({ doctorName })
            let actionTypeValidationResult = actionTypeValidationFn({ actionType })
            console.log(startDate, endDate)

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
                try {
                    const response = await fetch(`http://localhost:5000/actions/${userId}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ name, description, startDate: startDate, endDate: endDate, type: actionType, doctor: doctorName, doctorId: parseInt(doctorID, 10), causedConditions, solvedConditions })
                    })

                    const data = await response.text()

                    console.log(data + "DATA")

                    if (response.status == 201) {
                        setActionFormFieldsValidation((prev) => ({
                            ...prev,
                            general: "Success!"
                        }))
                        router.push(ROUTES.TIMELINE)
                    } else {
                        setActionFormFieldsValidation((prev) => ({
                            ...prev,
                            general: data
                        }))
                    }
                } catch (err) {
                    setActionFormFieldsValidation((prev) => ({
                        ...prev,
                        general: err
                    }))

                    throw new Error(`An error occured while creating action: ${err}`)
                }
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
                console.log(addActionFormFields)
            }
        })
    }
    useEffect(() => {
        if (userId) {
            async function fetchAssocConditions() {
                const response = await fetch(`http://localhost:5000/conditions/${userId}`, {
                    method: "GET",
                    next: { revalidate: 60 }
                })
                if (response.status === 200) {
                    const fetchAllConditionsData = await response.json();
                    console.log(fetchAllConditionsData.condition)
                    // if (Array.isArray(fetchAllConditionsData.conditions)) {
                    //     fetchAllConditionsData.conditions.map(({ name, id }) =>
                    //         setAssocConditions(
                    //             fetchAllConditionsData.conditions.map(({ name, id }) => ({
                    //                 id,
                    //                 name
                    //             }))
                    //         )
                    //     );
                    // }
                    if (Array.isArray(fetchAllConditionsData.conditions)) {
                        setAssocConditions(
                            fetchAllConditionsData.conditions.map(({ name, id }) => ({
                                id,
                                name
                            }))
                        );
                    }
                } else {
                    const err = await response.text()
                    console.log(err + ")))))))))))))))))))))))))))))))")
                    throw new Error(`Failed to fetch conditions: ${err}`)
                }
            }
            fetchAssocConditions()
        }
    }, [userId])
    console.log(JSON.stringify(assocConditions) + ":;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
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
            {actionFormFieldsValidation.general == 'Success!' &&
                <Alert severity="success" className="successPopup">
                    Action Created Successfully!
                </Alert>
            }
            <div className="splittedFieldTypesContainer">
                <div className="addActionInputFieldsContainer">
                    <EventNameField
                        state={addActionFormFields}
                        setState={setAddActionFormFields}
                        className="actionNameField"
                    />
                    <EventDescriptionField
                        state={addActionFormFields}
                        setState={setAddActionFormFields}
                        className="actionDescriptionField"
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
                            title="Caused Conditions"
                            tooltip={causedConditions}
                            state={addActionFormFields}
                            setState={setAddActionFormFields}
                            assocEvents={assocConditions}
                        />
                        <SolvedConditionsField
                            title="Solved Conditions"
                            tooltip={solvedConditions}
                            state={addActionFormFields}
                            setState={setAddActionFormFields}
                            assocEvents={assocConditions}
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
                {isPending ? 'Contributing Action...' : 'Contribute Action'}
            </button>
        </div>
    )
}