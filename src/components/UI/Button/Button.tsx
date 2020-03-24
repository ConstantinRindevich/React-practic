import React from 'react'
import classes from './Button.module.css'

type emptyFunction = () => void
type onClickFunctionWithEvent = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void

interface ButtonProps {
    onClick?: emptyFunction | onClickFunctionWithEvent,
    type: string,
    className?: string,
    disabled?: boolean,
    children?: React.ReactNode
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
    const classButton : string[] = [
        classes.Button,
        classes[props.type]
    ];

    return (
        <button 
            className={classButton.join(' ') + ' ' + (props.className? props.className : '')} 
            onClick={props.onClick}
            disabled={props.disabled? props.disabled : false}
        >
            {props.children}
        </button>
    )
}

export default Button
