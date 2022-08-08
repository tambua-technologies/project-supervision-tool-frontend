import { GeoJSON, Popup } from "react-leaflet";
import React from "react";
import PropTypes from 'prop-types';
import SubProjectPopupDetail from "./SubProjectPopup";

function SubProjectPoints({ subProjects }) {

    const renderPolygon = (id, geo_json, subProject) => {
        return (
            <GeoJSON
                key={`${id}-polygon`}
                style={{ color: subProject.datasetType === 'road' ? '#199900' : '#000080' }}
                data={geo_json}
                eventHandlers={{ click: () => console.log('sub-project clicked') }}
            >
                <Popup>
                    <SubProjectPopupDetail
                        subProject={subProject}
                        subProjectLoading={false}
                    />
                </Popup>
            </GeoJSON>);
    }


    return (
        <>
            {subProjects.filter(s => s?.geo_json?.geometry).map((subProject) => {
                const { id, geo_json } = subProject;

                return (
                    <div>
                        {renderPolygon(id, geo_json, subProject)}
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


