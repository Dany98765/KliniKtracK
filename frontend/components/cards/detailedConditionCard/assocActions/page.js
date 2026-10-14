import "./styles.css"

export default function AssocActions({ caused, wasSolved }) {
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
                    {caused.map((singleCause, i) => (
                        <li key={i}>{singleCause}</li>
                    ))}
                </ul>
                <ul className="causedActionsContainer">
                    {wasSolved.map((singleWasSolved, i) => (
                        <li key={i}>{singleWasSolved}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}