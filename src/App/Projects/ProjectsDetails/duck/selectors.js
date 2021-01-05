/**
 * @function
 * @name getBorrowers
 * @param {Object} state redux state
 */

export const getBorrowers = (state) => state.projectDetails?.borrowers

/**
 * @function
 * @name getFundingOrgs
 * @param {Object} state redux state
 */

export const getFundingOrgs = (state) => state.projectDetails?.funding_orgs

/**
 * @function
 * @name getAgencies
 * @param {Object} state redux state
 */

export const getAgencies = (state) => state.projectDetails?.agencies
