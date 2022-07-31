import axios from "./config";

/**
 * @function
 * @name upload
 * @description upload resources to the server
 * 
 * */
const upload = (endpoint, file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post(endpoint, formData);
}; 


/**
 * Get a sub project from the API
 * @function
 * @name get
 * @description gets resources from the server based on the endpoint
 * @params {Object} params - params to be sent to the server
 * @params {String} endpoint - endpoint to be used
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 * @param filter
 */
 const get = (endpoint , params = {}) => {
    return axios.get(endpoint, {params}).then((response) => response.data.data);
}



 const post = (endpoint , body) => {
    return axios.post(endpoint, body).then((response) => response.data.data);
}




export default {
    upload,
    get,
    post,
};
