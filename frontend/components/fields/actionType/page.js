"use client"

import Image from "next/image"
import "./styles.css"

export default function ActionTypeField({ state, setState }) {
    return (
        <div className="actionTypeFieldContainer">
            <p className="actionTypeFieldTitle">Action Type <span className="requiredAsteriks">*</span></p>
            <div className="actionTypesSelectionContainer">
                <div className="surgicalOperationActionTypeSelectionContainer">
                    <div className="surgicalOperationInfo">
                        <div className="surgicalOperationActionTypeImgContainer">
                            <Image
                                src="/surgical-operation.png"
                                width={40}
                                height={40}
                                alt="Surgical Opeartion"
                                className="surgicalOperationImgForFieldSelection"
                            />
                        </div>
                        <div>
                            <p className="surgicalOperationFieldSelectionTitle">Surgical Opeartion</p>
                            <p className="surgicalOperationFieldSelectionDesc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus laoreet dui at vestibulum. Curabitur in nisi mattis,</p>
                        </div>

                    </div>
                    <button className="chooseSurgicalOperationActionTypeButton" style={{ backgroundColor: state.actionType == 'Surgical operation' ? '#A411D9780' : '#A411D97' }} onClick={() => {
                        setState((prev) => ({
                            ...prev,
                            actionType: "Surgical operation"
                        }))
                    }}>
                        {state.actionType == 'Surgical operation' ? '✔ Type Chosen' : 'Choose Type →'}
                    </button>
                </div>
                <div className="tabletActionTypeSelectionContainer">
                    <div className="tabletInfo">
                        <div className="tabletActionTypeImgContainer">
                            <Image
                                src="/tablet-img.png"
                                width={40}
                                height={40}
                                alt="Tablet"
                                className="tabletImgForFieldSelection"
                            />
                        </div>
                        <div>
                            <p className="tabletFieldSelectionTitle">Tablet</p>
                            <p className="tabletFieldSelectionDesc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus laoreet dui at vestibulum. Curabitur in nisi mattis,</p>
                        </div>

                    </div>
                    <button className="chooseTabletActionTypeButton" style={{ backgroundColor: state.actionType == 'Tablet' ? '#23BAE780' : '#23BAE7' }} onClick={() => {
                        setState((prev) => ({
                            ...prev,
                            actionType: "Tablet"
                        }))
                    }}>
                        {state.actionType == 'Tablet' ? '✔ Type Chosen' : 'Choose Type →'}
                    </button>
                </div>
                <div className="geneticActionTypeSelectionContainer">
                    <div className="geneticInfo">
                        <div className="geneticActionTypeImgContainer">
                            <Image
                                src="/dna.png"
                                width={40}
                                height={40}
                                alt="Genetic DNA"
                                className="geneticImgForFieldSelection"
                            />
                        </div>
                        <div>
                            <p className="geneticFieldSelectionTitle">Genetic</p>
                            <p className="geneticFieldSelectionDesc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus laoreet dui at vestibulum. Curabitur in nisi mattis,</p>
                        </div>

                    </div>
                    <button className="chooseGeneticActionTypeButton" style={{ backgroundColor: state.actionType == 'Genetic' ? '#CCCCCC80' : '#CCCCCC' }} onClick={() => {
                        setState((prev) => ({
                            ...prev,
                            actionType: "Genetic"
                        }))
                    }}>
                        {state.actionType == 'Genetic' ? '✔ Type Chosen' : 'Choose Type →'}
                    </button>
                </div>
            </div>
        </div>
    )
}