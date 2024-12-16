import React, { useState } from "react";
import styles from "./Wizard.module.css";
import TextInput from "./TextInput";
import ButtonInput from "./ButtonInput";
import CategoryInput from "./CategoryInput";
import DatePicker from "../DatePicker";

const QuestionBox = ({ question, onConfirm, initialAnswer, showGenerate, onGenerate }) => {
    const [answer, setAnswer] = useState(initialAnswer || "");
    const [animating, setAnimating] = useState(false);

    const handleConfirm = (value) => {
        setAnimating(true);
        setTimeout(() => {
            onConfirm(value);
            setAnswer(""); // Clear input for the next question
            setAnimating(false); // Reset animation state after transition
        }, 400); // Match animation duration
    };

    const renderInput = () => {
        if (showGenerate) {
            return (
                <button className={styles.generateButton} onClick={onGenerate}>
                    Generate
                </button>
            );
        }

        switch (question.inputType) {
            case "date":
                return <DatePicker onConfirm={handleConfirm} />;
            case "category":
                return (
                    <CategoryInput
                        common={question.common || []}
                        categories={question.categories || []}
                        onSelect={handleConfirm}
                    />
                );
            case "button":
                return (
                    <ButtonInput
                        options={question.options || []}
                        colors={question.colors || []}
                        onSelect={handleConfirm}
                        allowIgnore={question.allowIgnore}
                        onIgnore={() => handleConfirm("Ignore")}
                    />
                );
            default:
                return (
                    <TextInput
                        value={answer}
                        onChange={setAnswer}
                        onConfirm={() => handleConfirm(answer)}
                        allowIgnore={question.allowIgnore}
                        onIgnore={() => handleConfirm("Ignore")}
                        isTextarea={question.inputType === "textarea"}
                    />
                );
        }
    };

    return (
        <div className={`${styles.questionBox} ${animating ? styles.exiting : ""}`}>
            {question.imageUrl && <img src={question.imageUrl} alt={question.title} className={styles.questionImage} />}
            <h2>{showGenerate ? "If everything sounds okay, then..." : question.fullQuestion}</h2>
            {question.comment && <p className={styles.comment}>{question.comment}</p>}
            {renderInput()}
        </div>
    );
};

export default QuestionBox;
