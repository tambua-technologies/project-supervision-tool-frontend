import * as types from "./types";
import {appTypes} from '../app';
import {combineReducers} from "redux";

const initialState = {
    isLogin: false,
    accessToken: '',
    errorMessage: ''
}

export const login = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGOUT:
            return {...state, accessToken: ''};
        case appTypes.RESTORE_ACCESS_TOKEN:
            return {...state, accessToken: action.payload};
        case types.LOGIN_START:
            return {...state, isLogin: true};
        case types.LOGIN_SUCCESS:
            return {...state, accessToken: action.payload, isLogin: false, errorMessage: ''};
        case types.LOGIN_FAILURE:
            return {...state, errorMessage: action.payload, isLogin: false};
        default:
            return state;
    }
};

const authUser = (state = { data: null, error: null,loading: false }, action) => {
    switch (action.type) {
        case types.GET_AUTH_USER_START:
            return {...state, loading: true };
        case types.GET_AUTH_USER_SUCCESS:
            return {...state, data: action.payload, loading: false};
        case types.GET_AUTH_USER_FAILURE:
            return {...state, error: action.payload, loading: false};
        default:
            return state;
    }
};

const authUserPermissions = (state = [], action) => {
    switch (action.type) {
        case types.SET_AUTH_USER_PERMISSIONS:
            return action.payload;
        case types.LOGOUT:
            return [];
        default:
            return state;
    }
};


export const auth = combineReducers({
    login,
    authUserPermissions,
    authUser,
});

