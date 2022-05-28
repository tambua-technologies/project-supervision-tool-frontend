import React, {Component} from 'react';
import L from 'leaflet';
import {GeoJSON} from 'react-leaflet';
import BaseMap from "../BaseMap";
import {getGeoJsonFromLocation} from '../../../../Util';

class PreviewOnMap extends  Component {
    state = {
        lat: -6.161184,
        lng: 35.745426,
        zoom: 7,
    }

    constructor(props) {
        super(props);
        this.map = React.createRef();
        this.geoJson = React.createRef();
    }

    zoomToGeoJson() {
        const map = this.map.current.leafletElement;
        map.on('layeradd', ({layer}) => {
            if (layer instanceof L.GeoJSON){
            map.fitBounds(layer.getBounds());
        }
    });
    }

    displayRemoteLayers() {
        const leafletMap =  this.map.current.leafletElement;
        const Dar_es_Salaam_Office_Points = L.tileLayer.wms("https://geonode.resilienceacademy.ac.tz/geoserver/ows", {
            layers: 'geonode:Dar_es_Salaam_Office_Points',
            format: 'image/png',
            transparent: true,
        });
        const Dar_es_Salaam_Hospital_Points = L.tileLayer.wms("https://geonode.resilienceacademy.ac.tz/geoserver/ows", {
            layers: 'geonode:Dar_es_Salaam_Hospital_Points',
            format: 'image/png',
            transparent: true,
        });
        const Dar_es_Salaam_Highway = L.tileLayer.wms("https://geonode.resilienceacademy.ac.tz/geoserver/ows", {
            layers: 'geonode:Dar_es_Salaam_Highway',
            format: 'image/png',
            transparent: true,
        });
        const dar_es_salaam_drain_segments = L.tileLayer.wms("https://geonode.resilienceacademy.ac.tz/geoserver/ows", {
            layers: 'geonode:dar_es_salaam_drain_segments',
            format: 'image/png',
            transparent: true,
        });

        L.control.layers({}, {
            "Dar_es_Salaam_Government_Offices": Dar_es_Salaam_Office_Points,
            "Dar_es_Salaam_Hospitals": Dar_es_Salaam_Hospital_Points,
            "Dar_es_Salaam_Roads": Dar_es_Salaam_Highway,
            "Dar_es_salaam_Drains": dar_es_salaam_drain_segments,
        }).addTo(leafletMap);

        //add zoom control with your options
        L.control.zoom({
            position:'bottomright'
        }).addTo(leafletMap);
    }

    componentDidMount() {
        this.zoomToGeoJson();
        this.displayRemoteLayers()
    }

    clickToFeature(e) {
        const layer = e.target;
        console.log("I clicked on ");

    }

    onEachFeature = (feature, layer) => {
        layer.on({
            click: this.clickToFeature.bind(this)
        });
    }

    render() {
        const { data } = this.props;
        const geo_json = getGeoJsonFromLocation(data);
        const position = [this.state.lat, this.state.lng]


        return (
            <BaseMap ref={this.map} zoomControl={false} position={position}>
                <GeoJSON ref={this.geoJson} data={geo_json} onEachFeature={this.onEachFeature.bind(this)}/>
            </BaseMap>
        )
    }
}


export default PreviewOnMap;
