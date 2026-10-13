import AddActionForm from "@/components/forms/addActionForm/page"
import "./styles.css"

export default function AddActionPage() {
    return (
        <div className="addActionPageContainer">
            <div className="addActionPageHeroSectionContainer">
                <div className="addActionTagContainer">
                    <span className="addActionUICircle" />
                    <p className="addActionTagDesc">A brighter Start</p>
                </div>
                <h1 className="addActionPageHeroSectionTitle"><span className="contributeTxt">Contribute</span> to your <span className="healthHistoryTxt">Health History</span></h1>
                <p className="addActionPageHeroSectionDesc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus laoreet dui at vestibulum. Curabitur in nisi mattis, porttitor ante eget, luctus leo. Ut et libero commodo, pulvinar augue vitae, cursus eros. Fusce hendrerit condimentum mollis. Sed tempor velit at elit porttitor viverra. Donec cursus pretium quam, mollis consequat justo hendrerit id. </p>
                <AddActionForm />
            </div>
        </div>
    )
}