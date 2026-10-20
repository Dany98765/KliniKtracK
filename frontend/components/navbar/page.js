"use client"

import Image from "next/image"
import "./styles.css"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/routes"
import { useSession } from "next-auth/react"
import Loader from "../loader/page"
import ProfileDropdown from "../profileDropdown/page"

export default function Navbar() {
    const router = useRouter()
    const { data } = useSession()
    let userRole = data?.user?.role
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
                <p className="logoName">
                    <span className="upperCaseK">K</span>
                    lini
                    <span className="upperCaseK">K</span>
                    trac
                    <span className="upperCaseK">K</span>
                </p>
            </div>
            {!data?.user ?
                (
                    <button className="getStartedButton" onClick={() => router.push(ROUTES.SIGNUP)}>
                        Get Started
                    </button>
                ) : data?.user ? (
                    <ProfileDropdown userRole={userRole} />
                ) : (
                    <Loader />
                )
            }
        </div>
    )
}