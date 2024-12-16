import React, { useState } from "react";
import QuestionBox from "./QuestionBox";
import AnswerList from "./AnswerList";
import questions from "../../data/questions";
import styles from "./Wizard.module.css";

const Wizard = ({ onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState([]);

    const handleAnswer = (answer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentStep] = answer;
        setAnswers(updatedAnswers);

        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleEdit = (index) => setCurrentStep(index);

    const handleGenerate = () => {
        console.log("Generating with answers:", answers);
        // Add your generate logic here
    };

    const isLastQuestion = currentStep === questions.length - 1;
    const showGenerate = isLastQuestion && answers.length === questions.length;

    return (
        <div className={styles.wizard}>
            <img className={styles.cute} src="./cuty1.png" alt="cute1" />
            <span className="close" onClick={onClose}></span>
            {/* <img className={styles.background} src="./cuty1.png" alt="cute2" /> */}
            <QuestionBox
                question={questions[currentStep]}
                onConfirm={handleAnswer}
                initialAnswer={answers[currentStep] || ""}
                showGenerate={showGenerate}
                onGenerate={handleGenerate}
            />

            <AnswerList answers={answers} questions={questions} onEdit={handleEdit} currentStep={currentStep} />
        </div>
    );
};

export default Wizard;
