import "./styles.css"

export default function AssocConditions() {
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
                    <li>Aesthemetic Necrosis</li>
                    <li>Aesthemetic Necrosis</li>
                    <li>Aesthemetic Necrosis</li>
                </ul>
                <ul className="solvedConditionsContainer">
                    <li>Aesthemetic Necrosis</li>
                    <li>Aesthemetic Necrosis</li>
                    <li>Aesthemetic Necrosis</li>
                </ul>
            </div>
        </div>
    )
}