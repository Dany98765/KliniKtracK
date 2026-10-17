"use client"

import EventDoctorIDField from "@/components/fields/doctorID/page"
import "./styles.css"
import { useState } from "react"
import EventStartAndEndDatesFields from "@/components/fields/actionOrCondition/startAndEndDates/page"
import PermissionScopeField from "@/components/fields/permissionScope/page"

export default function GrantPermissionForm() {
    const [grantPermissionFormFields, setGrantPermissionFormFields] = useState({
        doctorID: "",
        startDate: "",
        endDate: "",
        permissionScope: ""
    })
    return (
        <div className="grantPermissionFormContainer">
            <div className="grantPermissionTagContainer">
                <span className="grantPermissionUICircle" />
                <p className="grantPermissionTagDesc">Doctors: Now Part of your Journey</p>
            </div>
            <p className="grantPermisisonFormTitle">Grant Permissions to your <br /> <span className="blueExpertTxt">Expert</span> Doctors</p>
            <p className="grantPermisisonFormDesc">Allow the doctors your are following with to view all your clinical history, edit it or even both</p>
            <div className="grantPermissionFormFieldsContainer">
                <EventDoctorIDField
                    state={grantPermissionFormFields}
                    setState={setGrantPermissionFormFields}
                    form="grantPermission"
                />
                <PermissionScopeField
                    state={grantPermissionFormFields}
                    setState={setGrantPermissionFormFields}
                />
                <EventStartAndEndDatesFields
                    state={grantPermissionFormFields}
                    setState={setGrantPermissionFormFields}
                />
            </div>
            <button className="grantPermissionButton">
                Grant Permission
            </button>
        </div>
    )
}