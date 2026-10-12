import "./styles.css"
import ActionAuxiliaryData from "./actionAuxiliaryData/page";
import ActionHeaderData from "./actionHeaderData/page";
import AssocConditions from "./assocConditions/page";

export default function DetailedActionCard({ title, desc, subType, date, doctor, duration, setShowCard, revealAssocTable, caused, solved }) {
    let startDateObj = new Date(date);
    startDateObj.setDate(startDateObj.getDate() + duration - 1);
    let endDate = startDateObj.toLocaleDateString()
    return (
        <div className="detailedActionCardContainer">
            <ActionHeaderData title={title} subType={subType} setShowCard={setShowCard} />
            {revealAssocTable == 'true' ? (
                <AssocConditions caused={caused} solved={solved} />
            ) : (
                <div>
                    <p className="actionDesc">{desc}</p>
                    <ActionAuxiliaryData doctor={doctor} date={date} endDate={endDate} duration={duration} />
                </div>
            )}
        </div>
    )
}