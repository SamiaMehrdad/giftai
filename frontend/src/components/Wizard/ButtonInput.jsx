import React from "react";
import styles from "./Wizard.module.css";

const ButtonInput = ({ options, onSelect, allowIgnore, onIgnore, colors }) => (
  <div className={styles.buttonGroup}>
    {options.map((option, index) => (
      <button
        key={option}
        className={styles.optionButton}
        onClick={() => onSelect(option)}
      >
        {option}
        {colors && colors[index] && (
          <span
            className={styles.colorCircle}
            style={{ backgroundColor: colors[index] }}
          />
        )}
      </button>
    ))}
    {allowIgnore && (
      <button className={styles.ignoreButton} onClick={onIgnore}>
        Ignore
      </button>
    )}
  </div>
);

export default ButtonInput;
