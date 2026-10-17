import ProfileStatisticalCard from "../cards/profileStatisticalCard/page"
import "./styles.css"

export default function UserInfo({ role, name, email }) {
    return (
        <div className="userInfoContainer">
            <div className="userInfoTxtContainer">
                <div className="profileTagContainer">
                    <span className="profileUICircle" />
                    <p className="tagDesc">Profile Page</p>
                </div>
                <p className="userRoleTxt">{role}</p>
                <p className="userNameTxt">{name}</p>
                <p className="userEmail">@/ {email}</p>
            </div>
            <div className="profileStatisticalCardsContainer">
                <ProfileStatisticalCard
                    title="Actions"
                    imgUrl="/action.png"
                    imgAltTxt="Action"
                    insightNum={23}
                    filterTxt="Total Number"
                />
                <ProfileStatisticalCard
                    title="Conditions"
                    imgUrl="/condition.png"
                    imgAltTxt="Condition"
                    insightNum={12}
                    filterTxt="Total Number"
                />
                <ProfileStatisticalCard
                    title="Permissions"
                    imgUrl="/permission.png"
                    imgAltTxt="Permission"
                    insightNum={4}
                    filterTxt="Total Number"
                />
            </div>
        </div>
    )
}