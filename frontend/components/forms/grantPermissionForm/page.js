"use client"

import EventDoctorIDField from "@/components/fields/doctorID/page"
import "./styles.css"
import { useState } from "react"
import EventStartAndEndDatesFields from "@/components/fields/actionOrCondition/startAndEndDates/page"
import PermissionScopeField from "@/components/fields/permissionScope/page"
import { grantPermissionDoctorID, grantPermissionScope, grantPermissionStartAndEndDates } from "@/utils/validation/grantPermission"
import { Alert } from "@mui/material"

export default function GrantPermissionForm() {
    const [grantPermissionFormFields, setGrantPermissionFormFields] = useState({
        doctorID: "",
        permissionScope: "",
        startDate: "",
        endDate: "",
    })
    const [grantPermissionValidation, setGrantPermissionValidation] = useState({
        doctorID: "",
        permissionScope: "",
        dates: ""
    })
    function grantPermission() {
        const { doctorID, startDate, endDate, permissionScope } = grantPermissionFormFields
        let doctorIDValidationResult = grantPermissionDoctorID({ doctorID })
        let permissionScopeValidationResult = grantPermissionScope({ permissionScope })
        let startAndEndDatesValidationResult = grantPermissionStartAndEndDates({ startDate, endDate })

        if (!doctorIDValidationResult.msg &&
            !permissionScopeValidationResult.msg &&
            !startAndEndDatesValidationResult.msg
        ) {
            console.log("PERMISSION GRANTING VALIDATION IS SUCCESSFUL!")
            setGrantPermissionValidation({
                doctorID: "",
                permissionScope: "",
                dates: ""
            })
            // API Endpoint
        } else {
            setGrantPermissionValidation({
                doctorID: doctorIDValidationResult.msg,
                permissionScope: permissionScopeValidationResult.msg,
                dates: startAndEndDatesValidationResult.msg
            })
        }
    }
    let { doctorID, permissionScope, dates } = grantPermissionValidation
    let errToShow =
        doctorID ||
        permissionScope ||
        dates
    return (
        <div className="grantPermissionFormContainer">
            <div className="grantPermissionTagContainer">
                <span className="grantPermissionUICircle" />
                <p className="grantPermissionTagDesc">Doctors: Now Part of your Journey</p>
            </div>
            <p className="grantPermisisonFormTitle">Grant Permissions to your <br /> <span className="blueExpertTxt">Expert</span> Doctors</p>
            <p className="grantPermisisonFormDesc">Allow the doctors your are following with to view all your clinical history, edit it or even both</p>
            <div className="grantPermissionFormFieldsContainer">
                 {errToShow &&
                    (
                        <Alert severity="error" className="errPopup">
                            {errToShow}
                        </Alert>
                    )
                }
                <EventDoctorIDField
                    state={grantPermissionFormFields}
                    setState={setGrantPermissionFormFields}
                    form="grantPermission"
                    className="doctorIDFieldForGrantPermissionForm"
                />
                <PermissionScopeField
                    state={grantPermissionFormFields}
                    setState={setGrantPermissionFormFields}
                    className="permissionScopeField"
                />
                <EventStartAndEndDatesFields
                    state={grantPermissionFormFields}
                    setState={setGrantPermissionFormFields}
                    className="startAndEndDatesFieldsContainerForGrantPermissionForm"
                />
            </div>
            <button className="grantPermissionButton" onClick={grantPermission}>
                Grant Permission
            </button>
        </div>
    )
}