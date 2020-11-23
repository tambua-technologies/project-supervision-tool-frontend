

import React, {Component} from 'react';
import {Spin} from 'antd';
import PropTypes from "prop-types";
import {GeoJSON, Tooltip} from "react-leaflet";
import { connect } from 'react-redux';
import L from 'leaflet';
import {generateColor, generateNumberRange, getGeoJsonFromLocation, getSelectedResources} from '../../Util'
import "./styles.css";
import BaseMap from "./BaseMap";
import {bindActionCreators} from "redux";
import {mapActions, mapSelectors } from "./duck";
import SideNav from "./components/SideNav";
import Legend from "./components/Legend";

class MapDashboard extends  Component {
    state = {
        lat: -6.161184,
        lng: 35.745426,
        zoom: 7,
    }

    constructor(props) {
        super(props);
        this.map = React.createRef();
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
            "Dar_es_salaam_drain_segments": dar_es_salaam_drain_segments,
        }).addTo(leafletMap);

        //add zoom control with your options
        L.control.zoom({
            position:'topright'
        }).addTo(leafletMap);
    }

    componentDidMount() {
        this.displayRemoteLayers();
    }

    getColor = (numberRange, projects_count) => {
        if (projects_count <= numberRange[1]) return generateColor(0);
        if (projects_count < numberRange[2] && projects_count > numberRange[1]) return generateColor(1);
        if (projects_count < numberRange[3] && projects_count > numberRange[2]) return generateColor(2);
        if (projects_count < numberRange[4] && projects_count > numberRange[3]) return generateColor(3);
        if (projects_count < numberRange[5] && projects_count > numberRange[4]) return generateColor(4);
        if (projects_count > numberRange[5] ) return generateColor(5);

    }

    onEachFeature = (feature, layer) => {

    }

    renderProjectsOverview = (data) => data.map(({geometry,id, region_name, projects_count}) => {
            const geoJsonObject= {
                "type": "Feature",
                "geometry": {
                    "type": geometry.type,
                    "coordinates": geometry.coordinates
                },
                "properties": {
                    "name": region_name,
                    "id": id,
                    "projects_count": projects_count
                }
            }
            const numberRange = generateNumberRange(9);
            const color = this.getColor(numberRange, projects_count)
        console.log('color', color);
        const generateStyle = () => ( {
            "fillColor": color,
            "fillOpacity": 0.8,
            "opacity": 0.2
        });

        return(
            <GeoJSON
                data={geoJsonObject}
                key={id}
                style={generateStyle}>
                <Tooltip sticky key={id}>
                    <div><b>Region:</b> {region_name}</div>
                    <div><b>total projects:</b> {projects_count}</div>
                </Tooltip>
            </GeoJSON>
        );
        });



    render() {
        const {

            activeMapSideMenuItem,
            setActiveMapSideMenuItem,
            getProjectOverview,
            projectsOverview,
            clearProjectsOverview,
            mapLoading,

        } = this.props;
        return (
            <div className="MapDashboard">
               <SideNav
                   activeItem={activeMapSideMenuItem}
                   setActiveItem={setActiveMapSideMenuItem}
                   getProjectOverview={getProjectOverview}
                   clearProjectsOverview={clearProjectsOverview}
                   projectsOverview={projectsOverview}
               />
                <Spin spinning={mapLoading} tip="Loading data...">
                    <BaseMap ref={this.map} zoomControl={false}>
                        { this.renderProjectsOverview(projectsOverview) }
                        {projectsOverview.length > 0 ? <Legend key="projects-legend"/> : ''}
                    </BaseMap>
                </Spin>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        activeMapSideMenuItem: mapSelectors.getActiveMapSideMenuItem(state),
        mapLoading: mapSelectors.getMapLoadingSelector(state),
        projectsOverview: mapSelectors.getProjectsOverview(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    setActiveMapSideMenuItem: bindActionCreators(mapActions.setActiveMapSideMenuItem, dispatch),
    getProjectOverview: bindActionCreators(mapActions.getProjectsOverviewStart, dispatch),
    clearProjectsOverview: bindActionCreators(mapActions.clearProjectsOverview, dispatch),

});



MapDashboard.propTypes = {
    activeMapSideMenuItem: PropTypes.bool.isRequired,
    mapLoading: PropTypes.bool.isRequired,
    getProjectOverview: PropTypes.func.isRequired,
    clearProjectsOverview: PropTypes.func.isRequired,
    projectsOverview: PropTypes.array.isRequired,
};

MapDashboard.defaultProps = {
    projectsOverview: [],
    clearProjectsOverview: () => {},

};

export default connect(mapStateToProps, mapDispatchToProps)(MapDashboard);


