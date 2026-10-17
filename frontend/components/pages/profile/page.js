import UserInfo from "@/components/userInfo/page"
import "./styles.css"
import AllPermissionsCard from "@/components/cards/allPermissionsCard/page"

export default function ProfilePage() {
    return (
        <div className="profilePageContainer">
            <UserInfo 
                role="Patient"
                name="John Doe"
                email="john.doe52@gmail.com"
            />
            <AllPermissionsCard />
        </div>  
    )
}