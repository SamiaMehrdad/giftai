import React, { useState, useEffect } from "react";
import styles from "./DatePicker1.module.css";

const DatePicker = ({ onChange, initialDate }) => {
  const today = new Date();
  const [year, setYear] = useState(
    initialDate ? new Date(initialDate).getFullYear() : today.getFullYear()
  );
  const [month, setMonth] = useState(
    initialDate ? new Date(initialDate).getMonth() + 1 : today.getMonth() + 1
  );
  const [day, setDay] = useState(
    initialDate ? new Date(initialDate).getDate() : today.getDate()
  );

  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(
        `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
          2,
          "0"
        )}`
      );
    }
  }, [year, month, day, onChange]);

  const handleYearChange = (value) =>
    setYear(Math.max(1900, Math.min(2100, value)));
  const handleMonthChange = (value) =>
    setMonth(Math.max(1, Math.min(12, value)));
  const handleDayChange = (value) => {
    const maxDays = new Date(year, month, 0).getDate();
    setDay(Math.max(1, Math.min(maxDays, value)));
  };

  return (
    <div className={styles.container}>
      <input
        type="number"
        value={year}
        onChange={(e) => handleYearChange(parseInt(e.target.value, 10) || 1900)}
        className={styles.input}
        placeholder="Year"
      />
      <input
        type="number"
        value={String(month).padStart(2, "0")}
        onChange={(e) => handleMonthChange(parseInt(e.target.value, 10) || 1)}
        className={styles.input}
        placeholder="Month"
      />
      <input
        type="number"
        value={String(day).padStart(2, "0")}
        onChange={(e) => handleDayChange(parseInt(e.target.value, 10) || 1)}
        className={styles.input}
        placeholder="Day"
      />
    </div>
  );
};

export default DatePicker;
