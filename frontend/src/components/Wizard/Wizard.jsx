import React, { useState } from "react";
import QuestionBox from "./QuestionBox";
import AnswerList from "./AnswerList";
import questions from "../../data/questions";
import styles from "./Wizard.module.css";
import generatePrompt from "../../services/prompt";

const Wizard = ({ onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});

    const handleAnswer = (answer) => {
        let processedAnswer = answer;

        if (questions[currentStep].title === "Birthday") {
            processedAnswer = processBirthdayAnswer(answer); // Format the date
        }

        const updatedAnswers = { ...answers, [questions[currentStep].title]: processedAnswer };
        setAnswers(updatedAnswers);

        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleEdit = (index) => setCurrentStep(index);

    const handleGenerate = () => {
        console.log("Generating with answers:", answers);
        const prompt = generatePrompt.song(answers);
        // Add your generate logic here
        console.log("Prompt is: ", prompt);
    };

    const processBirthdayAnswer = (birthday) => {
        const { year, month, day, age } = birthday;
        console.log("Processing birthday:", birthday);

        var str =
            (year ? `${year} ` : "") +
            (month ? `${month} ` : "") +
            (day ? `${day}, ` : "") +
            (age ? `${age} years` : "");
        // console.log("result:", str);
        if (str.length === 0) str = "Ignore";
        return str;
    };

    const isLastQuestion = currentStep === questions.length - 1;
    const showGenerate = isLastQuestion && Object.keys(answers).length === questions.length;

    return (
        <div className={styles.wizard}>
            <img className={styles.cute} src="./cuty1.png" alt="cute1" />
            <span className="close" onClick={onClose}></span>
            {/* <img className={styles.background} src="./cuty1.png" alt="cute2" /> */}
            <QuestionBox
                question={questions[currentStep]}
                onConfirm={handleAnswer}
                initialAnswer={answers[questions[currentStep].title] || ""}
                showGenerate={showGenerate}
                onGenerate={handleGenerate}
            />

            <AnswerList answers={answers} questions={questions} onEdit={handleEdit} currentStep={currentStep} />
        </div>
    );
};

export default Wizard;
