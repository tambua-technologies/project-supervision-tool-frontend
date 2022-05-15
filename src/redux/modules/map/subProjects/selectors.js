/**
 * @function
 * @name getSubProjectSelector
 * @param {Object} state redux state
 */
export const getSubProjectSelector = (state) => state.map.subProjects.selected?.data || [];

/**
 * @function
 * @name getSubProjectLoadingSelector
 * @param {Object} state redux state
 */
export const getSubProjectLoadingSelector = (state) => state.map.subProjects.selected?.loading;


/**
 * @function
 * @name getSubProjectsSelector
 * @param {Object} state redux state
 */
export const getSubProjectsSelector = (state) => state.map.subProjects.all?.data?.data || [];

/**
 * @function
 * @name getSubProjectsStatistics
 * @param {Object} state redux state
 */
export const getSubProjectsStatistics = (state) => state?.map?.subProjects?.subProjectsStatistics?.data;

/**
 * @function
 * @name getSubProjectsStatisticsLoading
 * @param {Object} state redux state
 */
export const getSubProjectsStatisticsLoading = (state) => state?.map?.subProjects?.subProjectsStatistics.loading;

/**
 * @function
 * @name showSubProjectNationalOverview
 * @param {Object} state redux state
 */
export const showSubProjectNationalOverview = (state) => state?.map?.subProjects?.sideNavMenu?.showNationalOverview;

/**
 * @function
 * @name showSubProjectOverview
 * @param {Object} state redux state
 */
export const showSubProjectOverview = (state) => state?.map?.subProjects?.sideNavMenu?.showSubProjectOverview;

/**
 * @function
 * @name showDistrictsSubProjectOverview
 * @param {Object} state redux state
 */
export const showDistrictsSubProjectOverview = (state) => state?.map?.subProjects?.sideNavMenu?.showDistrictsOverview;

/**
 * @function
 * @name showRegionalOverviewSelector
 * @param {Object} state redux state
 * @return {Boolean} showProjectOverview status
 */
export const showRegionalOverviewSelector = (state) => state?.map?.subProjects?.sideNavMenu?.showRegionalOverview;

/**
 * @function
 * @name getSubProjectSelector
 * @param {Object} state redux state
 */
export const getSubProjectsOverviewSelector = (state) => state.map.subProjects.subProjectOverview?.dataoverview;

/**
 * @function
 * @name getSubProjectMapLoadingSelector
 * @param {Object} state redux state
 */
export const getSubProjectMapLoadingSelector = (state) => state?.map?.subProjects.mapLoading;

/**
 * @function
 * @name getRegionSubProjectsStatistics
 * @param {Object} state redux state
 */
export const getRegionSubProjectsStatistics = (state) => state?.map?.subProjects?.regionSubProjectsStatistics?.data;

/**
 * @function
 * @name getRegionSubProjectsStatisticsLoader
 * @param {Object} state redux state
 */
export const getRegionSubProjectsStatisticsLoader = (state) => state?.map?.subProjects?.regionSubProjectsStatistics?.loading;

/**
 * @function
 * @name getRegionSubProjectsSelector
 * @param {Object} state redux state
 */
export const getRegionSubProjectsOverviewSelector = (state) => state?.map?.subProjects?.regionSubProjects?.data;

/**
 * @function
 * @name getDistrictsSubProjectsSelector
 * @param {Object} state redux state
 */
export const getDistrictsSubProjectsSelector = (state) => state?.map?.subProjects?.districtsSubProjects?.data;

/**
 * @function
 * @name getDistrictsSubProjectsLoader
 * @param {Object} state redux state
 */
export const getDistrictsSubProjectsLoader = (state) => state?.map?.subProjects?.districtsSubProjects?.loading;

export const getDistrictsMapSelector = (state) => state?.subProjects?.districts.data;

/**
 * @function
 * @name getSubProjectTypesSelector
 * @param {Object} state redux state
 */
export const getSubProjectTypesSelector = (state) => state?.map?.subProjects?.subProjectTypes?.data;

/**
 * @function
 * @name getSubProjectStatusSelector
 * @param {Object} state redux state
 */
export const getSubProjectStatusSelector = (state) => state?.map?.subProjects?.subProjectStatus?.data;

/**
 * @function
 * @name getContractorsSelector
 * @param {Object} state redux state
 */
export const getContractorsSelector = (state) => state?.map?.subProjects?.contractors?.data;

/**
 * @function
 * @name getProcuringEntityPackageSelector
 * @param {Object} state redux state
 */
export const getProcuringEntityPackageSelector = (state) => state?.map?.subProjects?.procuringEntityPackage?.data;

