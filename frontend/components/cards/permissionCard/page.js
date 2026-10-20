import "./styles.css"
import Image from "next/image"
import { Pixelify_Sans } from "next/font/google";
import { Intel_One_Mono } from "next/font/google";
import { Alert } from "@mui/material";

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

export default function PermissionCard({ permissionId, status, userName, startDate, endDate, scope, userRole, userId }) {
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
    async function decidePermissionStatus(decision) {
        const response = await fetch(`http://localhost:5000/decide-permission/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ permissionId, decision })
        })
        let data = await response.text()
        return { decisionStatus: response.status, data }
    }
    let { decisionStatus, data } = decidePermissionStatus()
    console.log(decisionStatus + "QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ")
    return (
        <div className="permissionCardContainer">
            {decisionStatus && (<Alert severity={decisionStatus == 200 ? "success" : "error"}>
                {decisionStatus == 200 ? "Decision made successfully!" : data}
            </Alert>)}
            <div className="permissionCardMainDataContainer">
                <p className="startingDateTxt">07</p>
                <div className="userNameAndDateRangeContainer">
                    <div>
                        <p className="permissionCardUserNameTxt">{userName}</p>
                        {status == 'Pending' && userRole == 'Patient' && (
                            <div className="decisionButtonsContainer">
                                <button className="abortButton" onClick={() => decidePermissionStatus("Aborted")}>Abort</button>
                                <button className="acceptButton" onClick={() => decidePermissionStatus("Granted")}>Accept</button>
                            </div>
                        )}
                    </div>
                    <div className="permissionCardDateContainer">
                        <Image
                            src={`/schedule-${scheduleColor}.png`}
                            alt="Schedule"
                            width={20}
                            height={20}
                        />
                        <p className={`${cssAdjustedStatusTxt}PermissionCardDateRangeTxt ${pixelifySans.className}`}>{new Date(startDate).toLocaleDateString()} → {new Date(endDate).toLocaleDateString()}</p>
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