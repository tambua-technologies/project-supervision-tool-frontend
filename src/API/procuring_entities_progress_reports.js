
import axios from "./config";

/**
 * @function
 * @name getProcuringEntities
 * @description get Procuring Entities progress reports
 * */
 const getProcuringEntitiesProgressReports = (filter = {}) =>
 axios.get(`/procuring_entity_reports`, {params: filter}).then((response) => response.data);


 const createProcuringEntitiesProgressReports = (payload) => axios.post(`/procuring_entity_reports`, payload).then((response) => response.data);




 export default {
        getProcuringEntitiesProgressReports,
        createProcuringEntitiesProgressReports
 }
