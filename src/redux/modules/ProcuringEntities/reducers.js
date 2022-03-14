import { combineReducers } from "redux";
import * as types from "./types";

const initialData = {
  data: [],
  total: 1,
  loading: false,
  error: null,
  page: 1,
  procuringEntity: {},
  showForm: false,
};


const procuringEntities = (state = initialData, action) => {
  switch (action.type) {
    case types.GET_PROCURING_ENTITIES_START:
      return { ...state, loading: true }
    case types.GET_PROCURING_ENTITIES_SUCCESS:
      return { data: action.payload, loading: false, }
    case types.GET_PROCURING_ENTITIES_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case types.DELETE_PROCURING_ENTITY_START:
      return { ...state };
    case types.DELETE_PROCURING_ENTITY_SUCCESS:
      return { ...state, procuringEntity: action.payload };
    case types.DELETE_PROCURING_ENTITY_FAILURE:
      return action.payload;
    case types.SELECT_PROCURING_ENTITY:
      return { ...state, procuringEntity: action.payload };
    case types.OPEN_PROCURING_ENTITY:
      return { ...state, showForm: true };
    case types.CLOSE_PROCURING_ENTITY:
      return { ...state, showForm: false };
    case types.CREATE_PROCURING_ENTITY_START:
      return { ...state, loading: true };
    case types.CREATE_PROCURING_ENTITY_SUCCESS:
      return { ...state, procuringEntity: action.payload, loading: false };
    case types.CREATE_PROCURING_ENTITY_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;

  }
}

const actors = (state = { data: [], error: null, loading: false }, action) => {
  switch (action.type) {
    case types.GET_ACTORS_START:
      return { ...state, loading: true }
    case types.GET_ACTORS_SUCCESS:
      return { ...state, data: action.payload, loading: false, }
    case types.GET_ACTORS_FAILURE:
      return { ...state, error: action.message, loading: false };
    default:
      return state;
  }
};

const procuringEntity = (state = { data: null, error: null, loading: false }, action) => {
  switch (action.type) {
    case types.GET_PROCURING_ENTITY_START:
      return { ...state, loading: true }
    case types.GET_PROCURING_ENTITY_SUCCESS:
      return { ...state, data: action.payload, loading: false, }
    case types.GET_PROCURING_ENTITY_FAILURE:
      return { ...state, error: action.message, loading: false };
    default:
      return state;
  }
};

const packages = (state = { data: null, error: null, loading: false, package: {} }, action) => {
  switch (action.type) {
    case types.GET_PACKAGES_START:
      return { ...state, loading: true }
    case types.GET_PACKAGES_SUCCESS:
      return { ...state, data: action.payload, loading: false, }
    case types.GET_PACKAGES_FAILURE:
      return { ...state, error: action.message, loading: false };
    case types.DELETE_PACKAGES_START:
      return { ...state };
    case types.DELETE_PACKAGES_SUCCESS:
      return { ...state, package: action.payload };
    case types.DELETE_PACKAGES_FAILURE:
      return action.payload;
    case types.SELECT_PACKAGE:
      return { ...state, package: action.payload };
    case types.OPEN_PACKAGE:
      return { ...state, showForm: true };
    case types.CLOSE_PACKAGE:
      return { ...state, showForm: false };
    case types.CREATE_PACKAGE_START:
      return { ...state, loading: true, showForm: true };
    case types.CREATE_PACKAGE_SUCCESS:
      return { ...state, package: action.payload, loading: false, showForm:false };
    case types.CREATE_PACKAGE_FAILURE:
      return { ...state, error: action.payload, loading: false };
      case types.UPDATE_PACKAGE_SUCCESS:
        return { ...state, loading: false, showForm:false };
    default:
      return state;
  } 
};

const packageDetail = (state = { data: null, error: null, loading: false, package:{} }, action) => {
  switch (action.type) {
    case types.GET_PACKAGE_START:
      return { ...state, loading: true }
    case types.GET_PACKAGE_SUCCESS:
      return { ...state, data: action.payload, loading: false, }
    case types.GET_PACKAGE_FAILURE:
      return { ...state, error: action.message, loading: false };
    default:
      return state;
  }
};

const search = (state = { data : ''}, action) => {
  switch (action.type) {
      case types.SEARCH_PROCURING_ENTITY:
          return { ...state, data: action.payload }
      default:
          return state;
  }
};

export const procuringEntityResource = combineReducers({
  procuringEntities,
  procuringEntity,
  packageDetail,
  actors,
  packages,
  search
})
