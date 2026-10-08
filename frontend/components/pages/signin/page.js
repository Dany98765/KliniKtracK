import "./styles.css"
import AuthUICard from "@/components/authUICard/page"
import SigninForm from "@/components/forms/signin/page"

export default function SigninPage() {
    return (
        <div className="signinPageContainer">
            <AuthUICard page="signin" />
            <SigninForm />
        </div>
    )
}