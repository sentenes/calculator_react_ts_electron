import React from "react";
import styles from './styles.module.css';
import {calculatorTypes} from "../../types/DisplayProps";

export const Display = (props: calculatorTypes.IDisplayProps) => {
    return (
        <div className={styles.displayContainer}>
            <div className={styles.displayValue}>{props.value}</div>
        </div>
    )
};

