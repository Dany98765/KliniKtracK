import "./styles.css"

import DropdownMenuDots from "@/components/dopDownMenuDots/page";
import Image from "next/image";

export default function ActionHeaderData({ title, subType, setShowCard }) {
    let headerImg = subType == 'Surgical Operation' ? 'surgical-operation' : (
        subType == 'Tablet' ? 'tablet-img' : 'dna'
    )
    return (
        <div className="actionHeaderInfoContainer">
            <div className="actionImgAndTitleContainer">
                <div className="surgicalOperationCardIndicatorContainer">
                    <Image
                        src={`/${headerImg}.png`}
                        width={45}
                        height={45}
                        alt="Surgical Operation"
                        className="surgicalOperationImg"
                    />
                </div>
                <div className="actionTitleAndTagContainer">
                    <h1 className="actionTitleTxt">{title}</h1>
                    <div className="actionTypeContainer">
                        <span className="actionTypeCircle" />
                        <p className="actionTypeTagDesc">{subType}</p>
                    </div>
                </div>
            </div>
            <DropdownMenuDots type="Action" setShowCard={setShowCard} />
        </div>
    )
}