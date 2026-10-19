import "./styles.css"

import Image from "next/image"
import { Pixelify_Sans } from 'next/font/google';

const pixelifySans = Pixelify_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-pixelify', 
});

export default function ConditionAuxiliaryData({ tags, star, date, duration }) {
    return (
        <div className="conditionTagsAndDateCardsContainer">
            <div className="conditionTagsContainer">
                {(tags ?? []).map((tag, i) => (
                    <span key={i} className="singleTag">{tag}</span>
                ))}
            </div>
            <div className="conditionDateContainer">
                <Image
                    src="/schedule-blue.png"
                    alt="Schedule"
                    width={20}
                    height={20}
                    className="scheduleImg"
                />
                <p className={`${pixelifySans.className} conditionDateTxt`}>{duration > 1 ? `${date}` : `${start}`}</p>
            </div>
        </div>
    )
}