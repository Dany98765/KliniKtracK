"use client"

import "./styles.css"

export default function NameField({ nameField, setSignupFormFields }) {
    return (
        <div className="nameFieldContainer">
            <p className="fullNameTxt">Full Name</p>
            <input 
                type="text"
                className="fullNameInputField"
                placeholder="Enter your full name..."
                value={nameField}
                onChange={(e) => {
                    setSignupFormFields((prev) => ({
                        ...prev,
                        name: e.target.value
                    }))
                }}
            />
        </div>
    )
}