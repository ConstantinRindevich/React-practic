import React from 'react';
import classes from './AnswerItem.module.css'
import { answerObject } from '../../../../interface';

interface AnswerItemProps {
    answer: answerObject,
    onAnswerClick: (answerId: number) => void,
    answerSuccess?: string
}

const AnswerItem: React.FunctionComponent<AnswerItemProps> = (props) => {

    var classNames = [classes.AnswerItem]
    if (props.answerSuccess) {        
        classNames.push(classes[props.answerSuccess])
    }

    return (
        <li 
            className={classNames.join(' ')} 
            onClick={() => {props.onAnswerClick(props.answer.id)}}>
            {props.answer.text}
        </li>
    )
}

export default AnswerItem;