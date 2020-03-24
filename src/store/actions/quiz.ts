import axios from '../../axios-config/axios-quiz-config';
import { quizObject } from '../../interface';
import { actionsTypes } from './actionTypes';

function fetchQuizStart() {
    return {
        type: actionsTypes.FETCH_QUIZ_START
    }
}

function fetchQuizSuccess(quiz: quizObject) {
    return {
        type: actionsTypes.FETCH_QUIZ_SUCCESS,
        quiz: quiz
    }
}

function fetchQuizError(error: string) {
    return {
        type: actionsTypes.FETCH_QUIZ_ERROR,
        error: error
    }
}

export function fetchQuizById(id: string) {
    return async (dispatch: any) => {
        dispatch(fetchQuizStart())        
        try {
            const response = await axios.get(`quizes/${id}.json`);
            const quiz = response.data;
            dispatch(fetchQuizSuccess(quiz))
        }
        catch (error) {
            dispatch(fetchQuizError(error));
        }
    }
}

export function retryQuiz() {
    return {
        type: actionsTypes.RETRY_QUIZ
    }
}

function answerSuccess(answerId: number, results: any) {
    return {
        type: actionsTypes.ANSWER_SUCCESS,
        answerId: answerId,
        results: results
    }
}

function answerError(answerId: number, results: any) {
    return {
        type: actionsTypes.ANSWER_ERROR,
        answerId: answerId,
        results: results
    }
}

function quizFinish() {
    return {
        type: actionsTypes.QUIZ_FINISH
    }
}

function goNextQuestion() {
    return {
        type: actionsTypes.GO_NEXT_QUESTION
    }
}

export function checkAnswer(answerId: number) {
    return (dispatch: any, getState: () => any) => {
        const state = getState().quiz;
        if (state.answerSuccess) {
            var key = Object.keys(state.answerSuccess!)[0];
            if (state.answerSuccess![key] === 'success'){
                return;
            }
        }

        const activeQuiz: quizObject = state.quiz[state.activeQuizNumber];
        const results: boolean[] = state.results;

        if (results[state.activeQuizNumber] === undefined) {
            results[state.activeQuizNumber] = (activeQuiz.rightAnswerId === answerId)
        }

        if (activeQuiz.rightAnswerId === answerId) {
            dispatch(answerSuccess(answerId, results));
            window.setTimeout(() => {
                if (state.activeQuizNumber + 1 === state.quiz.length) {                    
                    dispatch(quizFinish());
                }
                else {                    
                    dispatch(goNextQuestion());
                }
            }, 1000);     
        }
        else {
            dispatch(answerError(answerId, results));
        }
    }
}