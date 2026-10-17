"use client"

import PermissionTabs from "@/components/permissionTabs/page"
import "./styles.css"
import PermissionCard from "../permissionCard/page"

export default function AllPermissionsCard() {
    return (
        <div className="permissionCardsComponentContainer">
            <PermissionTabs
                filterLabels={['All Permissions', 'Pending Permissions', 'Granted Permissions', 'Aborted Permissions']}
            />
            <div className="allPermissionCardsContainer">
                <PermissionCard 
                    status="Granted"
                    userName="Mina Fayez"
                    startDate="2026-10-01"
                    endDate="2026-10-10"
                    scope="Read & Write"
                />
            </div>
        </div>
    )
}