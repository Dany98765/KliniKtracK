"use client"

import EventDoctorIDField from "@/components/fields/doctorID/page"
import "./styles.css"
import { useState, useTransition } from "react"
import EventStartAndEndDatesFields from "@/components/fields/actionOrCondition/startAndEndDates/page"
import PermissionScopeField from "@/components/fields/permissionScope/page"
import { grantPermissionDoctorID, permissionScopeValidation, permissionStartAndEndDates } from "@/utils/validation/permission"
import { Alert } from "@mui/material"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/routes"

export default function GrantPermissionForm() {
    let { data } = useSession()
    let userId = data?.user?.id
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
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
        startTransition(async () => {
            const { doctorID, startDate, endDate, permissionScope } = grantPermissionFormFields
            let doctorIDValidationResult = grantPermissionDoctorID({ doctorID })
            let permissionScopeValidationResult = permissionScopeValidation({ permissionScope })
            let startAndEndDatesValidationResult = permissionStartAndEndDates({ startDate, endDate })
            console.log("MMMMMMMMMMIEIHUUUUU" + doctorID)
            if (!doctorIDValidationResult.msg &&
                !permissionScopeValidationResult.msg &&
                !startAndEndDatesValidationResult.msg
            ) {
                try {
                    console.log("!!!!!!!!!!" + doctorID)
                    setGrantPermissionValidation({
                        doctorID: "",
                        permissionScope: "",
                        dates: ""
                    })
                    const response = await fetch(`http://localhost:5000/grant-permission/${userId}`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ doctorId: doctorID, scope: permissionScope, startDate, endDate })
                    })
                    console.log("STARTED2!")
                    let data = await response.text()
                    console.log(data, response.status + "KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
                    if (response.status == 201) {
                        setGrantPermissionFormFields((prev) => ({
                            ...prev,
                            general: "Success!"
                        }))
                        router.push(ROUTES.PROFILE)
                    } else {
                        setGrantPermissionFormFields((prev) => ({
                            ...prev,
                            general: response.status + data
                        }))
                    }
                } catch (err) {
                    throw new Error(err)
                }
                // API Endpoint
            } else {
                setGrantPermissionValidation({
                    doctorID: doctorIDValidationResult.msg,
                    permissionScope: permissionScopeValidationResult.msg,
                    dates: startAndEndDatesValidationResult.msg
                })
            }
        })
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
            <p className="grantPermissisonFormTitle">Grant Permissions to your <br /> <span className="blueExpertTxt">Expert</span> Doctors</p>
            <p className="grantPermissisonFormDesc">Allow the doctors your are following with to view all your clinical history, edit it or even both</p>
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
                {isPending ? 'Granting Permission...' : 'Grant Permission'}
            </button>
        </div>
    )
}