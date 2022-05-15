import { withLeaflet } from "react-leaflet";


import React, {Component} from "react";
import PropTypes from 'prop-types';
import {GeoJSON} from "react-leaflet";

/**
 * @class
 * @name RegionDetailsGeoJson
 * @description renders region projects on map
 */
class RegionDetailsGeoJson extends Component{

    static propTypes = {
        data: PropTypes.object.isRequired
    }

    onEachFeature = (feature, layer) => {
        const { map } = this.props.leaflet;
        map.fitBounds(layer.getBounds());
    }

    render() {
        const { data } = this.props;
        const parsedGeom = JSON.parse(data?.geom);
        const geoJsonObject= {
            "type": "Feature",
            "geometry": parsedGeom,
        }

        return data?.geom ? <GeoJSON
            data={geoJsonObject}
            style={{ "opacity": 0.5, "fillOpacity": 0.05, "weight": 1 }}
            key={data.id}
            onEachFeature={this.onEachFeature}
        /> : '';
    }
}


export default withLeaflet(RegionDetailsGeoJson);
