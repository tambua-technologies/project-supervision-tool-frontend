
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
const getWfsLayerData = (...rest) =>
    Axios.get(`${baseUrl}`,
    {
        params: {
            service: 'wfs',
            version: '2.0.0',
            request: 'GetFeature',
            typeName: rest.join(','),
            outputFormat: 'application/json',
         //  CQL_FILTER: CQL_FILTER,
        }
    })
    .then((response) => response.data);

const getGeoserverLayers = (layer_name) =>
    axiosGeoserver.get(`${geoserverUrl}/rest/layers`)
    .then((response) => response.data);






export default {
    getWfsLayerData,
    getGeoserverLayers,
}
