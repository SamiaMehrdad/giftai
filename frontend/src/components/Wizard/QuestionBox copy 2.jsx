import React, { useState } from "react";
import styles from "./Wizard.module.css";
import TextInput from "./TextInput";
import ButtonInput from "./ButtonInput";
import CategoryInput from "./CategoryInput";
import DatePicker from "../DatePicker";

const QuestionBox = ({ question, onConfirm, initialAnswer, showGenerate, onGenerate }) => {
    const [answer, setAnswer] = useState(initialAnswer || "");
    const [animating, setAnimating] = useState(false);

    const handleOptionSelect = (option) => {
        setAnimating(true); // Trigger exit animation
        setTimeout(() => {
            onConfirm(option);
            setAnimating(false); // Reset animation state after transition
        }, 400); // Match animation duration
    };

    const handleDatePickerConfirm = (selectedDate) => {
        setAnimating(true);
        setTimeout(() => {
            onConfirm(selectedDate);
            setAnswer(""); // Clear input for the next question
            setAnimating(false);
        }, 400);
    };

    const handleConfirm = () => {
        setAnimating(true);
        setTimeout(() => {
            onConfirm(answer);
            setAnswer(""); // Clear input for the next question
            setAnimating(false);
        }, 400);
    };

    return (
        <div className={`${styles.questionBox} ${animating ? styles.exiting : ""}`}>
            {/* Display the image at the top */}
            {question.imageUrl && <img src={question.imageUrl} alt={question.title} className={styles.questionImage} />}
            <h2>{showGenerate ? "If everything sounds okay, then..." : question.fullQuestion}</h2>
            {/* Display the comment away from below elements */}
            {question.comment && <p className={styles.comment}>{question.comment}</p>}
            {showGenerate ? (
                <button className={styles.generateButton} onClick={onGenerate}>
                    Generate
                </button>
            ) : question.inputType === "date" ? ( // Check if this question requires the DatePicker
                <DatePicker onConfirm={(date) => handleDatePickerConfirm(date)} />
            ) : question.common || question.categories ? (
                <CategoryInput
                    common={question.common || []}
                    categories={question.categories || []}
                    onSelect={handleOptionSelect}
                />
            ) : question.options ? (
                <ButtonInput
                    options={question.options}
                    colors={question.colors || []} // Pass colors dynamically
                    onSelect={handleOptionSelect}
                    allowIgnore={question.allowIgnore}
                    onIgnore={() => handleOptionSelect("Ignore")}
                />
            ) : (
                <TextInput
                    value={answer}
                    onChange={setAnswer}
                    onConfirm={handleConfirm}
                    allowIgnore={question.allowIgnore}
                    onIgnore={() => handleOptionSelect("Ignore")}
                    isTextarea={question.inputType === "textarea"}
                />
            )}
        </div>
    );
};

export default QuestionBox;
