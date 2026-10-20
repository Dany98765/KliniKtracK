import { auth } from "@/auth";
import AddConditionPage from "@/components/pages/addCondition/page";
import { ROUTES } from "@/routes";
import { redirect } from "next/navigation";

export default async function AddCondition() {
    const session = await auth()
    if (!session?.user) {
        redirect(ROUTES.SIGNIN)
    }
    return (
        <div>
            <AddConditionPage />
        </div>
    )
}