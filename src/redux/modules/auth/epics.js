import {combineEpics, ofType} from 'redux-observable';
import {catchError, switchMap} from 'rxjs/operators';
import * as Rx from 'rxjs';
import API from '../../../API';
import * as actions from './actions';
import * as types from './types';


/**
 * @function loginEpic
 * @description performs login operation
 * @param   action$ stream of actions
 * @returns  returns stream of LOGIN_SUCCESS or LOGIN_FAILURE actions
 * @version 0.1.0
 * @since 0.1.0
 */
const loginEpic = action$ => {
    return action$.pipe(
        ofType(types.LOGIN_START),
        switchMap(({payload}) => {
            return Rx.from(API.login(payload)).pipe(
                switchMap(({data}) => {
                    saveAccessToken(data?.access_token);
                    const roles = data.user.roles;
                    const authUserPermissions = roles.map(({ permissions}) => permissions ).flat();
                    return Rx.from([actions.loginSuccess(data?.access_token), actions.setAuthUserPermissions(authUserPermissions)]);
                }),
                catchError(error => Rx.of(actions.loginFailure(error?.message)))
            )
        }),
    );
}

/**
 * @function getAuthUserEpic
 * @description gets authenticated user
 * @param   action$ stream of actions
 * @returns  returns stream of GET_AUTH_USER_SUCCESS or GET_USER_FAILURE actions
 * @version 0.1.0
 * @since 0.1.0
 */
const getAuthUserEpic = action$ => {
    return action$.pipe(
        ofType(types.GET_AUTH_USER_START),
        switchMap(() => {
            return Rx.from(API.getAuthUser()).pipe(
                switchMap(({data}) => {
                    const { roles } = data;
                    const authUserPermissions = roles.map(({ permissions}) => permissions ).flat();
                    return Rx.from([actions.getAuthUserSuccess(data), actions.setAuthUserPermissions(authUserPermissions)]);
                }),
                catchError(error => Rx.of(actions.getAuthUserFailure(error)))
            )
        }),
    );
}


/**
 * @function
 * @name saveAccessToken
 * @description save  access token to local storage
 * @param {String} accessToken
 * */
const saveAccessToken = accessToken => localStorage.setItem('accessToken', accessToken);


export const authRootEpic = combineEpics(
    getAuthUserEpic,
    loginEpic,
);

