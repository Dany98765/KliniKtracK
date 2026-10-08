import { auth } from "@/auth"
import SignupPage from "@/components/pages/signup/page"
import { ROUTES } from "@/routes"
import { redirect } from "next/navigation"

export default async function Signup() {
    const session = await auth()
    if (session?.user) {
        redirect(ROUTES.HOME)
    }
    return (
        <div>
            <SignupPage />
        </div>
    )
}