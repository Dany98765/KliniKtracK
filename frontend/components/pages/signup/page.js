import SignupUICard from "@/components/signupUICard/page"
import "./styles.css"
import SignupForm from "@/components/forms/signup/page"

export default function SignupPage() {
    return (
        <div className="signupPageContainer">
            <SignupUICard />
            <SignupForm />
        </div>
    )
}