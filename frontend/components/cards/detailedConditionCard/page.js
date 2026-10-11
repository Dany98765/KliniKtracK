import Image from "next/image"
import "./styles.css"
import { Pixelify_Sans } from 'next/font/google';
import DropdownMenuDots from "@/components/dopDownMenuDots/page";

const pixelifySans = Pixelify_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-pixelify', 
});

export default function DetailedConditionCard({ title, desc, subType, date, tags, duration, setShowCard }) {
    let startDateObj = new Date(date);
    startDateObj.setDate(startDateObj.getDate() + duration - 1);
    let endDate = startDateObj.toLocaleDateString()
    return (
        <div className="detailedConditionCardContainer">
            <div className="conditionHeaderInfoContainer">
                <div className="conditionTitleContainer">
                    <div className="conditionTitleAndTagContainer">
                        <h1 className="conditionTitleTxt">{title}</h1>
                        <div className="conditionTypeContainer">
                            <span className="conditionTypeCircle" />
                            <p className="conditionTypeTagDesc">{subType}</p>
                        </div>
                    </div>
                </div>
                <DropdownMenuDots type="Condition" setShowCard={setShowCard} />
            </div>
            <p className="conditionDesc">{desc}</p>
            <div className="conditionTagsAndDateCardsContainer">
                <div className="conditionTagsContainer">
                    {tags.map((tag, i) => (
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
                    <p className={`${pixelifySans.className} conditionDateTxt`}>{duration > 1 ? `${date} → ${endDate}` : `${date}`}</p>
                </div>
            </div>
        </div>
    )
}