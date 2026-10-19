import "./styles.css"
import ActionAuxiliaryData from "./actionAuxiliaryData/page";
import ActionHeaderData from "./actionHeaderData/page";
import AssocConditions from "./assocConditions/page";

export default function DetailedActionCard({ userId, DBID, title, desc, subType, date, start, doctor, duration, setShowCard, revealAssocTable, caused, solved }) {
    return (
        <div className="detailedActionCardContainer">
            <ActionHeaderData title={title} subType={subType} setShowCard={setShowCard} />
            {revealAssocTable == 'true' ? (
                <AssocConditions userId={userId} DBID={DBID} caused={caused} solved={solved} />
            ) : (
                <div>
                    <p className="actionDesc">{desc}</p>
                    <ActionAuxiliaryData doctor={doctor} start={start} date={date} duration={duration} />
                </div>
            )}
        </div>
    )
}