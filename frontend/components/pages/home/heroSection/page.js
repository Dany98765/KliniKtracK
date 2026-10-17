"use client"

import { useRouter } from "next/navigation"
import "./styles.css"
import Image from "next/image"
import { ROUTES } from "@/routes"
import { useSession } from "next-auth/react"

export default function HeroSection() {
    const router = useRouter()
    const { data: status } = useSession()
    return (
        <div className="heroSectionContainer">
            <div className="leftSectionContainer">
                <div className="circle"></div>
                {/* <div className="tagContainer">
                    <span className="heroSectionCircle" />
                    <p className="tagTitle">Full-Fledged Solution</p>
                </div> */}
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
                {status == 'unauthenticated' && (<div className="heroSectionButtons">
                    <button className="signupButton" onClick={() => router.push(ROUTES.SIGNUP)}>Signup     →</button>
                </div>)}
            </div>
            <div className="rightHeroSectionContainer">
                <Image
                    src="/doctor.png"
                    width={500}
                    height={500}
                    alt="Doctor"
                    loading="eager"
                    className="doctorImgHomePageHeroSection"
                />
            </div>
        </div>
    )
}
