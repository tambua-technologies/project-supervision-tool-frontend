import * as actions from './actions';
import * as types from './types';
import API from '../../../API';
import { ofType, combineEpics } from 'redux-observable';
import { of, from } from 'rxjs';
import { switchMap, catchError, } from "rxjs/operators";

const getProcuringEntitiesEpic = action$ => {
    return action$.pipe(
        ofType(types.GET_PROCURING_ENTITIES_START),
        switchMap(({payload}) => {
            return from(API.getProcuringEntities(payload)).pipe(
                switchMap(res => {
                    return of(actions.getProcuringEntitiesSuccess(res.data))
                }),
                catchError(error => of(actions.getProcuringEntitiesFailure(error)))
            )
        }
        ),
    )
}

const getProcuringEntityEpic = action$ => {
    return action$.pipe(
        ofType(types.GET_PROCURING_ENTITY_START),
        switchMap(({payload}) => {
            return from(API.getProcuringEntity(payload)).pipe(
                switchMap(res => {
                    return of(actions.getProcuringEntitySuccess(res.data))
                }),
                catchError(error => of(actions.getProcuringEntityFailure(error)))
            )
        }
        ),
    )
}

const deleteProcuringEntityEpic = action$ => {
    return action$.pipe(
        ofType(types.DELETE_PROCURING_ENTITY_START),
        switchMap(({ payload }) => {
            return from(API.deleteProcuringEntity(payload)).pipe(
                switchMap(res => {
                    return of(actions.deleteProcuringEntitySuccess(res), actions.getProcuringEntitiesStart())
                }),
            )
        }),
        catchError(error => of(actions.deleteProcuringEntityFailure(error)))
    );
}

const createProcuringEntityPic = action$ => {
    return action$.pipe(
        ofType(types.CREATE_PROCURING_ENTITY_START),
        switchMap(({ payload }) => {
            return from(API.createProcuringEntity(payload))
        }),
        switchMap(res => {
            return of(actions.createProcuringEntitySuccess(res), actions.getProcuringEntitiesStart())
        }),
        catchError(error => of(actions.createProcuringEntityFailure(error)))
    )
}

/**
 * @function
 * @name updateProcuringEntityPic
 * @param action$
 * @return action$
 */
const updateProcuringEntityPic = action$ => {
    return action$.pipe(
        ofType(types.UPDATE_PROCURING_ENTITY_START),
        switchMap(({ payload }) => {
            return from(API.updateProcuringEntity(payload.procuringEntity, payload.id)).pipe(
                switchMap(res => {
                    return of(actions.updateProcuringEntitySuccess(res), actions.getProcuringEntitiesStart())
                }),
            )
        }),
        catchError(error => of(actions.updateProcuringEntityFailure(error)))
    )
}


const getActorEpic = action$ => {
    return action$.pipe(
        ofType(types.GET_ACTORS_START),
        switchMap(() => {
            return from(API.getActors()).pipe(
                switchMap(res => {
                    return of(actions.getActorsSuccess(res.data))
                }),
                catchError(error => of(actions.getActorsFailure(error)))
            )
        }
        ),
    )
}

const getPackagesEpic = action$ => {
    return action$.pipe(
        ofType(types.GET_PACKAGES_START),
        switchMap(({payload}) => {
            return from(API.getPackages(payload)).pipe(
                switchMap(res => {
                    return of(actions.getPackagesSuccess(res.data))
                }),
                catchError(error => of(actions.getPackagesFailure(error)))
            )
        }
        ),
    )
}

const getPackageEpic = action$ => {
    return action$.pipe(
        ofType(types.GET_PACKAGE_START),
        switchMap(({payload}) => {
            return from(API.getPackage(payload)).pipe(
                switchMap(res => {
                    return of(actions.getPackageSuccess(res.data))
                }),
                catchError(error => of(actions.getPackageFailure(error)))
            )
        }
        ),
    )
}

const deletePackageEpic = action$ => {
    return action$.pipe(
        ofType(types.DELETE_PACKAGES_START),
        switchMap(({ payload }) => {
            return from(API.deletePackage(payload)).pipe(
                switchMap(res => {
                    return of(actions.deletePackageSuccess(res), actions.getPackagesStart())
                }),
            )
        }),
        catchError(error => of(actions.deletePackageFailure(error)))
    );
}


const createPackagePic = action$ => {
    return action$.pipe(
        ofType(types.CREATE_PACKAGE_START),
        switchMap(({ payload }) => {
            return from(API.createPackage(payload))
        }),
        switchMap(res => {
            return of(actions.createPackageSuccess(res), actions.getPackagesStart())
        }),
        catchError(error => of(actions.createPackageFailure(error)))
    )
}

/**
 * @function
 * @name updatePackagePic
 * @param action$
 * @return action$
 */
const updatePackagePic = action$ => {
    return action$.pipe(
        ofType(types.UPDATE_PACKAGE_START),
        switchMap(({ payload }) => {
            return from(API.updatePackage(payload.procuringEntity, payload.id)).pipe(
                switchMap(res => {
                    return of(actions.updatePackageSuccess(res), actions.getPackagesStart())
                }),
            )
        }),
        catchError(error => of(actions.updatePackageFailure(error)))
    )
}

const searchProcuringEpic = (action$, state$) => {
    return action$.pipe(
        ofType(types.SEARCH_PROCURING_ENTITY),
        switchMap(() => {
            const searchQuery  = {
                'filter[name]' : state$.value.resources.search.data
            }   
            return of(actions.getProcuringEntitiesStart(searchQuery ))
        }),
    )
};


export const procuringEntitiesEpic = combineEpics(
    getProcuringEntitiesEpic,
    deleteProcuringEntityEpic,
    createProcuringEntityPic,
    updateProcuringEntityPic,
    getProcuringEntityEpic,
    searchProcuringEpic,
    getActorEpic,
    getPackageEpic,
    getPackagesEpic,
    deletePackageEpic,
    createPackagePic,
    updatePackagePic
);
