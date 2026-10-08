import "./styles.css"
import AuthUICard from "@/components/authUICard/page"
import SignupForm from "@/components/forms/signup/page"

export default function SignupPage() {
    return (
        <div className="signupPageContainer">
            <AuthUICard page="signin" />
            <SignupForm />
        </div>
    )
}