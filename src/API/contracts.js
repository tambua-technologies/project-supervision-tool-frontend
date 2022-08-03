import axios from "./config";

/**
 * @function
 * @name getContracts
 * @description get Contracts
 * */
const getContracts = (params={}) => {
    return axios.get(`/sub_project_contracts`, { params: { page: params.page, per_page: 10, searchField:'name', searchQuery: params.searchQuery } }).then((response) => response.data);
}
    

/**
 * create new Contract
 *
 * @function
 * @name createContract
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const createContracts = (contract) => axios.post(`/contracts`, contract ).then((response) => response.data);


/**
 * 
 * Edit contract from the API
 * @function
 * @name editContract
 * @param {Object} id - Id of contract
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
 const editContract = (contract, id) => {
    return axios
        .patch(`/contracts/${id}`, contract)
        .then((response) => response.data);
};

/**
 * detaches a Contract from list
 *
 * @function
 * @name deleteContract
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const deleteContract = (Contract) => {
    return axios
        .delete(`contracts/${Contract}`)
        .then((response) => response.data);
};

export default {
    getContracts,
    createContracts,
    editContract,
    deleteContract,
}