
import axios from "./config";

/**
 * login focal person
 *
 * @function
 * @name login
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const login = (payload) =>
    axios
        .post(`/focal_people/login`, payload)
        .then((response) => response.data)
        .catch(err => {
            throw new Error(err.response.data.failed); // catch and re-throw error
        });


/**
 * Fetch all focal people from API
 *
 */
const getFocalPeople = () => {
    return axios.get(`/focal_people`).then((response) => response.data.data);
}


export default {
    login,
    getFocalPeople
}
