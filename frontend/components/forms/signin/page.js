"use client"

import { useState } from "react"
import "./styles.css"
import EmailField from "@/components/fields/auth/emailField/page"
import PasswordField from "@/components/fields/auth/passwordField/page"
import { Alert } from "@mui/material"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/routes"
import { validateEmail, validatePassword } from "@/utils/validation/auth"

export default function SigninForm() {
    // signin form fields state initiation 
    const [signinFormFields, setSigninFormFields] = useState({
        email: "",
        password: "",
    })
    // separate state initiation for checking if a successful signin existed
    const [isSuccessfulSignin, setIsSuccessfulSignin] = useState({
        isSuccessful: false,
        msg: ""
    })
    const router = useRouter()
    async function signinNow() {
        const { email, password } = signinFormFields;
        // validation functions called
        let emailValidationResult = validateEmail({ email })
        let passwordValidationResult = validatePassword({ password })
        // checking if user's input bypasses validation criteria
        if (!emailValidationResult.msg &&
            !passwordValidationResult.msg) {
            console.log("SUCCESS VALIDATION!")
            try {
                const response = await fetch("http://localhost:5000/login", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                })
                const data = await response.text()
                 if (!response.ok) {
                    throw new Error(`${data}`)
                }
                console.log('Success:', data);
                await signIn("credentials", {
                    ...signinFormFields,
                    redirect: false
                })
                console.log("SUCCESSFUL SIGNIN AUTH!")
                router.push(ROUTES.HOME)
                console.log("SUCCESSFUL REDIRECT!")
            } catch (err) {
                setIsSuccessfulSignin({
                    isSuccessful: false,
                    msg: err.message
                })
                throw new Error(`HTTP error! Status: ${err.message}`);
            }
        } else {
            // user's input does not satisfy validation criteria
            setIsSuccessfulSignin({
                isSuccessful: false,
                msg: "Invalid email or password"
            })
        }
    }
    // possible msg popups to display
    return (
        <div className="signinFormContainer">
            <h2>Signin your account.</h2>
            <p className="signinFormDesc">Welcome back to KliniKtracK!</p>
            <div className="signinFormFieldsContainer">
                {isSuccessfulSignin.msg &&
                    <Alert severity="error" className="errPopup">
                        {isSuccessfulSignin.msg}
                    </Alert>
                }
                <EmailField
                    emailField={signinFormFields.email}
                    setAuthFormFields={setSigninFormFields}
                />
                <PasswordField
                    passwordField={signinFormFields.password}
                    setAuthFormFields={setSigninFormFields}
                    isConfirmPasswordField={false}
                />
            </div>
            <button className="signinNowButton" onClick={signinNow}>
                Signin Now →
            </button>
            <p className="altToSigninTxt">Don't have an account? <span className="signupNavigatorTxt" onClick={() => router.push(ROUTES.SIGNUP)}>Signup</span></p>
        </div>
    )
}