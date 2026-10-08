"use client"

import { useState } from "react"
import "./styles.css"
import NameField from "@/components/fields/nameField/page"
import EmailField from "@/components/fields/emailField/page"
import PasswordField from "@/components/fields/passwordField/page"
import { validateEmail, validateName, validatePassword, validatePasswordConfirmation, validateRole } from "@/utils/validation/signup"
import { Alert } from "@mui/material"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/routes"

export default function SignupForm() {
    // signup form fields state initiation 
    const [signupFormFields, setSignupFormFields] = useState({
        role: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    // separate state initiation to store msg result form validation functions
    const [validationErr, setValidationErr] = useState({
        roleErr: "",
        nameErr: "",
        emailErr: "",
        passwordErr: "",
        confirmPasswordErr: ""
    })
    const router = useRouter()
    async function signupNow() {
        const { role, name, email, password, confirmPassword } = signupFormFields;
        // validation functions called
        let roleValidationResult = validateRole({ role })
        let nameValidationResult = validateName({ name })
        let emailValidationResult = validateEmail({ email })
        let passwordValidationResult = validatePassword({ password })
        let confirmPasswordValidationResult = validatePasswordConfirmation({ password, confirmPassword })
        console.log(roleValidationResult, nameValidationResult, emailValidationResult, passwordValidationResult, confirmPasswordValidationResult)
        // checking if user's input bypasses validation criteria
        if (!roleValidationResult.msg && !nameValidationResult.msg && !emailValidationResult.msg && !passwordValidationResult.msg && !confirmPasswordValidationResult.msg) {
            console.log("SUCCESS VALIDATION!")
            setValidationErr((prev) => ({
                ...prev,
                nameErr: "",
                emailErr: "",
                passwordErr: "",
                confirmPasswordErr: ""
            }))
            // Fn for creating user -> backend
            console.log("SUCCESSFUL STATE BATCHING!")
            await signIn("credentials", {
                ...signupFormFields,
                redirect: false
            })
            console.log("SUCCESSFUL SIGNIN AUTH!")
            router.push(ROUTES.HOME)
            console.log("SUCCESSFUL REDIRECT!")
        } else {
            // user's input does not satisfy validation criteria
            setValidationErr((prev) => ({
                ...prev,
                roleErr: roleValidationResult.msg,
                nameErr: nameValidationResult.msg,
                emailErr: emailValidationResult.msg,
                passwordErr: passwordValidationResult.msg,
                confirmPasswordErr: confirmPasswordValidationResult.msg
            }))
        }
    }
    // possible msg popups to display
    let errorMsgToDisplay =
        validationErr.roleErr ||
        validationErr.nameErr ||
        validationErr.emailErr ||
        validationErr.passwordErr ||
        validationErr.confirmPasswordErr;
    return (
        <div className="signupFormContainer">
            <h2>Create your account.</h2>
            <p className="signupFormDesc">Choose your role and fill in the details below to get started.</p>
            <div className="signupFormTagContainer">
                <span className="signupFormCircle" />
                <p className="signupFormTagDesc">Choose Patient or Doctor to personalize your account.</p>
            </div>
            <div className="roleToChooseContainer">
                <button className="patientButton" onClick={() => setSignupFormFields((prev) => ({
                    ...prev,
                    role: "Patient"
                }))} style={{ backgroundColor: signupFormFields.role == 'Patient' && "#23BAE7" }}>
                    Patient
                </button>
                <button className="doctorButton" onClick={() => setSignupFormFields((prev) => ({
                    ...prev,
                    role: "Doctor"
                }))} style={{ backgroundColor: signupFormFields.role == 'Doctor' && "#23BAE7" }}>
                    Doctor
                </button>
            </div>
            <div className="signupFormFieldsContainer">
                {errorMsgToDisplay &&
                    <Alert severity="error" className="errPopup">
                        {errorMsgToDisplay}
                    </Alert>
                }
                <NameField
                    nameField={signupFormFields.name}
                    setAuthFormFields={setSignupFormFields}
                />
                <EmailField
                    emailField={signupFormFields.email}
                    setAuthFormFields={setSignupFormFields}
                />
                <PasswordField
                    passwordField={signupFormFields.password}
                    setAuthFormFields={setSignupFormFields}
                    isConfirmPasswordField={false}
                />
                <PasswordField
                    passwordField={signupFormFields.confirmPassword}
                    setAuthFormFields={setSignupFormFields}
                    isConfirmPasswordField={true}
                />
            </div>
            <button className="signupNowButton" onClick={signupNow}>
                Signup Now →
            </button>
            <p className="altToSignupTxt">Already have an account? <span className="signinNavigatorTxt" onClick={() => router.push(ROUTES.SIGNIN)}>Signin</span></p>
        </div>
    )
}