import "./styles.css"

import DropdownMenuDots from "@/components/dopDownMenuDots/page";

export default function ConditionHeaderData({ title, subType, setShowCard }) {
    return (
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
    )
}