import * as types from "./types";
import {combineReducers} from "redux";



const menu = (state = {activeMenuItem: ""}, action) => {
    switch (action.type) {
        case types.SET_ACTIVE_MENU_ITEM:
            return {...state, activeMenuItem: action.payload};
        default:
            return state;
    }
};


export const app = combineReducers({
    menu
});

