"use client"

import Image from "next/image"
import "./styles.css"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/routes"

export default function Navbar() {
    const router = useRouter()
    return (
        <div className="navbarContainer">
            <div className="logoContainer" onClick={() => router.push(ROUTES.HOME)}>
                <Image
                    src="/KliniKtracK-logo.png"
                    width={2000}
                    height={2000}
                    alt="KliniKtracK Logo"
                    className="logoImg"
                    loading="eager"
                />
                <p className="logoNameTxt">
                    <span className="upperCaseK">K</span>
                    lini
                    <span className="upperCaseK">K</span>
                    trac
                    <span className="upperCaseK">K</span>
                </p>
            </div>
            <button className="getStartedButton">
                Get Started
            </button>
        </div>
    )
}