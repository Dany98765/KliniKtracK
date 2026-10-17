import GrantPermissionForm from "@/components/forms/grantPermissionForm/page"
import "./styles.css"
import Image from "next/image"
import PermissionFormFAQSection from "@/components/permissionFormFAQSection/page"

export default function PermissionFormPage() {
    return (
        <div className="permissionFormPage">
            <GrantPermissionForm />
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