/*  Projects Action creators */
import * as types from "./types";
import {makeActionCreator} from "../../../Util";

// action creator for fetching project
export function getProjectsStart(params={}) {
    return {
      type: types.GET_PROJECTS_START,
      payload: params,
    };
  }
  
  export function getProjectsSuccess(projects) {
    return {
      type: types.GET_PROJECTS_SUCCESS,
      payload:projects,
    };
  }
  
  export function getProjectsFailure(message) {
    return {
      type: types.GET_PROJECTS_FAILURE,
      message,
    };
  }
  
//  creating project
  export function createProjectStart(project) {
    return {
      type: types.CREATE_PROJECT_START,
      payload:project
    };
  }
  
  export function createProjectSuccess(project) {
    return {
      type: types.CREATE_PROJECT_SUCCESS,
      payload: project,
    };
  }
  
  export function createProjectFailure(error) {
    return {
      type: types.CREATE_PROJECT_FAILURE,
      payload: error,
    };
  }

  
export function openProjectForm() {
  return {
    type: types.OPEN_PROJECT_FORM,
  };
}

export function closeProjectForm() {
  return {
    type: types.CLOSE_PROJECT_FORM,
  };
}
  // export const updateProjectStart = makeActionCreator(types.UPDATE_PROJECT_START, 'payload');

  export function updateProjectStart(project,id) {
    return {
      type: types.UPDATE_PROJECT_START,
      payload: {
        project,
        id
      },
    };
  }
  
  export function updateProjectSuccess(project) {
    return {
      type: types.UPDATE_PROJECT_SUCCESS,
      payload: project,
    };
  }
  
  export function updateProjectFailure(error) {
    return {
      type: types.UPDATE_PROJECT_FAILURE,
      payload: error,
    };
  }
  
  // deleting Project
  export function deleteProjectStart(project_id) {
    return {
      type: types.DELETE_PROJECT_START,
      payload:project_id
    };
  }
  
  export function deleteProjectSuccess(project_id) {
    return {
      type: types.DELETE_PROJECT_SUCCESS,
      payload: project_id,
    };
  }
  
  export function deleteProjectFailure(error) {
    return {
      type: types.DELETE_PROJECT_FAILURE,
      payload: error,
    };
  }
  
  /*  Single Project Action creators */
  export function getProjectStart(id) {
    return {
        type: types.GET_PROJECT_START,
        payload: id,
    };
  }

  
  export function getProjectSuccess(data) {
    return {
        type: types.GET_PROJECT_SUCCESS,
        payload: data,
    };
  }
  
  export function getProjectFailure(error) {
    return {
        type: types.GET_PROJECT_FAILURE,
        payload: error,
    };
  }



  /*  Agencies Action creators */
  
  export function getRegionsStart() {
    return {
      type: types.GET_REGIONS_START,
    };
  }
  
  export function getRegionsSuccess(regions) {
    return {
      type: types.GET_REGIONS_SUCCESS,
      payload: regions,
    };
  }
  
  export function getRegionsFailure(error) {
    return {
      type: types.GET_REGIONS_FAILURE,
      payload: error,
    };
  }
  
  /*  Districts Action creators */
  
  export function getDistrictsStart(region_id) {
    return {
      type: types.GET_DISTRICTS_START,
      payload:region_id
    };
  }
  
  export function getDistrictsSuccess(districts) {
    return {
      type: types.GET_DISTRICTS_SUCCESS,
      payload: districts,
    };
  }
  
  export function getDistrictsFailure(error) {
    return {
      type: types.GET_DISTRICTS_FAILURE,
      payload: error,
    };
  }
   

// retrieve a single sub project element

/**
 * @function
 * @name getEnvironmentalCategoriesStart
 * @return {Object} action
 * */
export const getEnvironmentalCategoriesStart = makeActionCreator(types.GET_ENVIRONMENTAL_CATEGORIES_START);

/**
 * @function
 * @name getEnvironmentalCategoriesSuccess
 * @param {Object} payload environmental categories
 * @return {Object} action
 * */
export const getEnvironmentalCategoriesSuccess = makeActionCreator(types.GET_ENVIRONMENTAL_CATEGORIES_SUCCESS, 'payload');

/**
 * @function
 * @name getEnvironmentalCategoriesFailure
 * @param {Object} payload error  response
 * @return {Object} action
 * */
export const getEnvironmentalCategoriesFailure = makeActionCreator(types.GET_ENVIRONMENTAL_CATEGORIES_FAILURE, 'payload');


export const selectProject = (selected_project) => ({
  type: types.SELECT_PROJECT,
  payload: selected_project,
});

/**
 * @function
 * @name getLocationsStart
 * @param {String} payload the location
 */  
 export function getLocationsStart() {
  return {
    type: types.GET_LOCATIONS_START,
  };
}

/**
 * @function
 * @name getLocationsSuccess
 * @param {*} location 
 */
export function getLocationsSuccess(locations) {
  return {
    type: types.GET_LOCATIONS_SUCCESS,
    payload: locations,
  };
}

/**
 * @function
 * @name getLocationsFailure
 * @param {*} error 
 */
export function getLocationsFailure(error) {
  return {
    type: types.GET_PROJECTS_FAILURE,
    payload: error,
  };
}

/**
 * @function
 * @name createProjectLocationStart
 * @param {*} project_location 
 */
export function createProjectLocationStart(project_location) {
  return {
    type: types.CREATE_PROJECT_LOCATION_START,
    payload:project_location
  };
}

/**
 * @function
 * @name createProjectLocationSuccess
 * @param {*} project_location 
 */
export function createProjectLocationSuccess(project_location) {
  return {
    type: types.CREATE_PROJECT_LOCATION_SUCCESS,
    payload: project_location,
  };
}

/**
 * @function
 * @name createProjectLocationFailure
 * @param {*} error 
 */
export function createProjectLocationFailure(error) {
  return {
    type: types.CREATE_PROJECT_LOCATION_FAILURE,
    payload: error,
  };
}

/**
 * @function
 * @name getItemsStart
 * @return {Object} action
 * */
export const getItemsStart = makeActionCreator(types.GET_ITEMS_START);

/**
 * @function
 * @name getItemsSuccess
 * @param {Object} payload Items
 * @return {Object} action
 * */
export const getItemsSuccess = makeActionCreator(types.GET_ITEMS_SUCCESS, 'payload');

/**
 * @function
 * @name getItemsFailure
 * @param {Object} payload  Items failure response
 * @return {Object} action
 * */
export const getItemsFailure = makeActionCreator(types.GET_ITEMS_FAILURE, 'payload');


/**
 * @function
 * @name getProgressStart
 * @return {Object} action
 * */
export const getProgressStart = makeActionCreator(types.GET_PROGRESS_START);

/**
 * @function
 * @name getProgressSuccess
 * @param {Object} payload Progress
 * @return {Object} action
 * */
export const getProgressSuccess = makeActionCreator(types.GET_PROGRESS_SUCCESS, 'payload');

/**
 * @function
 * @name getProgressFailure
 * @param {Object} payload  Progress failure response
 * @return {Object} action
 * */
export const getProgressFailure = makeActionCreator(types.GET_PROJECTS_FAILURE, 'payload');

/**
 * @function
 * @name getProjectStatusStart
 * @param {Number} subProjectId
 * @return {Object} action
 * */
export const getProjectStatusStart = makeActionCreator(types.GET_PROJECT_STATUS_START, 'payload');

/**
 * @function
 * @name getProjectStatusSuccess
 * @param {Object} payload 
 * @return {Object} action
 * */
export const getProjectStatusSuccess = makeActionCreator(types.GET_PROJECT_STATUS_SUCCESS, 'payload');


/**
 * @function
 * @name getProjectStatusFailure
 * @param {Object} payload 
 * @return {Object} action
 * */
export const getProjectStatusFailure = makeActionCreator(types.GET_PROJECT_STATUS_FAILURE, 'payload');



// Project Filters action creators
/**
 * @function
 * @name setProjectStatusFilter
 * @param {Number} payload
 * @return {Object} action
 * */
export const setProjectStatusFilter = makeActionCreator(types.SET_PROJECT_STATUS_FILTER, 'payload');

/**
 * @function
 * @name setProjectIdFilter
 * @param {Object} payload 
 * @return {Object} action
 * */
export const setProjectIdFilter = makeActionCreator(types.SET_PROJECT_ID_FILTER, 'payload');

/**
 * @function
 * @name setProjectRegionsFilter
 * @param {Object} payload 
 * @return {Object} action
 * */
export const setProjectRegionsFilter = makeActionCreator(types.SET_PROJECT_REGIONS_FILTER, 'payload');

/**
 * @function
 * @name getProjectFilterStart
 * @return {Object} action
 * */
export const getProjectFilterStart = makeActionCreator(types.GET_PROJECTS_FILTER_START);

/**
 * @function
 * @name getProjectFilterSuccess
 * @param {Object} payload project
 * @return {Object} action
 * */
export const getProjectFilterSuccess = makeActionCreator(types.GET_PROJECTS_FILTER_SUCCESS, 'payload');

/**
 * @function
 * @name getProjectFilterFailure
 * @param {Object} payload project failure response
 * @return {Object} action
 * */
export const getProjectFilterFailure = makeActionCreator(types.GET_PROJECTS_FILTER_FAILURE, 'payload');

/**
 * @function
 * @name searchProjects
 * @param {Object} payload project response
 * @return {Object} action
 * */
export const searchProjects = makeActionCreator(types.SEARCH_PROJECTS, 'payload');

/**
 * @function
 * @name getLayersStart
 * @return {Object} action
 * */
export const getLayersStart = makeActionCreator(types.GET_LAYERS_START);

/**
 * @function
 * @name getLayersSuccess
 * @param {Object} payload layers
 * @return {Object} action
 * */
export const getLayersSuccess = makeActionCreator(types.GET_LAYERS_SUCCESS, 'payload');

/**
 * @function
 * @name getLayersFailure
 * @param {Object} payload layers failure response
 * @return {Object} action
 * */
export const getLayersFailure = makeActionCreator(types.GET_LAYERS_FAILURE, 'payload');

/**
 * @function
 * @name createProjectComponentStart
 * @return {Object} action
 * */
export const createProjectComponentStart = makeActionCreator(types.CREATE_PROJECT_COMPONENT_START, 'payload');

/**
 * @function
 * @name createProjectComponentSuccess
 * @param {Object} payload 
 * @return {Object} action
 * */
export const createProjectComponentSuccess = makeActionCreator(types.CREATE_PROJECT_COMPONENT_SUCCESS, 'payload');

/**
 * @function
 * @name createProjectComponentFailure
 * @param {Object} payload failure response
 * @return {Object} action
 * */
export const createProjectComponentFailure = makeActionCreator(types.CREATE_PROJECT_COMPONENT_FAILURE, 'payload');

/**
 * @function
 * @name createProjectSubComponentStart
 * @return {Object} action
 * */
export const createProjectSubComponentStart = makeActionCreator(types.CREATE_PROJECT_SUB_COMPONENT_START, 'payload');

/**
 * @function
 * @name createProjectSubComponentSuccess
 * @param {Object} payload
 * @return {Object} action
 * */
export const createProjectSubComponentSuccess = makeActionCreator(types.CREATE_PROJECT_SUB_COMPONENT_SUCCESS, 'payload');

/**
 * @function
 * @name createProjectSubComponentFailure
 * @param {Object} payload failure response
 * @return {Object} action
 * */
export const createProjectSubComponentFailure = makeActionCreator(types.CREATE_PROJECT_SUB_COMPONENT_FAILURE, 'payload');

/**
 * @function
 * @name openProjectComponentForm
 * @return {Object} action
 * */
export const openProjectComponentForm = makeActionCreator(types.OPEN_PROJECT_COMPONENT_FORM);

/**
 * @function
 * @name closeProjectComponentForm
 * @return {Object} action
 * */
export const closeProjectComponentForm = makeActionCreator(types.CLOSE_PROJECT_COMPONENT_FORM);

/**
 * @function
 * @name openProjectSubComponentForm
 * @return {Object} action
 * */
export const openProjectSubComponentForm = makeActionCreator(types.OPEN_PROJECT_SUB_COMPONENT_FORM);

/**
 * @function
 * @name closeProjectSubComponentForm
 * @return {Object} action
 * */
export const closeProjectSubComponentForm = makeActionCreator(types.CLOSE_PROJECT_SUB_COMPONENT_FORM);


/**
 * @function
 * @name getProjectSubComponentStart
 * @return {Object} action
 * */
export const getProjectSubComponentStart = makeActionCreator(types.GET_PROJECT_SUB_COMPONENTS_START);

/**
 * @function
 * @name getProjectSubComponentSuccess
 * @param {Object} payload ProjectSubComponent
 * @return {Object} action
 * */
export const getProjectSubComponentSuccess = makeActionCreator(types.GET_PROJECT_SUB_COMPONENTS_SUCCESS, 'payload');

/**
 * @function
 * @name getProjectSubComponentFailure
 * @param {Object} payload  ProjectSubComponent failure response
 * @return {Object} action
 * */
export const getProjectSubComponentFailure = makeActionCreator(types.GET_PROJECT_SUB_COMPONENTS_FAILURE, 'payload');
