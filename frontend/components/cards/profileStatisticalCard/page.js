import Image from "next/image"
import "./styles.css"

export default function ProfileStatisticalCard({ title, imgUrl, imgAltTxt, insightNum, filterTxt }) {
    return (
        <div className="profileStatisticalCardContainer">
            <div className="headerDataContainer">
                <p className="statisticalCardTitleTxt">{title}</p>
                <div className="statisticalCardImgContainer">
                    <Image 
                        src={imgUrl}
                        width={20}
                        height={20}
                        className="statisticalCardImg"
                        alt={imgAltTxt}
                    />
                </div>
            </div>
            <p className="insightNum">{insightNum}</p>
            <p className="filterTxt">{filterTxt}</p>
        </div>
    )
}