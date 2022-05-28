import axios from "./config";

/**
 * @function
 * @name getSafeguardConcerns
 * @description get safeguards concerns
 * */
const getSafeguardConcerns = () =>
  axios.get(`/safeguard_concerns`).then((response) => response.data);

const getProcuringEntitiesStatistics = (id) =>
  axios
    .get(`/procuring_entities/statistics/${id}`)
    .then((response) => response.data);
export default {
  getSafeguardConcerns,
  getProcuringEntitiesStatistics,
};
