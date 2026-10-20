import { auth } from "@/auth";
import ProfilePage from "@/components/pages/profile/page";
import { ROUTES } from "@/routes";
import { redirect } from "next/navigation";

export default async function Profile() {
    const session = await auth()
    if (!session?.user) {
        redirect(ROUTES.SIGNIN)
    }
    return (
        <div>
            <ProfilePage />
        </div>
    )
}