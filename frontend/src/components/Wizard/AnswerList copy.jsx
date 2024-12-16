import React from "react";
import styles from "./Wizard.module.css";

const AnswerList = ({ answers, questions, onEdit, currentStep }) => (
  <div className={styles.answerList}>
    {answers.map((answer, index) => (
      <div
        key={index}
        className={`${styles.answerItem} ${
          index === currentStep ? styles.active : ""
        }`}
        onClick={() => onEdit(index)}
      >
        <span className={styles.title}>{questions[index].title}:</span>
        <span className={styles.value}>{answer}</span>
      </div>
    ))}
  </div>
);

export default AnswerList;
