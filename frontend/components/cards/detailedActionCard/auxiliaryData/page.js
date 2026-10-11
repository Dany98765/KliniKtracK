import "./styles.css"

import { Pixelify_Sans } from 'next/font/google';
import Image from 'next/image';

const pixelifySans = Pixelify_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-pixelify', 
});

export default function AuxiliaryData({ doctor, date, endDate, duration }) {
    return (
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
    )
}