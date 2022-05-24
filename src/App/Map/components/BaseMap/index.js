import React from 'react';
import PropTypes from "prop-types";
import {MapContainer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.min';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-basemaps/L.Control.Basemaps-min';
import 'leaflet-basemaps/L.Control.Basemaps.css';
import L from 'leaflet';
import "./styles.css";
import LayerControl from "../LayerControl";
import './L.Control.ZoomBar';
import './L.Control.ZoomBar.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const state = {
    lat: -5.856,
    lng: 34.074,
    zoom: 7,
}



// const position = [state.lat, state.lng]

const BaseMap = ({children, position}) => {

    const BASE_MAPS = [

        // L.tileLayer('//tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        //     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        //     label: 'OpenStreetMap Black and White'  // optional label used for tooltip
        // }),
        L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            label: 'OpenStreetMap Standard'  // optional label used for tooltip
        }),
        L.tileLayer('//mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            label: 'Google Satellite'
        })
    ];

    const whenCreated = (map) => {
        // add basemaps switcher to map
        map.addControl(L.control.basemaps({
            basemaps: BASE_MAPS,
            position: "bottomleft",
            tileX: 0,  // tile X coordinate
            tileY: 0,  // tile Y coordinate
            tileZ: 1 ,  // tile zoom level,
        }));

        // add zoom control to map
        new L.Control.ZoomBar({position: 'topright'}).addTo(map);
    }

    return (
        <MapContainer center={position} whenCreated={whenCreated} fullscreenControl={{ position: 'topright'}} zoom={state.zoom} className="base-map" zoomControl={false} >
            <LayerControl />
            {children}
        </MapContainer>
    )
}

export default BaseMap;

BaseMap.propTypes = {
    zoomControl: PropTypes.bool,
    projects: PropTypes.array.isRequired
}

BaseMap.defaultProps = {
    zoomControl: true,
    projects: []
}