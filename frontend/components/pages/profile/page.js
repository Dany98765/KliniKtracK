import UserInfo from "@/components/userInfo/page"
import "./styles.css"
import AllPermissionsCard from "@/components/cards/allPermissionsCard/page"
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/routes";

export default async function ProfilePage() {
    const session = await auth()
    if (!session?.user) {
        redirect(ROUTES.SIGNIN);
    }
    return (
        <div className="profilePageContainer">
            <UserInfo
                role="Patient"
                name="John Doe"
                email="john.doe52@gmail.com"
            />
            <AllPermissionsCard />
        </div>
    )
}