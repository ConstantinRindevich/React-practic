import { actionsTypes } from '../actions/actionTypes';

const initialState = {
    quiz: []
}

export function createQuizReducer(state = initialState, action: any) {
    switch(action.type) {
        case actionsTypes.CREATE_QUIZ_QUESTION:
            return {
                ...state,
                quiz: [
                    ...state.quiz,
                    action.item
                ]
            }
        case actionsTypes.CLEAR_QUIZ_CREATE:
            return {
                ...state,
                quiz: []
            }
        default:
            return state;
    }
}