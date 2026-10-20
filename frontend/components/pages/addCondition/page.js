import AddConditionForm from "@/components/forms/addConditionForm/page"
import "./styles.css"
import { redirect } from "next/navigation";
import { ROUTES } from "@/routes";
import { auth } from "@/auth";

export default async function AddConditionPage() {
    const session = await auth()
    if (!session?.user) {
        redirect(ROUTES.SIGNIN);
    }
    return (
        <div className="addConditionPageContainer">
            <div className="addConditionPageHeroSectionContainer">
                <div className="addConditionTagContainer">
                    <span className="addConditionUICircle" />
                    <p className="addConditionTagDesc">A brighter Start</p>
                </div>
                <h1 className="addConditionPageHeroSectionTitle"><span className="contributeTxt">Contribute</span> to your <span className="healthHistoryTxt">Health History</span></h1>
                <p className="addConditionPageHeroSectionDesc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus laoreet dui at vestibulum. Curabitur in nisi mattis, porttitor ante eget, luctus leo. Ut et libero commodo, pulvinar augue vitae, cursus eros. Fusce hendrerit condimentum mollis. Sed tempor velit at elit porttitor viverra. Donec cursus pretium quam, mollis consequat justo hendrerit id. </p>
                <AddConditionForm />
            </div>
        </div>
    )
}