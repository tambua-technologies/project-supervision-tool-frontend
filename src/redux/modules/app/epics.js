import { ofType } from 'redux-observable';
import {  switchMap } from 'rxjs/operators';
import * as Rx from 'rxjs';
import * as types from './types'
import {authActions} from "../auth";


export const restoreAccessTokenEpic = action$ => {
    return action$.pipe(
        ofType(types.RELOAD_PAGE),
        switchMap(() => {
            return Rx.of(authActions.getAuthUserStart());
        }),
    );
}



