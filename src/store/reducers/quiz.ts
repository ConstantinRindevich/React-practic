import { actionsTypes } from "../actions/actionTypes";

const inititalstate = {
    activeQuizNumber: 0,
    answerSuccess: null,
    isFinished: false,
    results: [],
    quiz: [],
    loading: true
}

export default function quizReducer(state = inititalstate, action: any) {
    switch(action.type) {
        case actionsTypes.FETCH_QUIZ_START:
            return {
                ...state,
                loading: true
            };
        case actionsTypes.FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                quiz: action.quiz,
                activeQuizNumber: 0,
                isFinished: false,
                answerSuccess: null,
                loading: false
            }
        case actionsTypes.FETCH_QUIZ_ERROR:
            console.log(action.error);
            return {
                ...state,
                quiz: [],
                activeQuizNumber: 0,
                isFinished: false,
                answerSuccess: null,
                loading: false
            }
        case actionsTypes.RETRY_QUIZ:
            return {
                ...state,
                activeQuizNumber: 0,
                results: [],
                answerSuccess: null,
                isFinished: false
            }
        case actionsTypes.ANSWER_SUCCESS:
            return {
                ...state,                
                answerSuccess: {
                    [action.answerId]: 'success'
                },                
                results: action.results
            };
        case actionsTypes.ANSWER_ERROR:
            return {
                ...state,                
                answerSuccess: {
                    [action.answerId]: 'error'
                },                
                results: action.results
            };
        case actionsTypes.GO_NEXT_QUESTION: {
            return {
                ...state,
                activeQuizNumber: state.activeQuizNumber + 1,
                answerSuccess: null
            }
        }
        case actionsTypes.QUIZ_FINISH: {
            return {
                ...state,
                isFinished: true
            }
        }
        default:
            return state;
    }
}