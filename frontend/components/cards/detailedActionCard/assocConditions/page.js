"use client"

import { useEffect, useState } from "react";
import "./styles.css"

export default function AssocConditions({ userId, DBID }) {
    const [solvedConditions, setSolvedConditions] = useState([])
    const [causedConditions, setCausedConditions] = useState([])
    useEffect(() => {
        async function fetchAssocConditions() {
            try {
                let response = await fetch(`http://localhost:5000/actions-to-conditions/${userId}/${DBID}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    next: {
                        revalidate: 30
                    }
                })
                if (response.status === 200) {
                    const allConditions = await response.json();
                    const solved = [];
                    const caused = [];
                    for (const condition of allConditions?.conditions ?? []) {
                        const item = {
                            id: condition.condition_id,
                            name: condition.name
                        };
                        if (condition.role_of_action === "Solved") {
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
    console.log(causedConditions, solvedConditions + "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    return (
        <div className="assocConditionsContainer">
            <div className="assocConditionsHeaderTitlesContainer">
                <p>Caused Condition(s)</p>
                <p>Solved Condition(s)</p>
            </div>
            <br />
            <hr />
            <div className="assocConditionsBodyContainer">
                <ul className="causedConditionsContainer">
                    {causedConditions.map(({ name, id }) => (
                        <li key={id}>{name}</li>
                    ))}
                </ul>
                <ul className="solvedConditionsContainer">
                    {solvedConditions.map(({ name, id }) => (
                        <li key={id}>{name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}