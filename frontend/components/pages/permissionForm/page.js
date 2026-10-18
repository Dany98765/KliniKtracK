import GrantPermissionForm from "@/components/forms/grantPermissionForm/page"
import "./styles.css"
import Image from "next/image"
import PermissionFormFAQSection from "@/components/permissionFormFAQSection/page"
import { auth } from "@/auth"
import RequestPermissionForm from "@/components/forms/requestPermissionForm/page"

export default async function PermissionFormPage() {
    const session = await auth()
    console.log(JSON.stringify(session) + "SESSION!")
    return (
        <div className="permissionFormPage">
            {session?.user?.role == 'Patient' && <GrantPermissionForm />}
            {session?.user?.role == 'Doctor' && <RequestPermissionForm />}
            <div className="permissionFormPageImgAndFaqSectionContainer">
                <div className="docsImgContainer">
                    <Image
                        src="/docs.png"
                        alt="Docs"
                        width={700}
                        height={300}
                        className="docsImg"
                    />
                </div>
                <PermissionFormFAQSection
                    questionToAnswerArr={
                        [
                            {
                                question: "What does this form do?",
                                answer: "It is a form which enables your doctors to view and/or edit your profile to better enhance medical examination."
                            },
                            {
                                question: "What happens after filling out this form?",
                                answer: "Your doctor receives a permission granted for your KliniKtracK ID to view and/or edit according to permissions you have set."
                            }
                        ]
                    }
                />
            </div>
        </div>
    )
}