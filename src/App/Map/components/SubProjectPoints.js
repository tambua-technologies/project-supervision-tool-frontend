import {Marker, useMapEvents, GeoJSON, Popup} from "react-leaflet";
import React, {useState} from "react";
import PropTypes from 'prop-types';
import {reproject} from 'reproject';
import epsg from 'epsg'
import * as turf from '@turf/turf';
import SubProjectPopupDetail from "./SubProjectPopup";

function SubProjectPoints({subProjects, getSubproject, subProjectLoading, subProject, project}) {
    const [zoomLevel, setZoomLevel] = useState(0);

    const map = useMapEvents({
        zoom() {
            setZoomLevel(map.getZoom());
        }
    });
    const handlePopup = (id) => {
        getSubproject(id);
    };


    return (
        <>
            {subProjects.map((subProject) => {
                const {name, id} = subProject;
                let polygon, geo_json;
                if (subProject?.geo_json && subProject?.geo_json?.srid) {
                    geo_json = subProject.geo_json?.srid === 'EPSG:4326' ? subProject.geo_json : reproject(subProject.geo_json, subProject.geo_json?.srid, 'EPSG:4326', epsg);
                    polygon = geo_json.geometry;
                } else {
                    polygon = JSON.parse(subProject.district.geom);
                    geo_json = JSON.parse(subProject.district.geom);
                }
                const {geometry} = turf.pointOnFeature(polygon);
                const renderMarker = () => (<Marker
                    position={[geometry.coordinates[1], geometry.coordinates[0]]}
                    title={name}
                    key={`${id}-point`}
                    eventHandlers={{
                        click: () => {
                            map.setView([geometry.coordinates[1], geometry.coordinates[0]], 16);
                        },
                    }}
                />);

                const renderPolygon = () => (<GeoJSON
                    key={`${id}-polygon`}
                    style={{weight: 10}}
                    data={geo_json}
                    eventHandlers={{click: () => handlePopup(id)}}
                >
                    <Popup>
                        <SubProjectPopupDetail subProject={subProject} project={project}
                                               subProjectLoading={subProjectLoading}/>
                    </Popup>
                </GeoJSON>);

                return (
                    <div>
                        {
                            subProject?.geo_json ? zoomLevel < 12 ? renderMarker() : renderPolygon() : renderMarker()
                        }
                    </div>
                );

            })}
        </>);

}


export default SubProjectPoints;

SubProjectPoints.propTypes = {
    subProjects: PropTypes.array.isRequired,
}
