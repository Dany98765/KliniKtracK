"use client"

import PermissionTabs from "@/components/permissionTabs/page"
import "./styles.css"

export default function AllPermissionsCard() {
    return (
        <div className="permissionCardsComponentContainer">
            <PermissionTabs
                filterLabels={['All Permissions', 'Pending Permissions', 'Granted Permissions', 'Aborted Permissions']}
            />
            <div className="allPermissionCardsContainer">
                
            </div>
        </div>
    )
}