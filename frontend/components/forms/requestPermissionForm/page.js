"use client"

import "./styles.css"
import EventDoctorIDField from "@/components/fields/doctorID/page"
import { useState, useTransition } from "react"
import EventStartAndEndDatesFields from "@/components/fields/actionOrCondition/startAndEndDates/page"
import PermissionScopeField from "@/components/fields/permissionScope/page"
import { permissionScopeValidation, requestPermissionPatientID, permissionStartAndEndDates } from "@/utils/validation/permission"
import { Alert } from "@mui/material"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/routes"

export default function RequestPermissionForm() {
    const { data } = useSession()
    let userId = data?.user?.id
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [requestPermissionFormFields, setRequestPermissionFormFields] = useState({
        patientID: "",
        permissionScope: "",
        startDate: "",
        endDate: "",
    })
    const [requestPermissionValidation, setRequestPermissionValidation] = useState({
        patientID: "",
        permissionScope: "",
        dates: "",
        general: ""
    })
    function requestPermission() {
        startTransition(async () => {
            const { patientID, startDate, endDate, permissionScope } = requestPermissionFormFields
            let patientIDValidationResult = requestPermissionPatientID({ patientID })
            let permissionScopeValidationResult = permissionScopeValidation({ permissionScope })
            let startAndEndDatesValidationResult = permissionStartAndEndDates({ startDate, endDate })
            if (!patientIDValidationResult.msg &&
                !permissionScopeValidationResult.msg &&
                !startAndEndDatesValidationResult.msg
            ) {
                try {
                    console.log("PERMISSION REQUESTING VALIDATION IS SUCCESSFUL!")
                    setRequestPermissionValidation({
                        doctorID: "",
                        permissionScope: "",
                        dates: ""
                    })
                    const response = await fetch(`http://localhost:5000/request-permission/${userId}`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ patientId: patientID, scope: permissionScope, startDate, endDate })
                    })
                    console.log("STARTED2!")
                    let data = await response.text()
                    console.log(data, response.status + "KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
                    if (response.status == 201) {
                        setRequestPermissionFormFields((prev) => ({
                            ...prev,
                            general: "Success!"
                        }))
                        router.push(ROUTES.PROFILE)
                    } else {
                        setRequestPermissionFormFields((prev) => ({
                            ...prev,
                            general: response.status + data
                        }))
                    }
                } catch (err) {
                    throw new Error(err)
                }
            } else {
                setRequestPermissionValidation({
                    doctorID: patientIDValidationResult.msg,
                    permissionScope: permissionScopeValidationResult.msg,
                    dates: startAndEndDatesValidationResult.msg
                })
            }
        })
    }
    let { patientID, permissionScope, dates } = requestPermissionValidation
    let errToShow =
        patientID ||
        permissionScope ||
        dates
    return (
        <div className="requestPermissionFormContainer">
            <div className="requestPermissionTagContainer">
                <span className="requestPermissionUICircle" />
                <p className="requestPermissionTagDesc">Patients: Now can receive proper guidance</p>
            </div>
            <p className="requestPermissisonFormTitle">Request Permissions from <br />your<span className="bluePatientsTxt"> Patients</span></p>
            <p className="requestPermissisonFormDesc">Allow the doctors your are following with to view all your clinical history, edit it or even both</p>
            <div className="requestPermissionFormFieldsContainer">
                {requestPermissionValidation.general != 'Success!' && requestPermissionValidation.general &&
                    (
                        <Alert severity="error" className="errPopup">
                            {requestPermissionValidation.general}
                        </Alert>
                    )
                }
                {errToShow &&
                    (
                        <Alert severity="error" className="errPopup">
                            {errToShow}
                        </Alert>
                    )
                }
                {requestPermissionValidation.general == 'Success!' &&
                    (
                        <Alert severity="success" className="successPopup">
                            Permission Request Sent Successfully!
                        </Alert>
                    )
                }
                <EventDoctorIDField
                    state={requestPermissionFormFields}
                    setState={setRequestPermissionFormFields}
                    form="requestPermission"
                    className="doctorIDFieldForGrantPermissionForm"
                />
                <PermissionScopeField
                    state={requestPermissionFormFields}
                    setState={setRequestPermissionFormFields}
                    className="permissionScopeField"
                />
                <EventStartAndEndDatesFields
                    state={requestPermissionFormFields}
                    setState={setRequestPermissionFormFields}
                    className="startAndEndDatesFieldsContainerForGrantPermissionForm"
                    startDateField="permissionStartDateField"
                    endDateField="permissionEndDateField"
                />
            </div>
            <button className="requestPermissionButton" onClick={requestPermission}>
                {isPending ? 'Granting Permission...' : 'Grant Permission'}
            </button>
        </div>
    )
}