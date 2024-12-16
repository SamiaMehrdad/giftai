import React from "react";
import styles from "./Wizard.module.css";

const AnswerList = ({ answers, questions, onEdit, currentStep }) => {
    // Convert `answers` object to an array of key-value pairs
    const answerEntries = Object.entries(answers);

    return (
        <div className={styles.answerList}>
            {answerEntries.map(([key, value], index) => (
                <div
                    key={index}
                    className={`${styles.answerItem} ${index === currentStep ? styles.active : ""}`}
                    onClick={() => onEdit(index)}
                >
                    <span className={styles.title}>{questions[index].title}:</span>

                    {value === "Ignore" ? (
                        <span className={styles.iconPlaceholder} title="Ignored"></span>
                    ) : (
                        <span className={`${styles.answerValue} ${styles.truncated}`} title={value}>
                            {value}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AnswerList;
