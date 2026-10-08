import { auth } from "@/auth";
import SigninPage from "@/components/pages/signin/page";
import { ROUTES } from "@/routes";
import { redirect } from "next/navigation";

export default async function Signin() {
    const session = await auth()
    if (session?.user) {
        redirect(ROUTES.HOME)
    }
    return (
        <div>
            <SigninPage />
        </div>
    )
}