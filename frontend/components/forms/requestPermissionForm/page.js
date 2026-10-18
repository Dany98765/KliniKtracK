"use client"

import EventDoctorIDField from "@/components/fields/doctorID/page"
import "./styles.css"
import { useState } from "react"
import EventStartAndEndDatesFields from "@/components/fields/actionOrCondition/startAndEndDates/page"
import PermissionScopeField from "@/components/fields/permissionScope/page"
import { requestPermissionPatientID, permissionScope, permissionStartAndEndDates } from "@/utils/validation/permission"
import { Alert } from "@mui/material"

export default function RequestPermissionForm() {
    const [requestPermissionFormFields, setRequestPermissionFormFields] = useState({
        patientID: "",
        permissionScope: "",
        startDate: "",
        endDate: "",
    })
    const [requestPermissionValidation, setRequestPermissionValidation] = useState({
        patientID: "",
        permissionScope: "",
        dates: ""
    })
    function requestPermission() {
        const { patientID, startDate, endDate, permissionScope } = requestPermissionFormFields
        let patientIDValidationResult = requestPermissionPatientID({ patientID })
        let permissionScopeValidationResult = permissionScope({ permissionScope })
        let startAndEndDatesValidationResult = permissionStartAndEndDates({ startDate, endDate })

        if (!patientIDValidationResult.msg &&
            !permissionScopeValidationResult.msg &&
            !startAndEndDatesValidationResult.msg
        ) {
            console.log("PERMISSION REQUESTING VALIDATION IS SUCCESSFUL!")
            setRequestPermissionFormFields({
                doctorID: "",
                permissionScope: "",
                dates: ""
            })
            // API Endpoint
        } else {
            setRequestPermissionValidation({
                doctorID: patientIDValidationResult.msg,
                permissionScope: permissionScopeValidationResult.msg,
                dates: startAndEndDatesValidationResult.msg
            })
        }
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
                 {errToShow &&
                    (
                        <Alert severity="error" className="errPopup">
                            {errToShow}
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
                />
            </div>
            <button className="requestPermissionButton" onClick={requestPermission}>
                Grant Permission
            </button>
        </div>
    )
}