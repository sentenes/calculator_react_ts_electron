import React from "react";
import styles from './styles.module.css';

declare interface KeyProps {
    backgroundColor?: string,
    content: string,
    id: string,
    type?: string,

    onClick(key: string, type: string): void,
}

const Key = (props: KeyProps) => {
    const type = props.type || 'normal';
    const onClick = () => {
        props.onClick(props.id, type);
    }

    return (
        <div className={styles.keyContainer}>
            <div className={`${styles.keyText} ${styles[type]}`}
                 style={{backgroundColor: props.backgroundColor || '#636363'}}
                 onClick={onClick}>
                {props.content}
            </div>
        </div>
    );
}


export const NormalKey = (props: KeyProps) => {
    let normalProps: KeyProps = {
        ...props,
        backgroundColor: props.backgroundColor || "#7D7D7D"
    }
    return (
        <>
            <Key {...normalProps}/>
        </>
    )
}

export const OperatorKey = (props: KeyProps) => {
    let normalProps: KeyProps = {
        ...props,
        backgroundColor: props.backgroundColor || "#F89F0E",
        type: 'operator'
    };
    return (
        <>
            <Key {...normalProps}/>
        </>
    );
}

export const FunctionKey = (props: KeyProps) => {
    let functionProps = {
        ...props,
        type: 'function'
    }
    return (
        <>
            <Key {...functionProps}/>
        </>
    )
}

export default (props: KeyProps) => {
    return (
        <>
            <NormalKey {...props}/>
        </>
    )
}