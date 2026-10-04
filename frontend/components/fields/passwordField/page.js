"use client"

import "./styles.css"

export default function PasswordField({ passwordField, setSignupFormFields, isConfirmPasswordField }) {
    let fieldToTriggerChange = isConfirmPasswordField ? "confirmPassword" : "password"
    return (
        <div className="passwordFieldContainer">
            <p className="passwordTxt">{isConfirmPasswordField ? "Confirm Password" : "Password"}</p>
            <input 
                type="password"
                className="passwordInputField"
                placeholder={isConfirmPasswordField ? "Confirm your password..." : "Enter a strong password..."}
                value={passwordField}
                onChange={(e) => {
                    setSignupFormFields((prev) => ({
                        ...prev,
                        [fieldToTriggerChange]: e.target.value
                    }))
                }}
            />
        </div>
    )
}