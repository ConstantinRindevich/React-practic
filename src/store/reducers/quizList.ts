import { actionsTypes } from "../actions/actionTypes";

const initialState = {
    quizes: [],
    loading: false
}

function quizListReducer(state = initialState, action: any) {
    switch(action.type) {
        case actionsTypes.FETCH_QUIZES_START:
            return {
                ...state,
                loading: true
            };
        case actionsTypes.FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                quizes: action.quizes,
                loading: false
            }
        case actionsTypes.FETCH_QUIZES_ERROR:
            console.log(action.error);
            return {
                ...state,
                quizes: [],
                loading: false
            }
        default:
            return state;
    }
}

export default quizListReducer;