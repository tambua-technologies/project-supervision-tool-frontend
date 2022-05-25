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
    .get(`/procuring_entities/${id}/safeguard_concerns/statistics`)
    .then((response) => response.data);
export default {
  getSafeguardConcerns,
  getProcuringEntitiesStatistics,
};
