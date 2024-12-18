import React, { useState } from "react";
import styles from "./Wizard.module.css";

const CategoryInput = ({ common, categories, onSelect }) => {
    const [expandedCategory, setExpandedCategory] = useState(null);

    const toggleCategory = (category) => setExpandedCategory((prev) => (prev === category ? null : category));

    return (
        <div className={styles.buttonGroup}>
            {common.map((commonItem) => (
                <button key={commonItem} className={styles.optionButton} onClick={() => onSelect(commonItem)}>
                    {commonItem}
                </button>
            ))}
            {categories.map((cat) => (
                <div key={cat.category} className={styles.categoryContainer}>
                    <button className={styles.categoryButton} onClick={() => toggleCategory(cat.category)}>
                        {cat.category}
                    </button>
                    {expandedCategory === cat.category && (
                        <div className={styles.dropdown}>
                            {cat.options.map((option) => (
                                <button key={option} className={styles.optionButton} onClick={() => onSelect(option)}>
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CategoryInput;
