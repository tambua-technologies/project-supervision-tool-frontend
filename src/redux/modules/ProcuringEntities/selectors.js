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
 * @name searchQuery
 * @param {Object} state redux state
 * @return {Object} 
 */
 export const searchQuery = (state) => state?.procuringEntityResource?.search.data;

/**
 * @function
 * @name getProcuringEntitySelector
 * @param {Object} state redux state
 */
export const getProcuringEntitySelector = (state) => state?.procuringEntityResource?.procuringEntity.data;

/**
 * @function
 * @name getProcuringEntitySelector
 * @param {Object} state redux state
 */
 export const loadProcuringEntitySelector = (state) => state?.procuringEntityResource?.procuringEntity.loading;

/**
 * @function
 * @name getPackageSelector
 * @param {Object} state redux state
 */
export const getPackageSelector = (state) => state?.procuringEntityResource?.packageDetail.data;


/**
 * @function
 * @name getShowFormSelector
 * @param {Object} state redux state
 */
export const getShowFormSelector = (state) => state?.procuringEntityResource?.procuringEntities?.showForm;

/**
 * @function
 * @name getActorsSelector
 * @param {Object} state redux state
 * @return {Object} 
 */
export const getActorsSelector = (state) => state?.procuringEntityResource?.actors?.data?.data || [];

/**
 * @function
 * @name getPackagesSelector
 * @param {Object} state redux state
 */

export const getPackagesSelector = (state) => state?.procuringEntityResource?.packages?.data || [];

/**
 * @function
 * @name getPackageloaderSelector
 * @param {Object} state redux state
 */

export const getPackageloaderSelector = (state) => state?.procuringEntityResource?.packageDetail?.loading;

/**
 * @function
 * @name showPackageFormSelector
 * @param {Object} state redux state
 */
export const showPackageFormSelector = (state) => state?.procuringEntityResource?.packages?.showForm;

/**
 * @function
 * @name selectedProcuringEntity
 * @param {Object} state redux state
 */
export const selectedPackageSelector= (state) => state?.procuringEntityResource?.packages?.package;


/**
 * @function
 * @name loading
 * @param {Boolean} state redux state
 */
export const loadingPackages = (state) => state?.procuringEntityResource?.packages?.loading;
