"use client"

import EventDescriptionField from "@/components/fields/actionOrCondition/description/page"
import "./styles.css"
import EventNameField from "@/components/fields/actionOrCondition/name/page"
import EventStartAndEndDatesFields from "@/components/fields/actionOrCondition/startAndEndDates/page"

export default function AddActionForm() {
    return (
        <div className="addActionFormContainer">
            <div className="splittedFieldTypesContainer">
                <div className="addActionInputFieldsContainer">
                    <EventNameField />
                    <EventDescriptionField />
                    <EventStartAndEndDatesFields />
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}