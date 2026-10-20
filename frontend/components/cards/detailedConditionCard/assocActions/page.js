"use client"

import "./styles.css"
import { useEffect, useState } from "react";

export default function AssocActions({ userId, DBID }) {
    const [solvedConditions, setSolvedConditions] = useState([])
    const [causedConditions, setCausedConditions] = useState([])
    useEffect(() => {
        async function fetchAssocConditions() {
            try {
                let response = await fetch(`http://localhost:5000/conditions-to-actions/${userId}/${DBID}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    next: {
                        revalidate: 30
                    }
                })
                if (response.status === 200) {
                    const allActions = await response.json();
                    const solved = [];
                    const caused = [];
                    for (const action of allActions?.actions ?? []) {
                        const item = {
                            id: action.action_id,
                            name: action.name
                        };
                        if (action.role_of_action === "Solved") {
                            solved.push(item);
                        } else {
                            caused.push(item);
                        }
                    }
                    setSolvedConditions(solved);
                    setCausedConditions(caused);
                } else {
                    let err = await response.text()
                    throw new Error(`Error occured while fetching associated conditions for action with ID: ${DBID}: ${err}`)
                }
            } catch (err) {
                throw new Error(`Error occured while fetching associated conditions for action with ID: ${DBID}: ${err}`)
            }
        }
        fetchAssocConditions()
    }, [userId, DBID])
    console.log(solvedConditions, causedConditions)
    return (
        <div className="assocActionsContainer">
            <div className="assocActionsHeaderTitlesContainer">
                <p>Caused Condition(s)</p>
                <p>Solved Condition(s)</p>
            </div>
            <br />
            <hr />
            <div className="assocActionsBodyContainer">
                <ul className="solvedActionsContainer">
                    {causedConditions.map(({ name, id }) => (
                        <li key={id}>{name}</li>
                    ))}
                </ul>
                <ul className="causedActionsContainer">
                    {solvedConditions.map(({ name, id }) => (
                        <li key={id}>{name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}