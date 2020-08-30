import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart = () => {

    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
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
            console.log("not signup");
        }
        console.log(authData);
        axios.post(url, authData)
            .then(response => {
                dispatch(authSuccess(response.data));
                console.log(response.data);
            })
            .catch(error => {
                dispatch(authFail(error));
                console.log(error.response.data);
            });
    };
};