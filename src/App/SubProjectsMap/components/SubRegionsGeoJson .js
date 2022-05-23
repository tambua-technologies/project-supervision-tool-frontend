
import React, {Component} from 'react';
import L from 'leaflet';
import {GeoJSON, Tooltip, withLeaflet } from "react-leaflet";
import {generateColor, generateNumberRange} from "../../../Util";
import Legend from "./Legend";
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import  '../styles.css';

class SubProjectRegionsGeoJson extends Component{

    getColor = (numberRange, projects_count) => {
        if (projects_count <= numberRange[1]) return generateColor(0);
        if (projects_count < numberRange[2] && projects_count > numberRange[1]) return generateColor(1);
        if (projects_count < numberRange[3] && projects_count > numberRange[2]) return generateColor(2);
        if (projects_count < numberRange[4] && projects_count > numberRange[3]) return generateColor(3);
        if (projects_count < numberRange[5] && projects_count > numberRange[4]) return generateColor(4);
        if (projects_count > numberRange[5] ) return generateColor(5);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (((prevProps.subProjectsOverview !== this.props.subProjectsOverview) && (this.props.subProjectsOverview.length > 0))){
            const { map } = this.props.leaflet;
            map.setView(L.latLng(-6.161184, 35.745426), 6);
        }
    }

    handleOnClickGeojson = ({properties}) => this.props.getSubProjectsByRegion(properties.id);
    onEachFeature = (feature, layer) =>  layer.on({ click: () => this.handleOnClickGeojson(feature)});

    renderSubProjectsOverview = (data) => data.map(({geom,id, name, sub_projects_count}) => {
        const parsedGeometry = JSON.parse(geom);
        const geoJsonObject= {
            "type": "Feature",
            "geometry": {
                "type": parsedGeometry.type,
                "coordinates": parsedGeometry.coordinates
            },
            "properties": {
                "name": name,
                "id": id,
                "sub_projects_count": sub_projects_count
            }
        }
        const numberRange = generateNumberRange(9);
        const color = this.getColor(numberRange, sub_projects_count)
        const generateStyle = () => ( {
            "fillColor": color,
            "fillOpacity": 0.8,
            "opacity": 0.2
        });

        return(
            <GeoJSON
                data={geoJsonObject}
                key={id}
                style={generateStyle}
                onEachFeature={this.onEachFeature}>
                <Tooltip sticky key={id}>
                    <Layout>
                        <Content>
                        <div><b>Region:</b> {name}</div>
                        <div><b>total Sub project:</b> {sub_projects_count}</div>
                        </Content>
                    </Layout>
                    
                </Tooltip>
            </GeoJSON>
        );
    });

    render() {

        const { subProjectsOverview } = this.props;

        return (
            <>
                { this.renderSubProjectsOverview(subProjectsOverview) }
            </>
        );
    }
}


export default withLeaflet(SubProjectRegionsGeoJson);
