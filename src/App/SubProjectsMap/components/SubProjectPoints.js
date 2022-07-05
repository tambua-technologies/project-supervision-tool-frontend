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


    const renderPolygon = (id,geo_json,subProject) => (<GeoJSON
        key={`${id}-polygon`}
        style={{ weight: 4, color: '#199900', opacity: 0.8 }}
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
            {subProjects.filter(s => s?.geo_json?.geometry).map((subProject) => {
                const { name, id, geo_json } = subProject;
                
                return (
                    <div>
                        { renderPolygon(id,geo_json,subProject)}
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


