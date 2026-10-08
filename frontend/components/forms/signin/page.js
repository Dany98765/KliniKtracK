"use client"

import { useState } from "react"
import "./styles.css"
import EmailField from "@/components/fields/emailField/page"
import PasswordField from "@/components/fields/passwordField/page"
import { Alert } from "@mui/material"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/routes"

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
        const { email, password } = signinFormFields; // <- will be used for signin backend fn
        // backend fn for checking if credentials are correct
        // if so, ->
        await signIn("credentials", {
            ...signinFormFields,
            redirect: false
        })
        router.push(ROUTES.HOME)
        // else ->
        // setIsSuccessfulSignin((prev) => ({
        //     ...prev,
        //     isSuccessful: false,
        //     msg: "Invalid email or password"
        // }))
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