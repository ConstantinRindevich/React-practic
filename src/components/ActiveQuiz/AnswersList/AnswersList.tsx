import React from 'react'
import classes from './AnswersList.module.css'
import AnswerItem from './AnswerItem/AnswerItem';
import { answerObject } from '../../../interface';

interface AnswerListProps {
    answers?: answerObject[],
    onAnswerClick: (answerId: number) => void,
    answerSuccess: any
}

const AnswersList: React.FunctionComponent<AnswerListProps> = (props) => {
    var answers: answerObject[] = [];
    if (props.answers) {
        answers = props.answers;
    }
    return (
        <ul className={classes.AnswersList}>
            {
                answers.map((answer, index) => {
                    return (
                        <AnswerItem
                            answer={answer}
                            onAnswerClick={props.onAnswerClick}
                            answerSuccess={props.answerSuccess? props.answerSuccess[answer.id] : null}
                            key = {index} 
                        />
                    )
                })
            }
        </ul>
    )
}

export default AnswersList;