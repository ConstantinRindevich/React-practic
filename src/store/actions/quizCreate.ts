import { quizObject } from "../../interface";
import { actionsTypes } from "./actionTypes";
import axios from '../../axios-config/axios-quiz-config';

export function createQuizQuestion(item: quizObject) {
    return ({
        type: actionsTypes.CREATE_QUIZ_QUESTION,
        item: item
    })
}


export function clearQuizCreate() {
    return {
        type: actionsTypes.CLEAR_QUIZ_CREATE
    }
}

export function finishCreateQuiz() {
    return async (dispatch: any, getState: any) => {
        try {
            await axios.post('quizes.json', getState().createQuiz.quiz);
            dispatch(clearQuizCreate());
        }
        catch (error) {
            console.log(error);
        }
    }
}

