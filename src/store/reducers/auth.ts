import { actionsTypes } from "../actions/actionTypes";

const initialState ={
    token: null
}

export default function authReducer(state = initialState, action: any) {
    switch(action.type) {
        case actionsTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token
            }
        case actionsTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null
            }
        default:
            return state;
    }
}