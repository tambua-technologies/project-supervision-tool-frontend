/**
 * @function
 * @name getProcuringEntities
 * @param {Object} state redux state
 */

export const getProcuringEntities = (state) => state?.procuringEntityResource?.procuringEntities?.data;

/**
 * @function
 * @name loading
 * @param {Boolean} state redux state
 */
export const loading = (state) => state?.procuringEntityResource?.procuringEntities?.loading;

/**
 * @function
 * @name selectedProcuringEntity
 * @param {Object} state redux state
 */
export const selectedProcuringEntity = (state) => state?.procuringEntityResource?.procuringEntities?.procuringEntity;


/**
 * @function
 * @name getShowFormSelector
 * @param {Object} state redux state
 */
export const getShowFormSelector = (state) => state?.procuringEntityResource?.procuringEntities?.showForm;

/**
 * @function
 * @name getActors
 * @param {Object} state redux state
 * @return {Object} 
 */
export const getActorsSelector = (state) => state?.procuringEntityResource?.actors?.data?.data || [];
