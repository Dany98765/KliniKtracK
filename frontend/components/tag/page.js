import "./styles.css"

export default function Tag({ title }) {
    return (
        <div className="tagContainer">
            <span className="circle" />
            <p className="tagTitle">{title}</p>
        </div>
    )
}