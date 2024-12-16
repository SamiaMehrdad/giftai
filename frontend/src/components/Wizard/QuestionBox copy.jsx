import React, { useState } from "react";
import styles from "./QuestionBox.module.css";

const QuestionBox = ({
  question,
  onConfirm,
  initialAnswer,
  showGenerate,
  onGenerate,
}) => {
  const [answer, setAnswer] = useState(initialAnswer || "");
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleOptionSelect = (option) => {
    onConfirm(option);
  };

  const toggleCategory = (category) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  const handleConfirm = () => {
    onConfirm(answer);
    setAnswer(""); // Clear input for the next question
  };

  return (
    <div className={styles.questionBox}>
      <h2>{question.fullQuestion}</h2>

      {showGenerate ? (
        <button className={styles.generateButton} onClick={onGenerate}>
          Generate
        </button>
      ) : question.common || question.categories ? (
        <div className={styles.buttonGroup}>
          {question.common &&
            question.common.map((common) => (
              <button
                key={common}
                className={styles.optionButton}
                onClick={() => handleOptionSelect(common)}
              >
                {common}
              </button>
            ))}
          {question.categories &&
            question.categories.map((cat) => (
              <div key={cat.category} className={styles.categoryContainer}>
                <button
                  className={styles.categoryButton}
                  onClick={() => toggleCategory(cat.category)}
                >
                  {cat.category}
                </button>
                {expandedCategory === cat.category && (
                  <div className={styles.dropdown}>
                    {cat.options.map((option) => (
                      <button
                        key={option}
                        className={styles.optionButton}
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      ) : question.options ? (
        <div className={styles.buttonGroup}>
          {question.options.map((option) => (
            <button
              key={option}
              className={
                question.title === "Favorite Color"
                  ? styles.colorButton
                  : styles.optionButton
              }
              style={
                question.title === "Favorite Color"
                  ? { backgroundColor: option.toLowerCase() }
                  : {}
              }
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          ))}
          {question.allowIgnore && (
            <button
              className={styles.ignoreButton}
              onClick={() => handleOptionSelect("Ignore")}
            >
              Ignore
            </button>
          )}
        </div>
      ) : (
        <div>
          {question.inputType === "textarea" ? (
            <>
              <textarea
                className={styles.textarea}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your answer"
              />
              <div className={styles.buttonGroup}>
                <button onClick={handleConfirm}>Confirm</button>
                {question.allowIgnore && (
                  <button
                    className={styles.ignoreButton}
                    onClick={() => handleOptionSelect("Ignore")}
                  >
                    Ignore
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Your answer"
              />
              <div className={styles.buttonGroup}>
                <button onClick={handleConfirm}>Confirm</button>
                {question.allowIgnore && (
                  <button
                    className={styles.ignoreButton}
                    onClick={() => handleOptionSelect("Ignore")}
                  >
                    Ignore
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionBox;
