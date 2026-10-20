import { auth } from "@/auth";
import PermissionFormPage from "@/components/pages/permissionForm/page";
import { ROUTES } from "@/routes";
import { redirect } from "next/navigation";

export default async function PermissionForm() {
    const session = await auth()
    if (!session?.user) {
        redirect(ROUTES.SIGNIN)
    }
    return (
        <div>
            <PermissionFormPage />
        </div>
    )
}