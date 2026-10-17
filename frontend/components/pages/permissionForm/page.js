import GrantPermissionForm from "@/components/forms/grantPermissionForm/page"
import "./styles.css"
import Image from "next/image"

export default function PermissionFormPage() {
    return (
        <div className="permissionFormPage">
            <GrantPermissionForm />
            <div className="permissionFormPageImgAndFaqSectionContainer">
                <Image 
                    src="/docs.png"
                    alt="Docs"
                    width={780}
                    height={400}
                    className="docsImg"
                />
                <span />
            </div>
        </div>  
    )
}