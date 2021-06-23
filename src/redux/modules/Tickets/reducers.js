import { combineReducers } from "redux";
import * as types from "./types";

const initialData = {
  data: [],
  total: 1,
  loading: false,
  error: null,
  page: 1,
};


const tickets = (state = initialData, action) => {
  switch (action.type) {
    case types.GET_TICKETS_START:
      return { ...state, loading: true }
    case types.GET_TICKETS_SUCCESS:
      return {  data: action.payload, loading: false, }
    case types.GET_TICKETS_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state;

  }
}

const ticket = (state = {data: {}, loading: false, error: null}, action) => {
  switch (action.type) {
    case types.GET_TICKET_START:
      return { ...state, loading: true }
    case types.GET_TICKET_SUCCESS:
      return {  data: action.payload, loading: false, }
    case types.GET_TICKET_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state;

  }
}


export const ticketsResource = combineReducers({
  tickets,
  ticket
})