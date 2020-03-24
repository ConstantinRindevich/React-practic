import axios from '../../axios-config/axios-quiz-config';
import { quizListObject } from '../../interface';
import { actionsTypes } from './actionTypes';

function fetchQuizesStart() {
    return {
        type: actionsTypes.FETCH_QUIZES_START
    }
}

function fetchQuizesSuccess(quizes: quizListObject[]) {
    return {
        type: actionsTypes.FETCH_QUIZES_SUCCESS,
        quizes: quizes
    }
}

function fetchQuizesError(error: string) {
    return {
        type: actionsTypes.FETCH_QUIZES_ERROR,
        error: error
    }
}

export function fetchQuizes() {
    return async (dispatch: any) => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('quizes.json');
            //TODO Обработать response.data=null
            const quizes: quizListObject[] = [];
            Object.keys(response.data).map((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`,
                    quiz: response.data[key]
                });
                return key;
            })
            dispatch(fetchQuizesSuccess(quizes))
        }
        catch (error) {
            dispatch(fetchQuizesError(error));
        }
    }
}