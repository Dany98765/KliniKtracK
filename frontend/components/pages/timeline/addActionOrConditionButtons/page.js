"use client"

import { useRouter } from "next/navigation"
import "./styles.css"
import { ROUTES } from "@/routes"

export default function AddActionOrConditionButtons() {
    const router = useRouter()
    return (
        <div className="addActionOrConditionButtonsContainer">
            <button className="addActionButton" onClick={() => router.push(ROUTES.ADD_ACTION)}>
                Add Action +
            </button>
            <button className="addConditionButton">
                Add Condition +
            </button>
        </div>
    )
}