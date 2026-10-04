"use client"

import { useState } from "react"
import "./styles.css"
import NameField from "@/components/fields/nameField/page"
import EmailField from "@/components/fields/emailField/page"
import PasswordField from "@/components/fields/passwordField/page"
import { validateEmail, validateName, validatePassword, validatePasswordConfirmation } from "@/utils/validation/signup"
import { Alert } from "@mui/material"

export default function SignupForm() {
    const [role, setRole] = useState("")
    const [signupFormFields, setSignupFormFields] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [validationErr, setValidationErr] = useState({
        nameErr: "",
        emailErr: "",
        passwordErr: "",
        confirmPasswordErr: ""
    })

    function signupNow() {
        const { name, email, password, confirmPassword } = signupFormFields;
        let nameValidationResult = validateName({ name })
        let emailValidationResult = validateEmail({ email })
        let passwordValidationResult = validatePassword({ password })
        let confirmPasswordValidationResult = validatePasswordConfirmation({ password, confirmPassword })

        if (!nameValidationResult.msg && !emailValidationResult.msg && !passwordValidationResult.msg && !confirmPasswordValidationResult.msg) {
            setValidationErr((prev) => ({
                ...prev,
                nameErr: "",
                emailErr: "",
                passwordErr: "",
                confirmPasswordErr: ""
            }))
            // Fn for creating user -> backend

            
        } else {
            setValidationErr((prev) => ({
                ...prev,
                nameErr: nameValidationResult.msg,
                emailErr: emailValidationResult.msg,
                passwordErr: passwordValidationResult.msg,
                confirmPasswordErr: confirmPasswordValidationResult.msg
            }))
        }
    }
    let errorMsgToDisplay =
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
                <button className="patientButton" onClick={() => setRole("Patient")} style={{ backgroundColor: role == 'Patient' && "#23BAE7" }}>
                    Patient
                </button>
                <button className="doctorButton" onClick={() => setRole("Doctor")} style={{ backgroundColor: role == 'Doctor' && "#23BAE7" }}>
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
                    setSignupFormFields={setSignupFormFields}
                />
                <EmailField
                    emailField={signupFormFields.email}
                    setSignupFormFields={setSignupFormFields}
                />
                <PasswordField
                    passwordField={signupFormFields.password}
                    setSignupFormFields={setSignupFormFields}
                    isConfirmPasswordField={false}
                />
                <PasswordField
                    passwordField={signupFormFields.confirmPassword}
                    setSignupFormFields={setSignupFormFields}
                    isConfirmPasswordField={true}
                />
            </div>
            <button className="signupNowButton" onClick={signupNow}>
                Signup Now →
            </button>
            <p className="altToSignupTxt">Already have an account? <span className="signinNavigatorTxt">Signin</span></p>
        </div>
    )
}