import ProfileStatisticalCard from "../cards/profileStatisticalCard/page"
import "./styles.css"

export default function UserInfo({ role, name, email, insightsData }) {
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
                {/* <p className="userIDTxt">ID: {userId}</p> */}
            </div>
            {role == 'Patient' ? (
                <div className="profileStatisticalCardsContainer">
                    <ProfileStatisticalCard
                        title="Actions"
                        imgUrl="/action.png"
                        imgAltTxt="Action"
                        insightNum={insightsData.actionsCount}
                        filterTxt="Total Number"
                    />
                    <ProfileStatisticalCard
                        title="Conditions"
                        imgUrl="/condition.png"
                        imgAltTxt="Condition"
                        insightNum={insightsData.conditionsCount}
                        filterTxt="Total Number"
                    />
                    <ProfileStatisticalCard
                        title="Permissions"
                        imgUrl="/permission.png"
                        imgAltTxt="Permission"
                        insightNum={insightsData.permissionsCount}
                        filterTxt="Total Number"
                    />
                </div>
            ) : (
                <div className="profileStatisticalCardsContainer">
                    <ProfileStatisticalCard
                        title="Permissions"
                        imgUrl="/permission.png"
                        imgAltTxt="Permission"
                        insightNum={insightsData.totalPermissisons}
                        filterTxt="Total Number"
                    />
                    <ProfileStatisticalCard
                        title="Permissions"
                        imgUrl="/permission.png"
                        imgAltTxt="Permissions"
                        insightNum={insightsData.grantedPermissions}
                        filterTxt="Total Number"
                    />
                    <ProfileStatisticalCard
                        title="Permissions"
                        imgUrl="/permission.png"
                        imgAltTxt="Permission"
                        insightNum={insightsData.abortedPermissions}
                        filterTxt="Total Number"
                    />
                </div>
            )}
        </div>
    )
}