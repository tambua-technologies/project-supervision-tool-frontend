import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {GeoJSON, withLeaflet, WMSTileLayer} from "react-leaflet";
import L from "leaflet";
import Axios from "axios";
import {xml2json} from "xml-js";
import WMSCapabilities from 'wms-capabilities';

/**
 * @class
 * @name SubProjectLocations
 * @description component that renders sub project element on map
 */
class SubProjectElementWfsLayer extends Component {

    static propTypes = {
        wfsLayerData: PropTypes.object,
    }

    static defaultProps = {
        wfsLayerData: null,
    }

    componentDidMount() {
        const { map } = this.props.leaflet;
        const subProjectLayerName = localStorage.getItem('subProjectLayerName');
        Axios.get(`${process.env.REACT_APP_GEONODE_URL}/geoserver/wms?service=wms&version=1.1.1&request=GetCapabilities`)
            .then(res => {
                const capabilities = new WMSCapabilities().parse(res.data);
                const myLayer = capabilities.Capability.Layer.Layer.find(l => l.Name === subProjectLayerName );
                const {LatLonBoundingBox} = myLayer;

                const subProjectElementLayer = L.tileLayer.wms(`${process.env.REACT_APP_GEONODE_URL}/geoserver/ows`, {
                    layers: subProjectLayerName,
                    format: 'image/png',
                    transparent: true,
                });

                map.addLayer(subProjectElementLayer);
                const corner1 = L.latLng(LatLonBoundingBox[1],LatLonBoundingBox[0]);
                const corner2 = L.latLng(LatLonBoundingBox[3],LatLonBoundingBox[2]);
                const bounds = L.latLngBounds(corner1, corner2);
                map.fitBounds(bounds);
            });

    }


    render() {
        return '';
    }
}

export default withLeaflet(SubProjectElementWfsLayer);
