
import axios from "./config";

/**
 * @function
 * @name getSafeguardConcerns
 * @description get safeguards concerns
 * */
const getSafeguardConcerns = () =>
    axios.get(`/safeguard_concerns`).then((response) => response.data);

export default {
    getSafeguardConcerns
}
