import axios from 'axios';
import { actionsTypes } from './actionTypes';

function authSuccess(token: string) {
    return ({
        type: actionsTypes.AUTH_SUCCESS,
        token
    })
}

export function logout() {
    console.log('logout')
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return ({
        type: actionsTypes.AUTH_LOGOUT
    })
}

export function autoLogin() {
    return (dispatch: any) => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate')!);
            if (expirationDate <= new Date()) {
                dispatch(logout())
            }
            else {
                dispatch(authSuccess(token));
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}

function autoLogout(time: number) {
    return (dispatch: any) => {
        setTimeout(() => {
            dispatch(logout())
        }, time*1000)
    }

}

export function auth(email: string, password: string, isLogin: boolean) {
    return async (dispatch : any) => {
        const authData ={
            email,
            password,
            returnSecureToken: true
        }

        let url: string = '';
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKTerjVHqCz08ChmlHQoJMLaQkwD6T0BQ'
        }
        else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKTerjVHqCz08ChmlHQoJMLaQkwD6T0BQ'
        }
        try {
            const response = await axios.post(url, authData);
            const data = response.data;

            const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

            localStorage.setItem('token', data.idToken);
            localStorage.setItem('userId', data.localId);
            localStorage.setItem('expirationDate', expirationDate.toString());

            dispatch(authSuccess(data.idToken));
            dispatch(autoLogout(data.expiresIn));
        }
        catch (error) {
            console.log(error);
        }
    }
}