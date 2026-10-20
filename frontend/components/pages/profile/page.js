import "./styles.css"
import UserInfo from "@/components/userInfo/page"
import AllPermissionsCard from "@/components/cards/allPermissionsCard/page"
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/routes";

export default async function ProfilePage() {
    const session = await auth()
    if (!session?.user) {
        redirect(ROUTES.SIGNIN);
    }
    async function fetchProfileStats() {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/profile-stats/${session?.user?.id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                next: {
                    revalidate: 60
                }
            })

            if (response.status == 200) {
                let profileStatsData = await response.json()
                return { profileStatsData }
            } else {
                let err = await response.text()
                throw new Error(err)
            }
        } catch (err) {
            return { err }
        }
    }

    let { profileStatsData, err } = await fetchProfileStats()
    async function fetchAllPermissions() {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/permissions/${session?.user?.id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                next: {
                    revalidate: 60
                }
            })

            if (response.status == 200) {
                let allPermissionsData = await response.json()
                return { allPermissionsData: allPermissionsData.permissions }
            } else {
                let err = await response.text()
                throw new Error(err)
            }
        } catch (err) {
            return { err }
        }
    }
    let { allPermissionsData } = await fetchAllPermissions()
    return (
        <div className="profilePageContainer">
            {profileStatsData.role == 'Doctor' ? (
                <UserInfo
                    role={profileStatsData.role}
                    name={profileStatsData.name}
                    email={profileStatsData.email}
                    insightsData={{
                        totalPermissisons: profileStatsData.total_permissions,
                        grantedPermissions: profileStatsData.granted_permissions,
                        abortedPermissions: profileStatsData.aborted_permissions
                    }}
                />
            ) : (
            <UserInfo
                role={profileStatsData.role}
                name={profileStatsData.name}
                email={profileStatsData.email}
                insightsData={{
                    actionsCount: profileStatsData.actions_count,
                    conditionsCount: profileStatsData.conditions_count,
                    permissionsCount: profileStatsData.permissions_count
                }}
            />
            )}
            <AllPermissionsCard userRole={profileStatsData.role} allPermissionsData={allPermissionsData} />
        </div>
    )
}