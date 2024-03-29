
import Axios from 'axios';

const baseUrl = `${process.env.REACT_APP_GEONODE_URL}/geoserver/wfs`;

const axiosGeoserver = Axios.create({
    headers: {
        Accept: "application/json",
    },
});

const geoserverUrl = `${process.env.REACT_APP_GEONODE_URL}/geoserver`;


/**
 * @function
 * @name getWfsLayerData
 *
 * @param {Object} layer_name
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const getWfsLayerData = (layer_name) =>
    Axios.get(`${baseUrl}?service=wfs&version=2.0.0&request=GetFeature&typeNames=${layer_name}&outputFormat=application/json`)
    .then((response) => response.data);

const getGeoserverLayers = (layer_name) =>
    axiosGeoserver.get(`${geoserverUrl}/rest/layers`)
    .then((response) => response.data);






export default {
    getWfsLayerData,
    getGeoserverLayers,
}
