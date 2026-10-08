import Image from "next/image"
import "./styles.css"
import { Pixelify_Sans } from 'next/font/google';

const pixelifySans = Pixelify_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pixelify', // Optional: CSS variable name
});

export default function DetailedActionCard() {
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
                    <h1 className="actionTitleTxt">Joint Replacement</h1>
                </div>
                <div className="actionTypeContainer">
                    <span className="actionTypeCircle" />
                    <p className="actionTypeTagDesc">Surgical Operation</p>
                </div>
            </div>
            <p className="actionDesc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus laoreet dui at vestibulum. Curabitur in nisi mattis, porttitor ante eget, luctus leo. Ut et libero commodo, pulvinar augue vitae, cursus eros. Fusce hendrerit condimentum mollis. Sed tempor velit at elit porttitor viverra. Donec cursus pretium quam, mollis consequat justo hendrerit id. </p>
            <div className="optionDoctorAndDateCardsContainer">
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
                        <p className="doctorNameTxt">Dr. Mina Fawzy</p>
                    </div>
                    <button className="viewDrProfileButton">
                        View Profile
                    </button>
                </div>
                <div className="actionDateContainer">
                    <Image 
                        src="/schedule.png"
                        alt="Schedule"
                        width={20}
                        height={20}
                        className="scheduleImg"
                    />
                    <p className={`${pixelifySans.className} actionDateTxt`}>10-07-2018 → 11-07-2018</p>
                </div>
            </div>
        </div>
    )
}