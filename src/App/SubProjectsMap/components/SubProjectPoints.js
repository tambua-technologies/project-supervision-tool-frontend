import { Marker, useMapEvents, GeoJSON, Popup } from "react-leaflet";
import React, { useState } from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as turf from '@turf/turf';
import { mapSubProjectActions, mapSubProjectSelectors } from "../../../redux/modules/map/subProjects";
import SubProjectPopupDetail from "./SubProjectPopup";

function SubProjectPoints({ subProjects }) {
    const [zoomLevel, setZoomLevel] = useState(0);
    const dispatch = useDispatch();
    const subProjectLoading = useSelector(mapSubProjectSelectors.getSubProjectLoadingSelector);


    const map = useMapEvents({
        zoom() {
            setZoomLevel(map.getZoom());
        }
    });

    const handlePopup = (id) => {
        dispatch(mapSubProjectActions.getSubProjectStart(id));
    };

    const renderMarker = (geometry,name,id) => (<Marker
        position={[geometry.coordinates[1], geometry.coordinates[0]]}
        title={name}
        key={`${id}-point`}
        eventHandlers={{
            click: () => {
                map.setView([geometry.coordinates[1], geometry.coordinates[0]], 16);
            },
        }}
    />);

    const renderPolygon = (id,geo_json,subProject) => (<GeoJSON
        key={`${id}-polygon`}
        style={{ weight: 4 }}
        data={geo_json}
        eventHandlers={{ click: () => handlePopup(id) }}
    >
        <Popup>
            <SubProjectPopupDetail subProject={subProject}
                subProjectLoading={subProjectLoading} />
        </Popup>
    </GeoJSON>);


    return (
        <>
            {subProjects.map((subProject) => {
                const { name, id } = subProject;
                let polygon, geo_json;
                if (subProject?.geo_json) {
                    geo_json = subProject.geo_json;
                    polygon = geo_json.geometry;
                } else {
                    polygon = JSON.parse(subProject.district.geom);
                    geo_json = JSON.parse(subProject.district.geom);
                }
                const { geometry } = turf.pointOnFeature(polygon);

                return (
                    <div>
                        {subProject?.geo_json ? zoomLevel < 10 ? renderMarker(geometry,name,id) : renderPolygon(id,geo_json,subProject) : renderMarker(geometry,name,id)}
                    </div>
                );

            })}
        </>);

}


export default SubProjectPoints;

SubProjectPoints.propTypes = {
    subProjects: PropTypes.array.isRequired,
    subProject: PropTypes.object,
    subProjectLoading: PropTypes.bool,
}

SubProjectPoints.defaultProps = {
    subProject: null,
    subProjectLoading: false,
}


