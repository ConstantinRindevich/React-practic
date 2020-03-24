import React from 'react';
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList';
import { quizObject } from '../../interface';

interface ActiveQuizProps {
    quiz: quizObject,
    onAnswerClick: (answerId: number) => void,
    quizNumber: number,
    quizLength: number,
    answerSuccess: any
}

const ActiveQuiz: React.FunctionComponent<ActiveQuizProps> = (props) => {
    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong>{props.quizNumber}.</strong>&nbsp;
                    {props.quiz.question}
                </span>
                <small>{props.quizNumber} из {props.quizLength}</small>
            </p>
            <ul>
                <AnswersList
                   answers={props.quiz.answers}
                   onAnswerClick={props.onAnswerClick}
                   answerSuccess={props.answerSuccess}
                />
            </ul>
        </div>
    )
}

export default ActiveQuiz;