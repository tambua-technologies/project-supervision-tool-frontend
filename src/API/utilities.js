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




export default {
    upload
};
