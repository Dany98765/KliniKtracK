import "./styles.css"

export default function SignupUICard() {
    return (
        <div className="signupUICardContainer">
            <div className="signupTagContainer">
                <span className="circle" />
                <p className="tagDesc">Signup Onboarding Page</p>
            </div>
            <div className="titleAndFeatureCardsContainer">
                <div>
                    <h1 className="signupUICardTitle">Create your profile in minutes.</h1>
                    <p className="signupCardUIDesc">Register securely, complete your profile, and get started from one modern workspace.</p>
                </div>
                <div className="featureCardsContainer">
                    <div className="verificationCardContainer">
                        <p className="verificationCardTagName">Verification</p>
                        <h3 className="verificationCardTitle">Fast</h3>
                        <p className="verificationCardDesc">A quick guided signup flow</p>
                    </div>
                    <div className="privacyCardContainer">
                        <p className="privacyCardTagName">Privacy</p>
                        <h3 className="privacyCardTitle">Secure</h3>
                        <p className="privacyCardDesc">A secure account for your details</p>
                    </div>
                </div>
            </div>
        </div>
    )
}