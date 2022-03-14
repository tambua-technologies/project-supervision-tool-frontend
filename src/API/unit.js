
import axios from "./config";

/**
 * @function
 * @name getUnit
 * @description get unit
 * */
const getUnit = () =>
    axios.get(`/units`).then((response) => response.data);

export default {
    getUnit
}