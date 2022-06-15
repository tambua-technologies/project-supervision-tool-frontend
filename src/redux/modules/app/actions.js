
import * as types from './types'
import { makeActionCreator } from '../../../Util';

/**
 * @function
 * @name reloadPage
 */
export const reloadPage = makeActionCreator(types.RELOAD_PAGE);

/**
 * @function
 * @name restoreAccessToken
 * @param {String} payload the access token
 */
export const restoreAccessToken = makeActionCreator(types.RESTORE_ACCESS_TOKEN, 'payload');


/**
 * @function setActiveMenuItem
 * @param {String} payload the active menu item
 * @returns {Object}
 */
 export const setActiveMenuItem = makeActionCreator(types.SET_ACTIVE_MENU_ITEM, 'payload');

