import React, { useState } from "react";
import styles from "./DatePicker.module.css";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const DatePicker = ({ onConfirm, initialDate }) => {
    const currentYear = new Date().getFullYear();
    const currentYearLastTwoDigits = currentYear % 100; // Last two digits of the current year
    const [year, setYear] = useState(initialDate?.year || "");
    const [month, setMonth] = useState(initialDate?.month || "");
    const [day, setDay] = useState(initialDate?.day || "");
    const [age, setAge] = useState(initialDate?.age || "");
    const [showMonthDropdown, setShowMonthDropdown] = useState(false);

    // Helper: Clean numeric input
    const cleanNumericInput = (value) => value.replace(/\D/g, "");

    // Helper: Convert two-digit year to four digits
    const convertTwoDigitYear = (year) => {
        return year > currentYearLastTwoDigits ? 1900 + year : 2000 + year;
    };

    // Handle year input
    const handleYearChange = (value) => {
        const numericValue = cleanNumericInput(value);
        setYear(numericValue);
        setAge(""); // Clear age when year is updated

        if (numericValue === "" || numericValue.length > 4) return;

        const numericYear = parseInt(numericValue, 10);

        if (numericYear >= 1900 && numericYear <= currentYear) {
            setYear(numericYear);
        } else {
            setYear(numericValue); // Allow intermediate invalid input
        }
    };

    // Finalize year input on blur
    const handleYearBlur = () => {
        if (year === "") return;

        const numericYear = parseInt(year, 10);
        if (year.length <= 2) {
            const convertedYear = convertTwoDigitYear(numericYear);
            setYear(convertedYear >= 1900 && convertedYear <= currentYear ? convertedYear : "");
        } else if (numericYear < 1900 || numericYear > currentYear) {
            setYear("");
        }
    };

    // Handle day input
    const handleDayChange = (value) => {
        const numericValue = cleanNumericInput(value);
        const numericDay = parseInt(numericValue, 10);

        if (!numericValue || (numericDay >= 1 && numericDay <= 31)) {
            setDay(numericValue);
        }
    };

    // Handle age input
    const handleAgeChange = (value) => {
        const numericValue = cleanNumericInput(value);
        setAge(numericValue);
        setYear(""); // Clear year when age is updated

        if (numericValue === "") return;

        const numericAge = parseInt(numericValue, 10);
        if (numericAge < 0 || numericAge > 120) {
            setAge(""); // Clear if invalid
        }
    };

    // Handle month selection
    const selectMonth = (index) => {
        setMonth(monthNames[index]); // Months are 1-indexed
        setShowMonthDropdown(false);
    };

    // Confirm data
    const handleConfirm = () => {
        onConfirm({
            year: year || null,
            month: month || null,
            day: day || null,
            age: age || null,
        });
    };

    return (
        <div className={styles.container}>
            {/* Year Input */}
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    value={year}
                    onChange={(e) => handleYearChange(e.target.value)}
                    onBlur={handleYearBlur}
                    className={styles.input}
                    placeholder="Year"
                />
            </div>

            {/* Month Input */}
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    value={month ? month : ""}
                    readOnly
                    className={styles.input}
                    placeholder="Month"
                    onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                />
                {showMonthDropdown && (
                    <div className={styles.monthDropdown}>
                        {monthNames.map((name, index) => (
                            <div key={index} className={styles.monthOption} onClick={() => selectMonth(index)}>
                                {name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Day Input */}
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    value={day}
                    onChange={(e) => handleDayChange(e.target.value)}
                    className={styles.input}
                    placeholder="Day"
                />
            </div>

            {/* Age Input */}
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    value={age}
                    onChange={(e) => handleAgeChange(e.target.value)}
                    className={styles.input}
                    placeholder="Age"
                />
            </div>

            {/* Confirm Button */}
            <div className={styles.confirmButtonWrapper}>
                <button className={` btn ${styles.confirmButton}`} onClick={handleConfirm}>
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default DatePicker;
