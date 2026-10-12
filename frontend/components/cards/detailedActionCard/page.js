import "./styles.css"
import AuxiliaryData from "./auxiliaryData/page";
import HeaderData from "./headerData/page";
import AssocConditions from "./assocConditions/page";

export default function DetailedActionCard({ title, desc, subType, date, doctor, duration, setShowCard }) {
    let startDateObj = new Date(date);
    startDateObj.setDate(startDateObj.getDate() + duration - 1);
    let endDate = startDateObj.toLocaleDateString()
    return (
        <div className="detailedActionCardContainer">
            <HeaderData title={title} subType={subType} setShowCard={setShowCard} />
            <AssocConditions />
            {/* <p className="actionDesc">{desc}</p>
            <AuxiliaryData doctor={doctor} date={date} endDate={endDate} duration={duration} /> */}
        </div>
    )
}