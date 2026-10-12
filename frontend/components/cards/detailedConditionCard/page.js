import "./styles.css"
import ConditionAuxiliaryData from "./conditionAuxiliaryData/page";
import ConditionHeaderData from "./conditionHeaderData/page";
import AssocActions from "./assocActions/page";

export default function DetailedConditionCard({ title, desc, subType, date, tags, duration, setShowCard, revealAssocTable, caused, wasSolved }) {
    let startDateObj = new Date(date);
    startDateObj.setDate(startDateObj.getDate() + duration - 1);
    let endDate = startDateObj.toLocaleDateString()
    return (
        <div className="detailedConditionCardContainer">
            <ConditionHeaderData title={title} subType={subType} setShowCard={setShowCard} />
            {revealAssocTable == 'true' ? (
                <AssocActions caused={caused} wasSolved={wasSolved} />
            ) : (
                <div>
                    <p className="conditionDesc">{desc}</p>
                    <ConditionAuxiliaryData tags={tags} duration={duration} date={date} endDate={endDate} />
                </div >
            )
            }
        </div >
    )
}