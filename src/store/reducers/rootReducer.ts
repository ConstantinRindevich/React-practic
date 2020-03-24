import {combineReducers} from "redux";
import quizListReducer from './quizList'
import quizReducer from './quiz';
import authReducer from './auth';
import { createQuizReducer } from './quizCreate'



export default combineReducers({
    quizList: quizListReducer,
    quiz: quizReducer,
    createQuiz: createQuizReducer,
    auth: authReducer
})