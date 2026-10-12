import "./styles.css"

export default function AssocConditions({ caused, solved }) {
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
                    {caused.map((cause, i) => (
                        <li key={i}>{cause}</li>
                    ))}
                </ul>
                <ul className="solvedConditionsContainer">
                    {solved.map((solve, i) => (
                        <li key={i}>{solve}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}