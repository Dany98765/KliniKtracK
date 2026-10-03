"use client"

import "./styles.css"

export default function SignupForm() {
    return (
        <div className="signupFormContainer">
            <h2>Create your account.</h2>
            <p className="signupFormDesc">Choose your role and fill in the details below to get started.</p>
            <div className="signupFormTagContainer">
                <span className="circle" />
                <p className="signupFormTagDesc">Choose Patient or Doctor to personalize your account.</p>
            </div>
        </div>
    )
}