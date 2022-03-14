
import { makeActionCreator } from '../../../Util';
import * as types from './types'

//  SubProjects
export function getSubProjectsStart(params) {
  return {
    type: types.GET_SUB_PROJECTS_START,
    payload:params
  };
}

export function getSubProjectsSuccess(sub_projects) {
  return {
    type: types.GET_SUB_PROJECTS_SUCCESS,
    payload:sub_projects,
  };
}

export function getSubProjectsFailure(message) {
  return {
    type: types.GET_SUB_PROJECTS_FAILURE,
    message,
  };
}

/**
 * @function
 * @name getSubProjectItemsStart
 * @return {Object} action
 * */
export const getSubProjectItemsStart = makeActionCreator(types.GET_SUB_PROJECT_ITEMS_START);

/**
 * @function
 * @name getSubProjectItemsSuccess
 * @param {Object} payload sub project Items
 * @return {Object} action
 * */
export const getSubProjectItemsSuccess = makeActionCreator(types.GET_SUB_PROJECT_ITEMS_SUCCESS, 'payload');

/**
 * @function
 * @name getSubProjectItemsFailure
 * @param {Object} payload sub project Items failure response
 * @return {Object} action
 * */
export const getSubProjectItemsFailure = makeActionCreator(types.GET_SUB_PROJECT_ITEMS_FAILURE, 'payload');

/**
 * @function
 * @name createSubProjectItemStart
 * @param {*} item 
 */
export function createSubProjectItemStart(item) {
  return {
    type: types.CREATE_SUB_PROJECT_ITEM_START,
    payload: item
  };
}

/**
 * @function
 * @name createSubProjectItemSuccess
 * @param {*} item 
 */
export function createSubProjectItemSuccess(item) {
  return {
    type: types.CREATE_SUB_PROJECT_ITEM_SUCCESS,
    payload: item,
  };
}

/**
 * @function
 * @name createSubProjectItemFailure
 * @param {*} error 
 */
export function createSubProjectItemFailure(error) {
  return {
    type: types.CREATE_SUB_PROJECT_ITEM_FAILURE,
    payload: error,
  };
}


/**
 * @function
 * @name getSubProjectEquipmentsStart
 * @return {Object} action
 * */
export const getSubProjectEquipmentsStart = makeActionCreator(types.GET_SUB_PROJECT_EQUIPMENTS_START);

/**
 * @function
 * @name getSubProjectEquipmentsSuccess
 * @param {Object} payload sub project Equipments
 * @return {Object} action
 * */
export const getSubProjectEquipmentsSuccess = makeActionCreator(types.GET_SUB_PROJECT_EQUIPMENTS_SUCCESS, 'payload');

/**
 * @function
 * @name getSubProjectEquipmentsFailure
 * @param {Object} payload sub project Equipments failure response
 * @return {Object} action
 * */
export const getSubProjectEquipmentsFailure = makeActionCreator(types.GET_SUB_PROJECT_EQUIPMENTS_FAILURE, 'payload');

/**
 * @function
 * @name openForm
 * @return {Object} action
 * */
export const openForm = makeActionCreator(types.OPEN_FORM);

/**
 * @function
 * @name closeForm
 * @return {Object} action
 * */
export const closeForm = makeActionCreator(types.CLOSE_FORM);


/**
 * @function
 * @name selectedSubProject
 * @returns {Object} action
 */
export const selectedSubProject = makeActionCreator(types.SELECTED_SUB_PROJECT, 'payload');

/**
 * @function
 * @name updateSubProjectStart
 * @param {*} subproject 
 */
export function updateSubProjectStart(subproject) {
  return {
    type: types.UPDATE_SUB_PROJECT_START,
    payload: subproject
  };
}

/**
 * @function
 * @name updateSubProjectSuccess
 * @param {*} subproject 
 */
export function updateSubProjectSuccess(subproject) {
  return {
    type: types.UPDATE_SUB_PROJECT_SUCCESS,
    payload: subproject,
  };
}

/**
 * @function
 * @name updateSubProjectFailure
 * @param {*} error 
 */
export function updateSubProjectFailure(error) {
  return {
    type: types.UPDATE_SUB_PROJECT_FAILURE,
    payload: error,
  };
}


export function createSubProjectStart(payload) {
  return {
    type: types.CREATE_SUB_PROJECT_START,
    payload
  };
}

export function createSubProjectSuccess(sub_project) {
  return {
    type: types.CREATE_SUB_PROJECT_SUCCESS,
    payload: sub_project,
  };
}

export function createSubProjectFailure(error) {
  return {
    type: types.CREATE_SUB_PROJECT_FAILURE,
    payload: error,
  };
}


// deleting 
export function deleteSubProjectStart(project_id) {
  return {
    type: types.DELETE_SUB_PROJECT_START,
    payload:project_id
  };
}

export function deleteSubProjectSuccess(sub_project_id) {
  return {
    type: types.DELETE_SUB_PROJECT_SUCCESS,
    payload: sub_project_id,
  };
}

export function deleteSubProjectFailure(error) {
  return {
    type: types.DELETE_SUB_PROJECT_FAILURE,
    payload: error,
  };
}

/**
 * @function
 * @name uploadPhotoStart
 * @return {Object} action
 * */
export const uploadPhotoStart = makeActionCreator(types.UPLOAD_PHOTO_START, 'payload');

/**
 * @function
 * @name uploadPhotoSuccess
 * @param {Object} payload Progress
 * @return {Object} action
 * */
export const uploadPhotoSuccess = makeActionCreator(types.UPLOAD_PHOTO_SUCCESS, 'payload');

/**
 * @function
 * @name uploadPhotoFailure
 * @param {Object} payload  Progress failure response
 * @return {Object} action
 * */
export const uploadPhotoFailure = makeActionCreator(types.UPLOAD_PHOTO_FAILURE, 'payload');


/**
 * @function
 * @name clearSubProject
 * @return {Object} action
 */
 export const clearSubProject = makeActionCreator(types.CLEAR_SUB_PROJECT);


// retrieve a single sub project

/**
 * @function
 * @name getSubProjectStart
 * @param {Number} subProjectId
 * @return {Object} action
 * */
export const getSubProjectStart = makeActionCreator(types.GET_SUB_PROJECT_START, 'payload');

/**
 * @function
 * @name getSubProjectSuccess
 * @param {Object} payload sub project
 * @return {Object} action
 * */
export const getSubProjectSuccess = makeActionCreator(types.GET_SUB_PROJECT_SUCCESS, 'payload');

/**
 * @function
 * @name getSubProjectFailure
 * @param {Object} payload sub project failure response
 * @return {Object} action
 * */
export const getSubProjectFailure = makeActionCreator(types.GET_SUB_PROJECT_FAILURE, 'payload');


/**
 * @function
 * @name openSubProjectForm
 * @return {Object} action
 * */
export const openSubProjectForm = makeActionCreator(types.OPEN_SUB_PROJECT_FORM);


/**
 * @function
 * @name openSubProjectSurveyForm
 * @return {Object} action
 * */
export const openSubProjectSurveyForm = makeActionCreator(types.OPEN_SUB_PROJECT_SURVEY_FORM);

/**
 * @function
 * @name openSurveyForm
 * @return {Object} action
 * */
export const openSurveyForm = makeActionCreator(types.OPEN_SURVEY_FORM);

/**
 * @function
 * @name closeSurveyForm
 * @return {Object} action
 * */
export const closeSurveyForm = makeActionCreator(types.CLOSE_SURVEY_FORM);

/**
 * @function
 * @name closeSubProjectForm
 * @return {Object} action
 * */
export const closeSubProjectForm = makeActionCreator(types.CLOSE_SUB_PROJECT_FORM);

/**
 * @function
 * @name closeSubProjectSurveyForm
 * @return {Object} action
 * */
export const closeSubProjectSurveyForm = makeActionCreator(types.CLOSE_SUB_PROJECT_SURVEY_FORM);

// retrieve a single sub project element

/**
 * @function
 * @name getSubProjectElementStart
 * @param {Number} subProjectElementId
 * @return {Object} action
 * */
 export const getSubProjectElementStart = makeActionCreator(types.GET_SUB_PROJECT_ELEMENT_START, 'payload');

 /**
  * @function
  * @name getSubProjectElementSuccess
  * @param {Object} payload sub project element
  * @return {Object} action
  * */
 export const getSubProjectElementSuccess = makeActionCreator(types.GET_SUB_PROJECT_ELEMENT_SUCCESS, 'payload');
 
 /**
  * @function
  * @name getSubProjectElementFailure
  * @param {Object} payload sub project element failure response
  * @return {Object} action
  * */
 export const getSubProjectElementFailure = makeActionCreator(types.GET_SUB_PROJECT_ELEMENT_FAILURE, 'payload');
 
 
 /**
  * @function
  * @name clearSubProjectElement
  * @return {Object} action
  */
 export const clearSubProjectElement = makeActionCreator(types.CLEAR_SUB_PROJECT_ELEMENT);
 