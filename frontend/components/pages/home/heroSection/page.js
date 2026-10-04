import Tag from "@/components/tag/page"
import "./styles.css"
import Image from "next/image"

export default function HeroSection() {
    return (
        <div className="heroSectionContainer">
            <div className="leftSectionContainer">
                <div className="circle"></div>
                <div className="tagContainer">
                    <span className="heroSectionCircle" />
                    <p className="tagTitle">Full-Fledged Solution</p>
                </div>
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
            <div className="rightHeroSectionContainer">
                <Image
                    src="/doctor.png"
                    width={500}
                    height={500}
                    alt="Doctor"
                    loading="eager"
                    className="doctorImg"
                />
            </div>
        </div>
    )
}
