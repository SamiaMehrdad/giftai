import React, { useState } from "react";
import styles from "./Wizard.module.css";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const DatePicker = ({ onChange, initialDate }) => {
    const [year, setYear] = useState(initialDate?.year || "");
    const [month, setMonth] = useState(initialDate?.month || "");
    const [day, setDay] = useState(initialDate?.day || "");
    const [age, setAge] = useState(initialDate?.age || "");
    const [showMonthDropdown, setShowMonthDropdown] = useState(false);

    // Helper: Clean numeric input
    const cleanNumericInput = (value) => value.replace(/\D/g, "");

    // Handle year input change
    const handleYearChange = (value) => {
        const numericValue = cleanNumericInput(value);
        setYear(numericValue);
        setAge(""); // Clear age to indicate year is prioritized
        propagateChange(numericValue, month, day, "");
    };

    // Handle month selection
    const selectMonth = (index) => {
        setMonth(index + 1); // Months are 1-indexed
        setShowMonthDropdown(false); // Close dropdown after selection
        propagateChange(year, index + 1, day, age);
    };

    // Handle day input change
    const handleDayChange = (value) => {
        const numericValue = cleanNumericInput(value);
        setDay(numericValue);
        propagateChange(year, month, numericValue, age);
    };

    // Handle age input change
    const handleAgeChange = (value) => {
        const numericValue = cleanNumericInput(value);
        setAge(numericValue);
        setYear(""); // Clear year to indicate age is prioritized
        propagateChange("", month, day, numericValue);
    };

    // Propagate changes to parent
    const propagateChange = (year, month, day, age) => {
        onChange({ year: year || null, month: month || null, day: day || null, age: age || null });
    };

    return (
        <div className={styles.container}>
            {/* Year Input */}
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    value={year}
                    onChange={(e) => handleYearChange(e.target.value)}
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
