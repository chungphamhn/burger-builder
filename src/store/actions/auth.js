import * as actionTypes from './actionTypes';
import axios from 'axios';
import { setTimeout } from 'timers';


export const authStart = () => {

    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
        console.log(expirationTime * 1000/3600);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let api = 'AIzaSyBij7h2k8J3Zi35Qses3ZHPMkSLUkqzE0o';
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + api;

        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + api;
        }
        console.log(authData);
        axios.post(url, authData)
            .then(response => {
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
                console.log(response.data.expiresIn);
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
                console.log(error.response.data);
            });
    };
};