import { combineReducers } from "redux";
import * as types from "./types";

const initialData = {
  data: [],
  total: 1,
  loading: false,
  error: null,
  page: 1,
  ticket: {},
  showForm: false,
};


const tickets = (state = initialData, action) => {
  switch (action.type) {
    case types.GET_TICKETS_START:
      return { ...state, loading: true }
    case types.GET_TICKETS_SUCCESS:
      return { data: action.payload, loading: false, }
    case types.GET_TICKETS_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case types.CREATE_PROJECT_TICKET_START:
      return { ...state, loading: true, showForm: true }
    case types.CREATE_PROJECT_TICKET_SUCCESS:
      return { ...state, loading: false, ticket: action.payload, showForm: false }
    case types.CREATE_PROJECT_TICKET_FAILURE:
      return { ...state, loading: false, error: action.payload, showForm: false }
    case types.OPEN_TICKET_FORM:
      return { ...state, showForm: true };
    case types.CLOSE_TICKET_FORM:
      return { ...state, showForm: false };
    case types.GET_TICKET_BY_PROJECT_START:
      return { ...state }
    case types.GET_TICKET_BY_PROJECT_SUCCESS:
      return { ...state, ticket: action.payload }
    case types.GET_TICKET_BY_PROJECT_FAILURE:
      return { ...state, error: action.payload }
    case types.CREATE_SUB_PROJECT_TICKET_START:
      return { ...state, loading: true, showForm: true }
    case types.CREATE_SUB_PROJECT_TICKET_SUCCESS:
      return { ...state, loading: false, ticket: action.payload, showForm: false }
    case types.CREATE_SUB_PROJECT_TICKET_FAILURE:
      return { ...state, loading: false, error: action.payload, showForm: false }
    case types.GET_TICKET_BY_SUB_PROJECT_START:
      return { ...state }
    case types.GET_TICKET_BY_SUB_PROJECT_SUCCESS:
      return { ...state, ticket: action.payload }
    case types.GET_TICKET_BY_SUB_PROJECT_FAILURE:
      return { ...state, error: action.payload }
    default:
      return state;

  }
}

const ticket = (state = { data: {}, loading: false, error: null }, action) => {
  switch (action.type) {
    case types.GET_TICKET_START:
      return { ...state, loading: true }
    case types.GET_TICKET_SUCCESS:
      return { data: action.payload, loading: false, }
    case types.GET_TICKET_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state;

  }
}

const agencies = (state = { data: {}, loading: false, error: null }, action) => {
  switch (action.type) {
    case types.GET_AGENCY_START:
      return { ...state, loading: true }
    case types.GET_AGENCY_SUCCESS:
      return { data: action.payload, loading: false, }
    case types.GET_AGENCY_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state;

  }
}


export const ticketsResource = combineReducers({
  tickets,
  ticket,
  agencies
})