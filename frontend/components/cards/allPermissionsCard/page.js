"use client"

import "./styles.css"
import PermissionCard from "../permissionCard/page"

export default function AllPermissionsCard({ userRole, allPermissionsData }) {
    return (
        <div className="permissionCardsComponentContainer">
            <div className="allPermissionCardsContainer">
                {allPermissionsData?.map(({ id, patient_name, doctor_name, patient_id, doctor_id, scope, current_status, start_date, end_date }, outerId) => (
                    <PermissionCard
                        key={id}
                        permissionId={id}
                        status={current_status}
                        userName={userRole == 'Patient' ? doctor_name : patient_name}
                        startDate={start_date}
                        endDate={end_date}
                        scope={scope}
                        userRole={userRole}
                        userId={userRole == 'Patient' ? patient_id : doctor_id}
                    />
                ))}
            </div>
        </div>
    )
}