import Image from "next/image"
import "./styles.css"
import { Pixelify_Sans } from 'next/font/google';
import DropdownMenuDots from "@/components/dopDownMenuDots/page";

const pixelifySans = Pixelify_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-pixelify', 
});

export default function DetailedActionCard({ title, desc, subType, date, doctor, duration, setShowCard }) {
    let startDateObj = new Date(date);
    startDateObj.setDate(startDateObj.getDate() + duration - 1);
    let endDate = startDateObj.toLocaleDateString()
    let headerImg = subType == 'Surgical Operation' ? 'surgical-operation' : (
        subType == 'Tablet' ? 'tablet-img' : 'dna'
    )
    return (
        <div className="detailedActionCardContainer">
            <div className="actionHeaderInfoContainer">
                <div className="actionImgAndTitleContainer">
                    <div className="surgicalOperationCardIndicatorContainer">
                        <Image
                            src={`/${headerImg}.png`}
                            width={45}
                            height={45}
                            alt="Surgical Operation"
                            className="surgicalOperationImg"
                        />
                    </div>
                    <div className="actionTitleAndTagContainer">
                        <h1 className="actionTitleTxt">{title}</h1>
                        <div className="actionTypeContainer">
                            <span className="actionTypeCircle" />
                            <p className="actionTypeTagDesc">{subType}</p>
                        </div>
                    </div>
                </div>
                <DropdownMenuDots type="Action" setShowCard={setShowCard} />
            </div>
            <p className="actionDesc">{desc}</p>
            <div className="actionOptionalDoctorAndDateCardsContainer">
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
                    <p className={`${pixelifySans.className} actionDateTxt`}>{duration > 1 ? `${date} → ${endDate}` : `${date}`}</p>
                </div>
            </div>
        </div>
    )
}