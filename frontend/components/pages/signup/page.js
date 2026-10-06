import "./styles.css"
import SignupUICard from "@/components/signupUICard/page"
import SignupForm from "@/components/forms/signup/page"

export default function SignupPage() {
    return (
        <div className="signupPageContainer">
            <SignupUICard />
            <SignupForm />
        </div>
    )
}