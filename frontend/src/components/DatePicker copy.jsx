import React, { useState } from "react";
import styles from "./DatePicker.module.css";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const DatePicker = () => {
    const currentYear = new Date().getFullYear();
    const currentYearLastTwoDigits = currentYear % 100; // Last two digits of the current year
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [age, setAge] = useState("");
    const [showMonthDropdown, setShowMonthDropdown] = useState(false);

    // Helper: Clean numeric input
    const cleanNumericInput = (value) => value.replace(/\D/g, "");

    // Helper: Convert two-digit year to four digits
    const convertTwoDigitYear = (year) => {
        return year > currentYearLastTwoDigits ? 1900 + year : 2000 + year;
    };

    // Handle year input change
    const handleYearChange = (value) => {
        const numericValue = cleanNumericInput(value);

        // Allow clearing the field
        if (numericValue === "") {
            setYear("");
            setAge("");
            return;
        }

        // Limit to 4 digits
        if (numericValue.length > 4) return;

        setYear(numericValue); // Temporarily allow incomplete input
    };

    // Handle year input blur (finalize validation and conversion)
    const handleYearBlur = () => {
        if (year === "") return; // Skip validation for empty input

        const numericYear = parseInt(year, 10);

        if (year.length <= 2) {
            const convertedYear = convertTwoDigitYear(numericYear);

            if (convertedYear >= 1900 && convertedYear <= currentYear) {
                setYear(convertedYear);
                setAge(currentYear - convertedYear);
            } else {
                clearYear();
            }
        } else if (numericYear < 1900 || numericYear > currentYear) {
            clearYear();
        }
    };

    // Helper: Clear year and age
    const clearYear = () => {
        setYear("");
        setAge("");
    };

    // Handle day input change
    const handleDayChange = (value) => {
        const numericValue = cleanNumericInput(value);
        const updatedDay = parseInt(numericValue, 10);

        if (!numericValue || (updatedDay >= 1 && updatedDay <= 31)) {
            setDay(numericValue); // Temporarily allow incomplete input
        }
    };

    // Handle age input change
    const handleAgeChange = (value) => {
        const numericValue = cleanNumericInput(value);
        const updatedAge = parseInt(numericValue, 10);

        setAge(numericValue); // Temporarily allow incomplete input

        if (numericValue === "") {
            clearYear();
            return;
        }

        if (updatedAge >= 0 && updatedAge <= 120) {
            setYear(currentYear - updatedAge);
        }
    };

    // Handle month selection
    const selectMonth = (index) => {
        setMonth(index + 1); // Months are 1-indexed
        setShowMonthDropdown(false); // Close dropdown after selection
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
                    value={month ? monthNames[month - 1] : ""}
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
        </div>
    );
};

export default DatePicker;
