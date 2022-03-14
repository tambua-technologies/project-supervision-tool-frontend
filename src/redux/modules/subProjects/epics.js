import * as actions from './actions';
import * as types from './types';
import { mapActions } from '../../../redux/modules/map';
import API from '../../../API';
import { ofType, combineEpics } from 'redux-observable';
import { of, from,  } from 'rxjs';
import { switchMap, catchError, } from "rxjs/operators";

const getsubProjectsEpic = action$ => {
    return action$.pipe(
        ofType(types.GET_SUB_PROJECTS_START),
        switchMap(({payload}) => {
            return from(API.getSubProjects(payload)).pipe(
                switchMap(res => {
                    return from([actions.getSubProjectsSuccess(res.data), mapActions.clearRegionDetails()])
                }),
                catchError(error => of(actions.getSubProjectsFailure(error)))
            );
        }),
    )
};

/**
 * @function
 * @name createSubProjectEpic
 * @param action$
 * @return action$
 */
 const createSubProjectEpic = action$ => {
    return action$.pipe(
        ofType(types.CREATE_SUB_PROJECT_START),
        switchMap(({payload}) => {
            return from(API.createSubProject(payload))
                .pipe(
                    switchMap(res => {
                        return of(actions.createSubProjectSuccess(res))
                    }),
                    catchError(error => of(actions.createSubProjectFailure(error)))
                )
        }),
    )
}


/**
 * @function
 * @name updateSubProjectEpic
 * @description gets all sub projects items 
 * @param action$
 * @return actions
 */
const updateSubProjectEpic = action$ => {
    return action$.pipe(
        ofType(types.UPDATE_SUB_PROJECT_START),
        switchMap(({ payload }) => {
            return from(API.updateSubProject(payload, payload.sub_project_id))
        }),
        switchMap(res => {
            return (of(actions.updateSubProjectSuccess(res)), of(actions.getSubProjectsStart()))
        }),
        catchError(error => { return of(actions.updateSubProjectFailure(error)) })

    )
}

/**
 * @function
 * @name getSubProjectEpic
 * @param action$
 * @return action$
 */
 export const getSubProjectEpic = action$ => {
    return action$.pipe(
        ofType(types.GET_SUB_PROJECT_START),
        switchMap(({payload}) => {
            return from(API.getSubProject(payload)).pipe(
                switchMap(res => {
                    return of(actions.getSubProjectSuccess(res.data))
                }),
                catchError(error => of(actions.getSubProjectFailure(error)))
            );
        }),
    )
};

const deleteSubProjectEpic = action$ => {
    return action$.pipe(
        ofType(types.DELETE_SUB_PROJECT_START),
        switchMap(({payload}) => {
            return from(API.deleteSubProject(payload)).pipe(
                switchMap(res => {
                    return of(actions.deleteSubProjectSuccess(res))
                }),
            )
        }),
        catchError(error => of(actions.deleteSubProjectFailure(error)))
    );
}
/**
 * @function
 * @name getSubProjectItemsEpic
 * @description gets all sub projects items 
 * @param action$
 * @return actions
 */
const getSubProjectItemsEpic = action$ => {
    return action$.pipe(
        ofType(types.GET_SUB_PROJECT_ITEMS_START),
        switchMap(() => {
            return from(API.getSubProjectItems()).pipe(
                switchMap(res => {
                    return of(actions.getSubProjectItemsSuccess(res.data))
                }),
                catchError(error => of(actions.getSubProjectItemsFailure(error)))
            )
        }
        ),
    )
}

/**
 * @function
 * @name createSubProjectItemEpic
 * @description create sub project item 
 * @param action$
 * @return actions
 */
const createSubProjectItemEpic = action$ => {
    return action$.pipe(
        ofType(types.CREATE_SUB_PROJECT_ITEM_START),
        switchMap(({ payload }) => {
            return from(API.createSubProjectItem(payload))
        }),
        switchMap(res => {
            return (of(actions.createSubProjectItemSuccess(res)))
        }),
        catchError(error => { return of(actions.createSubProjectItemFailure(error)) })

    )
}

/**
 * @function
 * @name getSubProjectEquipmentsEpic
 * @description gets all sub projects items 
 * @param action$
 * @return actions
 */
const getSubProjectEquipmentsEpic = action$ => {
    return action$.pipe(
        ofType(types.GET_SUB_PROJECT_EQUIPMENTS_START),
        switchMap(() => {
            return from(API.getSubProjectEquipments()).pipe(
                switchMap(res => {
                    return of(actions.getSubProjectEquipmentsSuccess(res.data))
                }),
                catchError(error => of(actions.getSubProjectEquipmentsFailure(error)))
            )
        }
        ),
    )
}


/**
 * @function
 * @name uploadPhotoEpic
 * @param action$
 * @return action$
 */
const uploadPhotoEpic = action$ => {
    return action$.pipe(
        ofType(types.UPLOAD_PHOTO_START),
        switchMap(({payload}) => {
            return from(API.uploadPhotos(payload, payload.sub_project_id))
        }),
        switchMap(res => { return of(actions.uploadPhotoSuccess(res)) }),
        catchError(error => of(actions.uploadPhotoFailure(error)))
    )
}



export const subProjectsEpic = combineEpics(
    getsubProjectsEpic,
    getSubProjectEpic,
    getSubProjectItemsEpic,
    createSubProjectItemEpic,
    getSubProjectEquipmentsEpic,
    updateSubProjectEpic,
    uploadPhotoEpic,
    deleteSubProjectEpic,
    createSubProjectEpic
)
