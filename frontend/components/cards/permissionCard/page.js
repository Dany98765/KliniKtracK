import "./styles.css"
import Image from "next/image"
import { Pixelify_Sans } from "next/font/google";
import { Intel_One_Mono } from "next/font/google";

const intelOneMono = Intel_One_Mono({
    subsets: ["latin"],
    variable: "--font-intel-one-mono",
    weight: ["500"],
});

const pixelifySans = Pixelify_Sans({
    subsets: ["latin"],
    variable: "--font-pixelify-sans",
    weight: ["500", "600"],
});

export default function PermissionCard({ status, userName, startDate, endDate, scope }) {
    let scheduleColor;
    let cssAdjustedStatusTxt = status?.toLowerCase()
    console.log(status)
    switch (status) {
        case "Granted":
            scheduleColor = "blue"
            break;
        case "Aborted":
            scheduleColor = "purple"
            break;
        case "Pending":
            scheduleColor = "gray"
            break;
    }
    return (
        <div className="permissionCardContainer">
            <div className="permissionCardMainDataContainer">
                <p className="startingDateTxt">07</p>
                <div className="userNameAndDateRangeContainer">
                    <p className="permissionCardUserNameTxt">{userName}</p>
                    <div className="permissionCardDateContainer">
                        <Image
                            src={`/schedule-${scheduleColor}.png`}
                            alt="Schedule"
                            width={20}
                            height={20}
                        />
                        <p className={`${cssAdjustedStatusTxt}PermissionCardDateRangeTxt ${pixelifySans.className}`}>{startDate} → {endDate}</p>
                    </div>
                </div>
            </div>
            <div className="permissionCardScopeAndCurrentStatusContainer">
                <p className={`permissionCardScopeTxt ${intelOneMono.className}`}>{scope}</p>
                <div className={`${cssAdjustedStatusTxt}PermissionCardPermissionTypeTagContainer`}>
                    <p>{status} Permission</p>
                </div>
            </div>
        </div>
    )
}