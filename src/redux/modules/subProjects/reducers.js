
import * as types from "./types";
import { combineReducers } from "redux";

const defaultSubProjects = {
  data: [],
  total: null,
  loading: false,
  error: null,
  showForm: false,
  posting: false,
  page: null,
  sub_project: {},
};


const subProjectState = {
  data: null,
  error: null,
  loading: false,
  showForm: false,
  showCreateSurveyForm: false,
  showSurveyForm: false,
  posting: false
};

/**
* @function
* @name subProjects
* @description reducer that manages sub project instance
* @param {Object} state
* @param {Object} action
* @return {Object} updated state
*/
const subProjects = (state = defaultSubProjects, action) => {
  switch (action.type) {
    case types.GET_SUB_PROJECTS_START:
      return { ...state, loading: true, page: 1, total: 0 }
    case types.GET_SUB_PROJECTS_SUCCESS:
      return {
        ...state, data: action.payload.data, loading: false, total: action.payload.meta.total,
        page: action.payload.meta.current_page, 
      }
    case types.GET_SUB_PROJECTS_FAILURE:
      return { ...state, error: action.message, loading: false, page: 1, total: 0 };
    case types.UPDATE_SUB_PROJECT_START:
      return { ...state, loading: true, showForm: true };
    case types.UPDATE_SUB_PROJECT_SUCCESS:
      return { ...state, data: action.payload, loading: false, showForm: false };
    case types.UPDATE_SUB_PROJECT_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

const selectedSubProject = (state = null, action) => {
  switch (action.type) {
    case types.SELECTED_SUB_PROJECT:
      return action.payload
    default:
      return state
  }
}
/**
 * @function
 * @name sub_project_items
 * @description reducer that manages sub projects Items
 * @param {Object} state
 * @param {Object} action
 * @return {Object} updated state
 */
const sub_project_items = (state = { data: [], error: null, loading: false, showForm: false }, action) => {
  switch (action.type) {
    case types.GET_SUB_PROJECT_ITEMS_START:
      return { ...state, loading: true }
    case types.GET_SUB_PROJECT_ITEMS_SUCCESS:
      return { ...state, data: action.payload, loading: false, }
    case types.GET_SUB_PROJECT_ITEMS_FAILURE:
      return { ...state, error: action.message, loading: false };
    case types.OPEN_FORM:
      return { ...state, showForm: true };
    case types.CLOSE_FORM:
      return { ...state, showForm: false };
    case types.CREATE_SUB_PROJECT_ITEM_START:
      return { ...state, loading: true };
    case types.CREATE_SUB_PROJECT_ITEM_SUCCESS:
      return { ...state, data: action.payload, loading: false, showForm: false };
    case types.CREATE_SUB_PROJECT_ITEM_FAILURE:
      return { ...state, error: action.payload, loading: false, showForm: false }
    default:
      return state;
  }
};


/**
 * @function
 * @name sub_project_items
 * @description reducer that manages sub projects Items
 * @param {Object} state
 * @param {Object} action
 * @return {Object} updated state
 */
const sub_project_equipments = (state = { data: [], error: null, loading: false }, action) => {
  switch (action.type) {
    case types.GET_SUB_PROJECT_EQUIPMENTS_START:
      return { ...state, loading: true }
    case types.GET_SUB_PROJECT_EQUIPMENTS_SUCCESS:
      return { ...state, data: action.payload, loading: false, }
    case types.GET_SUB_PROJECT_EQUIPMENTS_FAILURE:
      return { ...state, error: action.message, loading: false };
    default:
      return state;
  }
};

/**
 * @function
 * @name subProject
 * @description reducer that manages sub project instance
 * @param {Object} state
 * @param {Object} action
 * @return {Object} updated state
 */
 const subProject = (state = subProjectState, action) => {
  switch (action.type) {
      case types.GET_SUB_PROJECT_START:
          return { ...state, loading: true };
      case types.OPEN_SUB_PROJECT_FORM:
          return { ...state, showForm: true };
      case types.OPEN_SUB_PROJECT_SURVEY_FORM:
          return { ...state, showCreateSurveyForm: true };
      case types.OPEN_SURVEY_FORM:
          return { ...state, showSurveyForm: true };
      case types.CLOSE_SUB_PROJECT_FORM:
          return { ...state, showForm: false };
      case types.CLOSE_SUB_PROJECT_SURVEY_FORM:
          return { ...state, showCreateSurveyForm: false };
      case types.CLOSE_SURVEY_FORM:
          return { ...state, showSurveyForm: false };
      case types.GET_SUB_PROJECT_SUCCESS:
          return { ...state, data: action.payload, loading: false };
      case types.CREATE_SUB_PROJECT_SUCCESS:
          return { ...state, data: action.payload, loading: false };
      case types.GET_SUB_PROJECT_FAILURE:
          return { ...state, error: action.payload, loading: false };
      case types.CLEAR_SUB_PROJECT:
          return { ...state, data: null };
      default:
          return state;
  }
}


/**
 * @function
 * @name sub_projects
 * @description reducer that manages sub projects
 * @param {Object} state
 * @param {Object} action
 * @return {Object} updated state
 */
 const sub_projects = (state = defaultSubProjects, action) => {
  switch (action.type) {
      case types.DELETE_SUB_PROJECT_START:
          return { ...state };
      case types.DELETE_SUB_PROJECT_SUCCESS:
          return { ...state, sub_project: action.payload };
      case types.DELETE_SUB_PROJECT_FAILURE:
          return { ...state, error: action.payload };
      default:
          return state;
  }
};


/**
 * @function
 * @name subProjectElement
 * @description reducer that manages sub project element instance
 * @param {Object} state
 * @param {Object} action
 * @return {Object} updated state
 */
 const subProjectElement = (state = { data: null, error: null, loading: false }, action) => {
  switch (action.type) {
      case types.GET_SUB_PROJECT_ELEMENT_START:
          return { ...state, loading: true };
      case types.GET_SUB_PROJECT_ELEMENT_SUCCESS:
          return { ...state, data: action.payload, loading: false };
      case types.GET_SUB_PROJECT_ELEMENT_FAILURE:
          return { ...state, error: action.payload, loading: false };
      case types.CLEAR_SUB_PROJECT_ELEMENT:
          return { ...state, data: null };
      default:
          return state;
  }
}


export const subProjectResources = combineReducers({
  sub_project_items,
  sub_project_equipments,
  subProjects,
  subProject,
  selectedSubProject,
  sub_projects,
  subProjectElement

})
