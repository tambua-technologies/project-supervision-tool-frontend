import axios from "./config";

/**
 * @function
 * @name getUsers
 * @description get Users
 * */
const getUsers = (params={}) => {
    return axios.get(`/users`, { params: { page: params.page, per_page: 10, searchField:'first_name', searchQuery: params.searchQuery } }).then((response) => response.data);
}
    

/**
 * create new User
 *
 * @function
 * @name createUser
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const createUsers = (user) => axios.post(`/users`, user ).then((response) => response.data);


/**
 * 
 * Edit user from the API
 * @function
 * @name editUser
 * @param {Object} id - Id of user
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
 const editUser = (user, id) => {
     console.log(id)
    return axios
        .patch(`/users/${id}`, user)
        .then((response) => response.data);
};

/**
 * @function
 * @name getAuthUser
 * @description gets authenticated user
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
 const getAuthUser = () => axios.get(`/users/auth_user`)
 .then((response) => {
     return response.data;
 });


/**
 * detaches a User from list
 *
 * @function
 * @name deleteUser
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const deleteUser = (User) => {
    return axios
        .delete(`users/${User}`)
        .then((response) => response.data);
};

export default {
    getUsers,
    getAuthUser,
    createUsers,
    editUser,
    deleteUser,
}
