import * as types from "./types";
import { combineReducers } from "redux";


const selectedInitialState = { data: null, error: null, loading: false };
const sideNavMenuInitialState = {
    showNationalOverview: true,
    showSubProjectOverview: true,
    showRegionalOverview: false,
}

/**
 * @function
 * @name all
 * @description reducer that manages selected sub project instance on map
 * @param {Object} state
 * @param {Object} action
 * @return {Object} updated state
 */
const all = (state = { data: [], error: null, loading: false }, action) => {
    switch (action.type) {
        case types.GET_SUB_PROJECTS_START:
            return { ...state, loading: true };
        case types.GET_SUB_PROJECTS_SUCCESS:
            return { ...state, data: action.payload, loading: false };
        case types.GET_SUB_PROJECTS_FAILURE:
            return { ...state, error: action.payload, loading: false };
        case types.CLEAR_SUB_PROJECTS:
            return { ...state, data: null };
        default:
            return state;
    }
}

/**
 * @function
 * @name subProject
 * @description reducer that manages selected sub project instance on map
 * @param {Object} state
 * @param {Object} action
 * @return {Object} updated state
 */
const selected = (state = selectedInitialState, action) => {
    switch (action.type) {
        case types.GET_SUB_PROJECT_START:
            return { ...state, loading: true };
        case types.GET_SUB_PROJECT_SUCCESS:
            return { ...state, data: action.payload, loading: false };
        case types.GET_SUB_PROJECT_FAILURE:
            return { ...state, error: action.payload, loading: false };
        case types.CLEAR_SUB_PROJECT:
            return { ...state, data: null };
        default:
            return state;
    }
}

const subProjectsStatistics = (state = { data: null, loading: false, error: null }, action) => {
    switch (action.type) {
        case types.GET_SUB_PROJECT_STATISTICS_START:
            return { ...state, loading: true };
        case types.GET_SUB_PROJECT_STATISTICS_SUCCESS:
            return { ...state, data: action.payload, loading: false };
        case types.CLEAR_SUB_PROJECTS_STATISTICS:
            return { ...state, data: null };
        case types.GET_SUB_PROJECT_STATISTICS_FAILURE:
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};

const subProjectOverview = (state = {
    dataoverview: []
}, action) => {
    switch (action.type) {
        case types.GET_SUB_PROJECTS_OVERVIEW_START:
            return { ...state }
        case types.GET_SUB_PROJECTS_OVERVIEW_SUCCESS:
            return { ...state, dataoverview: action.payload };
        case types.CLEAR_SUB_PROJECTS_OVERVIEW:
            return { ...state, dataoverview: [] };
        case types.GET_SUB_PROJECTS_OVERVIEW_FAILURE:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

const regionSubProjects = (state = { data: [], error: null }, action) => {
    switch (action.type) {
        case types.GET_SUB_PROJECTS_REGIONS_OVERVIEW_SUCCESS:
            return { ...state, data: action.payload };
        case types.GET_SUB_PROJECTS_REGIONS_OVERVIEW_FAILURE:
            return { ...state, error: action.payload };
        case types.CLEAR_SUB_PROJECTS_REGIONS_OVERVIEW:
            return { ...state, data: [] };
        default:
            return state;
    }
};



const regionSubProjectsStatistics = (state = { data: null, loading: false, error: null }, action) => {
    switch (action.type) {
        case types.GET_REGION_SUB_PROJECT_STATISTICS_START:
            return { ...state, loading: true };
        case types.GET_REGION_SUB_PROJECT_STATISTICS_SUCCESS:
            return { ...state, data: action.payload, loading: false };
        case types.CLEAR_REGION_SUB_PROJECTS_STATISTICS:
            return { ...state, data: null };
        case types.GET_REGION_SUB_PROJECT_STATISTICS_FAILURE:
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};

/**
 * @function
 * @name sideNavMenu
 * @description reducer that manages UI state of sideNavMenu
 */
const sideNavMenu = (state = sideNavMenuInitialState, action) => {
    switch (action.type) {
        case types.SHOW_NATIONAL_SUB_PROJECTS_OVERVIEW:
            return { ...state, showNationalOverview: action.payload };
        case types.SHOW_SUB_PROJECTS_OVERVIEW:
            return { ...state, showSubProjectOverview: action.payload }
        case types.SHOW_REGIONAL_SUB_PROJECTS_OVERVIEW:
            return { ...state, showRegionalOverview: action.payload };
        case types.SHOW_DISTRICTS_SUB_PROJECTS_OVERVIEW:
            return { ...state, showDistrictsOverview: action.payload };
        default:
            return state;
    }
};

const districtsSubProjects = (state = { data: [], error: null, loading: false }, action) => {
    switch (action.type) {
        case types.GET_DISRTRICTS_SUB_PROJECTS_OVERVIEW_START:
            return { ...state, loading: true };
        case types.GET_DISRTRICTS_SUB_PROJECTS_OVERVIEW_SUCCESS:
            return { ...state, data: action.payload, loading: false };
        case types.GET_DISRTRICTS_SUB_PROJECTS_OVERVIEW_FAILURE:
            return { ...state, error: action.payload, loading: false };
        case types.CLEAR_DISRTRICTS_SUB_PROJECTS_OVERVIEW:
            return { ...state, data: [] };
        default:
            return state;
    }
};

const districts = (state = { data: [], error: null }, action) => {
    switch (action.type) {
        case types.GET_DISTRICTS_SUCCESS:
            return { ...state, data: action.payload };
        case types.GET_DISTRICTS_FAILURE:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

const subProjectStatus = (state = { data: [], error: null }, action) => {
    switch (action.type) {
        case types.GET_SUB_PROJECT_STATUS_START:
            return { ...state };
        case types.GET_SUB_PROJECT_STATUS_SUCCESS:
            return { ...state, data: action.payload };
        case types.GET_SUB_PROJECT_STATUS_FAILURE:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

const subProjectTypes = (state = { data: [], error: null }, action) => {
    switch (action.type) {
        case types.GET_SUB_PROJECT_TYPES_START:
            return { ...state };
        case types.GET_SUB_PROJECT_TYPES_SUCCESS:
            return { ...state, data: action.payload };
        case types.GET_SUB_PROJECT_TYPES_FAILURE:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

const contractors = (state = { data: [], error: null }, action) => {
    switch (action.type) {
        case types.GET_CONTRACTORS_START:
            return { ...state };
        case types.GET_CONTRACTORS_SUCCESS:
            return { ...state, data: action.payload };
        case types.GET_CONTRACTORS_FAILURE:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

const procuringEntityPackage = (state = { data: [], error: null }, action) => {
    switch (action.type) {
        case types.GET_PROCURING_ENTITY_PACKAGE_START:
            return { ...state };
        case types.GET_PROCURING_ENTITY_PACKAGE_SUCCESS:
            return { ...state, data: action.payload };
        case types.GET_PROCURING_ENTITY_PACKAGE_FAILURE:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

const subProjectFilter = {
    'filter[sub_project_status_id]': '',
    'filter[sub_project_type_id]': '',
    'filter[districts.id]': '',
    'filter[districts.region_id]': '',
    'filter[procuringEntityPackage.procuringEntity.project_sub_component_id]': '',
    'filter[procuringEntityPackage.contract.contractor_id]': '',
    'filter[procuring_entity_package_id]': '',
    'filter[project_id]': ''
};

/**
 * @function
 * @name filters
 * @description reducer that manages sub project filter state
 */
const filters = (state = subProjectFilter, action) => {
    switch (action.type) {
        case types.SET_SUB_PROJECT_TYPES_FILTER:
            return { ...state, 'filter[sub_project_type_id]': action.payload };
        case types.SET_SUB_PROJECT_STATUS_FILTER:
            return { ...state, 'filter[sub_project_status_id]': action.payload };
        case types.SET_SUB_PROJECT_DISTRICT_FILTER:
            return { ...state, 'filter[districts.id]': action.payload };
        case types.SET_SUB_PROJECT_REGIONS_FILTER:
            return { ...state, 'filter[districts.region_id]': action.payload };
        case types.SET_SUB_PROJECT_COMPONENT_FILTER:
            return { ...state, 'filter[procuringEntityPackage.procuringEntity.project_sub_component_id]': action.payload };
        case types.SET_SUB_PROJECT_CONTRACTOR_FILTER:
            return { ...state, 'filter[procuringEntityPackage.contract.contractor_id]': action.payload };
        case types.SET_PROCURING_ENTITY_PACKAGE_FILTER:
            return { ...state, 'filter[procuring_entity_package_id]': action.payload };
        case types.GET_SUB_PROJECTS_BY_PROJECT_ID:
            return { ...state, 'filter[project_id]': action.payload };
        default:
            return state;
    }
};

export const subProjects = combineReducers({
    selected,
    sideNavMenu,
    subProjectsStatistics,
    subProjectOverview,
    regionSubProjects,
    regionSubProjectsStatistics,
    districtsSubProjects,
    districts,
    all,
    subProjectStatus,
    subProjectTypes,
    filters,
    contractors,
    procuringEntityPackage
})



