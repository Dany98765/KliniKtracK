"use client"

import "./styles.css"

export default function EmailField({ emailField, setSignupFormFields }) {
    return (
        <div className="emailFieldContainer">
            <p className="emailTxt">Email</p>
            <input 
                type="email"
                className="emailInputField"
                placeholder="Enter your email address..."
                value={emailField}
                onChange={(e) => {
                    setSignupFormFields((prev) => ({
                        ...prev,
                        email: e.target.value
                    }))
                }}
            />
        </div>
    )
}