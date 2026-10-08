import "./styles.css"

export default function AuthUICard({ page }) {
    return (
        <div className="signupUICardContainer">
            <div className="signupTagContainer">
                <span className="signupUICircle" />
                <p className="tagDesc">{page == 'signup' ? "Signup Onboarding Page" : "Signin Onboarding Page"}</p>
            </div>
            <div className="titleAndFeatureCardsContainer">
                <div>
                    <h1 className="signupUICardTitle">{page == 'signup' ? "Create your profile in minutes." : "Login to your profile in seconds."}</h1>
                    <p className="signupCardUIDesc">{page == 'signup' ? "Register securely, complete your profile, and get started from one modern workspace." : "View all the latest read and/or write requests & add new data to your health status."}</p>
                </div>
                <div className="featureCardsContainer">
                    <div className="verificationCardContainer">
                        <p className="verificationCardTagName">Verification</p>
                        <h3 className="verificationCardTitle">Fast</h3>
                        <p className="verificationCardDesc">A quick guided auth flow</p>
                    </div>
                    <div className="privacyCardContainer">
                        <p className="privacyCardTagName">Privacy</p>
                        <h3 className="privacyCardTitle">Secure</h3>
                        <p className="privacyCardDesc">A secure account for your details</p>
                    </div>
                </div>
            </div>
            <div className="doctorImgContainer">
                <img 
                    src="/doctor.png"
                    className="doctor"
                />
            </div>
        </div>
    )
}