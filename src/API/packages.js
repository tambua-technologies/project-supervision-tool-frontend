import axios from "./config";

/**
 * @function
 * @name uploadPackages
 * @description upload packages
 * 
 * */
const uploadPackages = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post("/procuring_entity_packages/import", formData);
};              




export default {
    uploadPackages
};
