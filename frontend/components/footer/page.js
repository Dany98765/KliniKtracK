import Image from "next/image"
import "./styles.css"

export default function Footer() {
    return (
        <div className="footerContainer">
            <div className="KliniKtracKLogoOuterContainer">
                <div className="KliniKtracKLogoInnerContainer">
                    <Image
                        src="/KliniKtracK-logo.png"
                        width={40}
                        height={40}
                        alt="Logo"
                        className="Logo"
                    />
                </div>
                <p className="logoNameTxt">
                    <span className="upperCaseK">K</span>
                    lini
                    <span className="upperCaseK">K</span>
                    trac
                    <span className="upperCaseK">K</span>
                </p>
            </div>
            <div className="footerDescAndCopyrightContainer">
                <p className="footerDesc">Mission-based aiming to aid patients deliver precise information to doctors to save the lives of <span className="millionLivesTxt">1,000,000+</span></p>
                <p className="copyrightTxt">@copyright - 2026</p>
            </div>
        </div>
    )
}