import { auth } from "@/auth";
import AddActionPage from "@/components/pages/addAction/page";
import { ROUTES } from "@/routes";
import { redirect } from "next/navigation";

export default async function AddAction() {
    const session = await auth()
    if (!session?.user) {
        redirect(ROUTES.SIGNIN)
    }
    return (
        <div>
            <AddActionPage />
        </div>
    )
}