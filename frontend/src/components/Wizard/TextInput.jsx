import React, { useState } from "react";
import styles from "./Wizard.module.css";

const TextInput = ({
  value,
  onChange,
  onConfirm,
  allowIgnore,
  onIgnore,
  isTextarea,
}) => {
  const [isShaking, setIsShaking] = useState(false);

  const handleConfirm = () => {
    if (!value.trim()) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400); // Reset shake after animation
      return;
    }
    onConfirm();
  };

  return (
    <div className={styles.inline}>
      {isTextarea ? (
        <textarea
          className={`${styles.textarea} ${isShaking ? styles.shake : ""}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your answer"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write it here..."
          className={`${styles.textInput} ${isShaking ? styles.shake : ""}`}
        />
      )}
      <div className={styles.buttonGroup}>
        <button
          onClick={handleConfirm}
          className={`${styles.optionButton} ${styles.goButton} ${
            isShaking ? styles.shake : ""
          }`}
        >
          Go
        </button>
      </div>
      {allowIgnore && (
        <button className={styles.ignoreButton} onClick={onIgnore}>
          Ignore
        </button>
      )}
    </div>
  );
};

export default TextInput;
