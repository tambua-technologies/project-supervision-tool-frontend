/*  ProcuringEntitys Action creators */
import * as types from "./types";
import { makeActionCreator } from "../../../Util";

/**
 * @const
 * @name getProcuringEntitiesStart
 * @return {Object} action
 * */
export const getProcuringEntitiesStart = makeActionCreator(types.GET_PROCURING_ENTITIES_START, 'payload');

/**
 * @const
 * @name getProcuringEntitiesSuccess
 * @param {Object} payload procuringEntity
 * @return {Object} action
 * */
export const getProcuringEntitiesSuccess = makeActionCreator(types.GET_PROCURING_ENTITIES_SUCCESS, 'payload');

/**
 * @const
 * @name getProcuringEntitiesFailure
 * @param {Object} payload procuringEntity failure response
 * @return {Object} action
 * */
export const getProcuringEntitiesFailure = makeActionCreator(types.GET_PROCURING_ENTITIES_FAILURE, 'payload');


/**
 * @const
 * @name deleteProcuringEntityStart
 * @return {Object} action
 * */
export const deleteProcuringEntityStart = makeActionCreator(types.DELETE_PROCURING_ENTITY_START, 'payload');

/**
 * @const
 * @name deleteProcuringEntitySuccess
 * @param {Object} payload procuringEntity
 * @return {Object} action
 * */
export const deleteProcuringEntitySuccess = makeActionCreator(types.DELETE_PROCURING_ENTITY_SUCCESS, 'payload');

/**
 * @const
 * @name deleteProcuringEntityFailure
 * @param {Object} payload procuringEntity failure response
 * @return {Object} action
 * */
export const deleteProcuringEntityFailure = makeActionCreator(types.DELETE_PROCURING_ENTITY_FAILURE, 'payload');

/**
 * @const
 * @name createProcuringEntityStart
 * @return {Object} action
 * */
export const createProcuringEntityStart = makeActionCreator(types.CREATE_PROCURING_ENTITY_START, 'payload');

/**
 * @const
 * @name createProcuringEntitySuccess
 * @param {Object} payload 
 * @return {Object} action
 * */
export const createProcuringEntitySuccess = makeActionCreator(types.CREATE_PROCURING_ENTITY_SUCCESS, 'payload');

/**
 * @const
 * @name createProcuringEntityFailure
 * @param {Object} payload failure response
 * @return {Object} action
 * */
export const createProcuringEntityFailure = makeActionCreator(types.CREATE_PROCURING_ENTITY_FAILURE, 'payload');

/**
 * @const
 * @name selectProcuringEntity
 * @param {Object} payload failure response
 * @return {Object} action
 * */
export const selectProcuringEntity = makeActionCreator(types.SELECT_PROCURING_ENTITY, 'payload');

/**
 * @const
 * @name openProcuringEntityForm
 * @param {Object} payload failure response
 * @return {Object} action
 * */
export const openProcuringEntityForm = makeActionCreator(types.OPEN_PROCURING_ENTITY);

/**
 * @const
 * @name closeProcuringEntityForm
 * @param {Object} payload failure response
 * @return {Object} action
 * */
export const closeProcuringEntityForm = makeActionCreator(types.CLOSE_PROCURING_ENTITY);
/**
 * @const
 * @name updateProcuringEntityStart
 * @param {Object} payload failure response
 * @return {Object} action
 * */

export function updateProcuringEntityStart(procuringEntity, id) {
  return {
    type: types.UPDATE_PROCURING_ENTITY_START,
    payload: {
      procuringEntity,
      id
    },
  };
}
/**
 * @const
 * @name updateProcuringEntitySuccess
 * @param {Object} payload failure response
 * @return {Object} action
 * */
export const updateProcuringEntitySuccess = makeActionCreator(types.UPDATE_PROCURING_ENTITY_SUCCESS, 'payload');

/**
* @const
* @name updateProcuringEntityFailure
* @param {Object} payload failure response
* @return {Object} action
* */
export const updateProcuringEntityFailure = makeActionCreator(types.UPDATE_PROCURING_ENTITY_FAILURE, 'payload');


/**
 * @const
 * @name getActorsStart
 * @return {Object} action
 * */
export const getActorsStart = makeActionCreator(types.GET_ACTORS_START, 'payload');

/**
 * @const
 * @name getActorsSuccess
 * @param {Object} payload actor
 * @return {Object} action
 * */
export const getActorsSuccess = makeActionCreator(types.GET_ACTORS_SUCCESS, 'payload');

/**
 * @const
 * @name getActorsFailure
 * @param {Object} payload actor failure response
 * @return {Object} action
 * */
export const getActorsFailure = makeActionCreator(types.GET_ACTORS_FAILURE, 'payload');


/**
 * @const
 * @name getProcuringEntityStart
 * @return {Object} action
 * */
export const getProcuringEntityStart = makeActionCreator(types.GET_PROCURING_ENTITY_START, 'payload');

/**
 * @const
 * @name getProcuringEntitySuccess
 * @param {Object} payload procuringEntity
 * @return {Object} action
 * */
export const getProcuringEntitySuccess = makeActionCreator(types.GET_PROCURING_ENTITY_SUCCESS, 'payload');

/**
 * @function
 * @name searchProcuring
 * @param {Object} payload project response
 * @return {Object} action
 * */
 export const searchProcuring = makeActionCreator(types.SEARCH_PROCURING_ENTITY, 'payload');


/**
 * @const
 * @name getProcuringEntityFailure
 * @param {Object} payload procuringEntity failure response
 * @return {Object} action
 * */
export const getProcuringEntityFailure = makeActionCreator(types.GET_PROCURING_ENTITY_FAILURE, 'payload');

/**
 * @const
 * @name getPackagesStart
 * @return {Object} action
 * */
export const getPackagesStart = makeActionCreator(types.GET_PACKAGES_START, 'payload');

/**
 * @const
 * @name getPackagesSuccess
 * @param {Object} payload package
 * @return {Object} action
 * */
export const getPackagesSuccess = makeActionCreator(types.GET_PACKAGES_SUCCESS, 'payload');

/**
 * @const
 * @name getPackagesFailure
 * @param {Object} payload package failure response
 * @return {Object} action
 * */
export const getPackagesFailure = makeActionCreator(types.GET_PACKAGES_FAILURE, 'payload');

/**
 * @const
 * @name getPackageStart
 * @return {Object} action
 * */
export const getPackageStart = makeActionCreator(types.GET_PACKAGE_START, 'payload');

/**
 * @const
 * @name getPackageSuccess
 * @param {Object} payload package
 * @return {Object} action
 * */
export const getPackageSuccess = makeActionCreator(types.GET_PACKAGE_SUCCESS, 'payload');

/**
 * @const
 * @name getPackageFailure
 * @param {Object} payload package failure response
 * @return {Object} action
 * */
export const getPackageFailure = makeActionCreator(types.GET_PACKAGE_FAILURE, 'payload');


/**
 * @const
 * @name deletePackageStart
 * @return {Object} action
 * */
export const deletePackageStart = makeActionCreator(types.DELETE_PACKAGES_START, 'payload');

/**
 * @const
 * @name deletePackageSuccess
 * @param {Object} payload PACKAGE
 * @return {Object} action
 * */
export const deletePackageSuccess = makeActionCreator(types.DELETE_PACKAGES_SUCCESS, 'payload');

/**
 * @const
 * @name deletePackageFailure
 * @param {Object} payload failure response
 * @return {Object} action
 * */
export const deletePackageFailure = makeActionCreator(types.DELETE_PACKAGES_FAILURE, 'payload');

/**
 * @const
 * @name createPackageStart
 * @return {Object} action
 * */
export const createPackageStart = makeActionCreator(types.CREATE_PACKAGE_START, 'payload');

/**
 * @const
 * @name createPackageSuccess
 * @param {Object} payload 
 * @return {Object} action
 * */
export const createPackageSuccess = makeActionCreator(types.CREATE_PACKAGE_SUCCESS, 'payload');

/**
 * @const
 * @name createPackageFailure
 * @param {Object} payload failure response
 * @return {Object} action
 * */
export const createPackageFailure = makeActionCreator(types.CREATE_PACKAGE_FAILURE, 'payload');

/**
 * @const
 * @name selectPackage
 * @param {Object} payload failure response
 * @return {Object} action
 * */
export const selectPackage = makeActionCreator(types.SELECT_PACKAGE, 'payload');

/**
 * @const
 * @name openPackageForm
 * @param {Object} payload failure response
 * @return {Object} action
 * */
export const openPackageForm = makeActionCreator(types.OPEN_PACKAGE);

/**
 * @const
 * @name closePackageForm
 * @param {Object} payload failure response
 * @return {Object} action
 * */
export const closePackageForm = makeActionCreator(types.CLOSE_PACKAGE);
/**
 * @const
 * @name updatePackageStart
 * @param {Object} payload failure response
 * @return {Object} action
 * */

export function updatePackageStart(procuringEntity, id) {
  return {
    type: types.UPDATE_PACKAGE_START,
    payload: {
      procuringEntity,
      id
    },
  };
}
/**
 * @const
 * @name updatePackageSuccess
 * @param {Object} payload failure response
 * @return {Object} action
 * */
export const updatePackageSuccess = makeActionCreator(types.UPDATE_PACKAGE_SUCCESS, 'payload');

/**
* @const
* @name updatePackageFailure
* @param {Object} payload failure response
* @return {Object} action
* */
export const updatePackageFailure = makeActionCreator(types.UPDATE_PACKAGE_FAILURE, 'payload');

