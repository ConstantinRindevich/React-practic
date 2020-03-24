import React from 'react'
import classes from './FinishedQuiz.module.css'
import { quizObject } from '../../interface';
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom';

interface FinishedQuizProps {
    quizes: quizObject[],
    results: boolean[],
    onRetry: () => void
}

const FinishedQuiz: React.FunctionComponent<FinishedQuizProps> = (props) => {
    const successCount : number = props.results.reduce((total, result) => {
        if (result) {
            total++;
        }
        return total;
    }, 0)

    var classCorrect: string = '';

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quizes.map((quiz, index) => {
                    if (props.results[index]) {
                        classCorrect = classes['success'];
                    }
                    else {
                        classCorrect = classes['error'];
                    }
                    return (
                        <li key={index}>
                            <strong>{index + 1}.</strong>&nbsp;
                            {quiz.question}
                            <span className={classCorrect}>
                                {props.results[index]? 'Правильно' : 'Неправильно'}
                            </span>
                        </li>
                    )
                })}
            </ul>
            <p>Правильно {successCount} из {props.quizes.length}</p>
            <div>
                <Button
                    onClick={props.onRetry}
                    type='primary'
                >Повторить</Button>
                <Link to="/">
                    <Button
                        type='success'
                    >Перейти в список текстов</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz;