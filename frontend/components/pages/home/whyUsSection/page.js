import Image from "next/image"
import "./styles.css"

export default function WhyUsSection() {
    return (
        <div className="whyUsSectionContainer">
            <div className="whyUsTagContainer">
                <span className="whyUsCircle" />
                <p className="whyUsTagTitle">Why us?</p>
            </div>
            <div className="featureCardsContainer">
                <div className="permissionAndEndToEndContainer">
                    <div className="permissionBasedCardContainer">
                        <div className="imgContainer1">
                            <Image
                                src="/time.png"
                                width={30}
                                height={30}
                                alt="Time"
                                className="timeImg"
                            />
                        </div>
                        <h1 className="permissionBasedTitle">Permission-Based</h1>
                        <p className="permissionBasedDesc">You control the actions! Allow certain doctors with certain time-based and scope-based permissions</p>
                    </div>
                    <div className="endToEndSolutionContainer" dir="rtl">
                        <div className="imgContainer2">
                            <Image
                                src="/iteration.png"
                                width={30}
                                height={30}
                                alt="Time"
                                className="iteration"
                            />
                        </div>
                        <h1 className="endToEndTitle">End-to-End Solution</h1>
                    </div>
                </div>
                <div className="chronologicallyOrderedCardContainer">
                    <div className="imgContainer3">
                        <Image
                            src="/timeline.png"
                            width={30}
                            height={30}
                            alt="Time"
                            className="timelineImg"
                        />
                    </div>
                    <h1 className="permissionBasedTitle">Chronologically Ordered</h1>
                    <p className="permissionBasedDesc">A sequence/timeline aligning with every tablet or surgery done in order to ensure utmost accuracy when informing your doctor with your lifetime health status & history</p>
                </div>
            </div>
        </div>
    )
}