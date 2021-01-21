
import { makeActionCreator } from '../../../../Util';
import * as types from './types'

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