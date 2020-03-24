import React from 'react'
import classes from './Input.module.css'

interface InputProps {
    type?: string,
    label: string,
    value?: any,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    errorMessage?: string,
    valid?: boolean,
    touched?: boolean,
    shoudValidate?: boolean
}

function isInvalid({valid, touched, shoudValidate} : InputProps) {
    return !valid && shoudValidate && touched;
}

const Input: React.FC<InputProps> = (props) => {

    const inputType = props.type || 'text';
    const cls = [classes.Input];
    const inputId = `${inputType}-${Math.random()}`;

    if (isInvalid(props)) {
        cls.push(classes.invalid);
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={inputId}>{props.label}</label>
            <input 
                id={inputId} 
                type={inputType}
                value={props.value}
                onChange={event => props.onChange(event)}
            />
            {isInvalid(props)? <span>{props.errorMessage || 'Введите верное значение'}</span> : null}
        </div>
    )
}

export default Input;