import React from "react";
import PropTypes from 'prop-types';
import {GeoJSON, Popup} from 'react-leaflet';
import SubProjectPopupDetail from "./SubProjectPopup";

function SubProjectLocations({subProjects, getSubproject}) {


    return (
        <>
            {
                subProjects.map((subProject) =>
                    <GeoJSON data={subProject.geo_json}>
                        <Popup>
                            <SubProjectPopupDetail subProject={subProject}/>
                        </Popup>
                    </GeoJSON>
                )
            }
        </>

    );
}

export default SubProjectLocations;

SubProjectLocations.propTypes = {
    subProjects: PropTypes.array.isRequired,
    getSubproject: PropTypes.func.isRequired,
}
