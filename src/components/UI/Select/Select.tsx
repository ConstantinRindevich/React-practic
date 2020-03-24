import React from 'react';
import classes from './Select.module.css'
import { option } from '../../../interface';

interface SelectProps {
    label: string,
    onChange: (event : React.ChangeEvent<HTMLSelectElement>) => void,
    value: string | number,
    options: option[]
}

const Select: React.FC<SelectProps> = (props) => {
    const idSelect = `${props.label}-${Math.random()}`

    return (
        <div className={classes.Select}>
            <label htmlFor={idSelect}>{props.label}</label>
            <select 
                id={idSelect}
                value={props.value}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => props.onChange(event)}
            >
                {props.options.map((option: any, index: number) => {
                    return (
                        <option
                            value={option.value}
                            key={index}
                        >
                            {option.text}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default Select;