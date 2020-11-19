import * as actions from './actions';
import * as types from './types';
import * as API from '../../../API';
import { ofType } from 'redux-observable';
import { of, from } from 'rxjs';
import { switchMap, catchError, } from "rxjs/operators";

export const projectsListEpic = action$ =>
    action$.pipe(
        ofType(types.GET_PROJECTS_START),
        switchMap(() => {
            return from(API.getProjects())
        }),
        switchMap(result => { return of(actions.getProjectsSuccess(result.data))}),
        catchError(error => of(actions.getProjectsFailure(error))
        )
    );

export const deleteProjectEpic = action$ => 
    action$.pipe(
        ofType(types.DELETE_PROJECT_START),
        switchMap(project_id => {
            return from(API.deleteProject(project_id))
        }),
        switchMap(result => {return of(actions.deleteProjectSuccess(result.data))}),
        catchError(error => of(actions.deleteProjectFailure(error)))
    );