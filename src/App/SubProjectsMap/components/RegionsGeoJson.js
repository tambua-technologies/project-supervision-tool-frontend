
import React, {Component} from 'react';
import L from 'leaflet';
import {GeoJSON, Tooltip, withLeaflet } from "react-leaflet";
import {generateColor, generateNumberRange} from "../../../Util";
import Legend from "./Legend";
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import  '../styles.css'
class RegionsGeoJson extends Component {

    getColor = (numberRange, projects_count) => {
        if (projects_count <= numberRange[1]) return generateColor(0);
        if (projects_count < numberRange[2] && projects_count > numberRange[1]) return generateColor(1);
        if (projects_count < numberRange[3] && projects_count > numberRange[2]) return generateColor(2);
        if (projects_count < numberRange[4] && projects_count > numberRange[3]) return generateColor(3);
        if (projects_count < numberRange[5] && projects_count > numberRange[4]) return generateColor(4);
        if (projects_count > numberRange[5] ) return generateColor(5);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (((prevProps.projectsOverview !== this.props.projectsOverview) && (this.props.projectsOverview.length > 0))){
            const { map } = this.props.leaflet;
            map.setView(L.latLng(-6.161184, 35.745426), 6);
        }
    }

    handleOnClickGeojson = ({properties}) => this.props.getProjectsByRegion(properties.id);
    onEachFeature = (feature, layer) =>  layer.on({ click: () => this.handleOnClickGeojson(feature)});

    renderProjectsOverview = (data) => data.map(({geometry,id, region_name, projects_count}) => {
        const parsedGeometry = JSON.parse(geometry);
        const geoJsonObject= {
            "type": "Feature",
            "geometry": {
                "type": parsedGeometry.type,
                "coordinates": parsedGeometry.coordinates
            },
            "properties": {
                "name": region_name,
                "id": id,
                "projects_count": projects_count
            }
        }
        const numberRange = generateNumberRange(9);
        const color = this.getColor(numberRange, projects_count)
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
                        <Header className="project-title">
                            <h4><b>Region:</b> {region_name}</h4>
                        </Header>
                        <Content>
                        <div><b>Region:</b> {region_name}</div>
                        <div><b>total projects:</b> {projects_count}</div>
                        </Content>
                    </Layout>
                    
                </Tooltip>
            </GeoJSON>
        );
    });

    render() {

        const { projectsOverview } = this.props;

        return (
            <>
                { this.renderProjectsOverview(projectsOverview) }
                {projectsOverview.length > 0 ? <Legend key="projects-legend"/> : ''}
            </>
        );
    }
}


export default withLeaflet(RegionsGeoJson);
