import Image from "next/image"
import "./styles.css"
import { Pixelify_Sans } from 'next/font/google';
import DropdownMenuDots from "@/components/dopDownMenuDots/page";

const pixelifySans = Pixelify_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-pixelify', // Optional: CSS variable name
});

export default function DetailedActionCard({ title, desc, subType, date, doctor }) {
    return (
        <div className="detailedActionCardContainer">
            <div className="headerInfoContainer">
                <div className="imgAndTitleContainer">
                    <div className="surgicalOperationCardIndicatorContainer">
                        <Image
                            src="/surgical-operation.png"
                            width={45}
                            height={45}
                            alt="Surgical Operation"
                            className="surgicalOperationImg"
                        />
                    </div>
                    <div className="titleAndTagContainer">
                        <h1 className="actionTitleTxt">{title}</h1>
                        <div className="actionTypeContainer">
                            <span className="actionTypeCircle" />
                            <p className="actionTypeTagDesc">{subType}</p>
                        </div>
                    </div>
                </div>
                <DropdownMenuDots />
            </div>
            <p className="actionDesc">{desc}</p>
            <div className="optionDoctorAndDateCardsContainer">
                {doctor && (
                    <div className="doctorAssocWithActionCardContainer">
                        <div className="doctorImgAndNameContainer">
                            <div className="doctorImgContainer">
                                <Image
                                    src="/doctor-icon.png"
                                    width={30}
                                    height={30}
                                    className="doctorImg"
                                    alt="Doctor"
                                />
                            </div>
                            <p className="doctorNameTxt">{doctor}</p>
                        </div>
                        <button className="viewDrProfileButton">
                            View Profile
                        </button>
                    </div>
                )
                }
                <div className="actionDateContainer">
                    <Image
                        src="/schedule.png"
                        alt="Schedule"
                        width={20}
                        height={20}
                        className="scheduleImg"
                    />
                    <p className={`${pixelifySans.className} actionDateTxt`}>{date}</p>
                </div>
            </div>
        </div>
    )
}