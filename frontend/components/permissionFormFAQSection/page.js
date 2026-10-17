import "./styles.css"

export default function PermissionFormFAQSection({ questionToAnswerArr }) {
    return (
        <div className="permissionFormFAQSectionContainer">
            <p className="faqSectionTitle">FAQ Section</p>
            <div className="allQuestionsContainer">
                {questionToAnswerArr.map(({ question, answer }, id) => (
                    <div className="singleQuestionContainer" key={id}>
                        <p className="faqQuestionTxt">{question}</p>
                        <p className="faqAnswerTxt">{answer}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}