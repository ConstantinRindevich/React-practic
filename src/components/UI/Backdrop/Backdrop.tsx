import React from 'react';
import classes from './Backdrop.module.css'

interface BackdropProps {
    onClick: () => void
}

const Backdrop: React.FunctionComponent<BackdropProps> = (props) => {
    return (
        <div className={classes.Backdrop} onClick={props.onClick}></div>
    )
}

export default Backdrop;