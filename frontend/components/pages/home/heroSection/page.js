import Tag from "@/components/tag/page"
import "./styles.css"

export default function HeroSection() {
    return (
        <div className="heroSectionContainer">
            <Tag title="Fully-Fledged Solution" />
            <h1 className="heroSectionTitle">
                The One Solution to <br />
                <span className="preciselyTxt">Precisely</span>
                Documented <br />
                <span className="medicalHistoryTxt">Medical History</span>
            </h1>
            <p className="heroSectionDesc">
                Confidently inform your doctor with your latest health status, surgical operations
                done, <br /> tablets taken with detailed concentration info all documented on behalf of your side or your doctor!
            </p>
            <div className="heroSectionButtons">
                <button className="signupButton">Signup     →</button>
                <button className="viewAllFeaturesButton">View All Features</button>
            </div>
        </div>
    )
}