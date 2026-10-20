import "./styles.css"
import ConditionAuxiliaryData from "./conditionAuxiliaryData/page";
import ConditionHeaderData from "./conditionHeaderData/page";
import AssocActions from "./assocActions/page";

export default function DetailedConditionCard({ userId, DBID, title, desc, subType, date, start, tags, duration, setShowCard, revealAssocTable }) {
    let startDateObj = new Date(start);
    startDateObj.setDate(startDateObj.getDate() + duration - 1);
    return (
        <div className="detailedConditionCardContainer">
            <ConditionHeaderData title={title} subType={subType} setShowCard={setShowCard} />
            {revealAssocTable == 'true' ? (
                <AssocActions userId={userId} DBID={DBID} />
            ) : (
                <div>
                    <p className="conditionDesc">{desc}</p>
                    <ConditionAuxiliaryData tags={tags} start={start} date={date} duration={duration} />
                </div >
            )
            }
        </div >
    )
}