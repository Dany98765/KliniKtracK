"use client"

import "./styles.css"

export default function NameField({ nameField, setAuthFormFields }) {
    return (
        <div className="nameFieldContainer">
            <p className="fullNameTxt">Full Name</p>
            <input 
                type="text"
                className="fullNameInputField"
                placeholder="Enter your full name..."
                value={nameField}
                onChange={(e) => {
                    setAuthFormFields((prev) => ({
                        ...prev,
                        name: e.target.value
                    }))
                }}
            />
        </div>
    )
}