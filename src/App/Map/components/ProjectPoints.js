import { Popup, Marker } from "react-leaflet";
import { divIcon } from 'leaflet';
import React from "react";
import PropTypes from 'prop-types';
import * as turf from '@turf/turf';
import ProjectPopupDetail from "./ProjectPopup";
import { invertColor, moneyFormatWithApproximation } from "../../../Util";
import Legend from "./Legend";


function ProjectPoints({ projects, loading, getProject }) {

    const getMarkerDiameter = (amount, maxAmount, maxDiameter = 40, minDiameter = 20) => {
        const diameter = amount * maxDiameter / maxAmount;
        if (diameter > minDiameter) return diameter;
        return minDiameter;
    }

    const getMaxAmount = (projects) => {
        const commitment_amounts = projects.map(({ commitment_amount  }) => commitment_amount.amount);
        return Math.max(...commitment_amounts);
    }

    return (
        <>
            { projects.map((project) => {
                const { regions, id, commitment_amount, color } = project;

                const invertedColor = invertColor(color);

                // dimesion required for displaying markers
                const { amount } = commitment_amount;
                const commitment_money = moneyFormatWithApproximation(amount)
                const maxAmount = getMaxAmount(projects);
                const dimension = getMarkerDiameter(amount, maxAmount);

                return regions.length > 0 ? regions.map((region) => {
                    const polygon = JSON.parse(region.geom);
                    const { geometry } = turf.pointOnFeature(polygon);

                    const customizedIcon = divIcon({
                        className: 'customizedIcon',
                        html: `<div  style='background-color:${color}; width: ${dimension}px ;height: ${dimension}px;' class='marker-pin'>
                            </div>
                            <h4 style='color: ${invertedColor}; top: ${dimension / 2}px; left: ${dimension / 2}px; font-size: ${dimension / 4}px'> 
                            ${commitment_money}
                            </h4>`,
                        iconSize: [dimension, 42],
                        iconAnchor: [0, 0],
                        key:id
                    });

                    return (
                        <div key={id}>
                            <Marker
                                position={[geometry.coordinates[1], geometry.coordinates[0]]}
                                title={region.name}
                                key={region.id}
                                icon={customizedIcon}
                            >   
                                <Popup >
                                    <ProjectPopupDetail project={project} loading={loading}  key={region.id} />
                                </Popup>
                            </Marker>
                            <Legend projects={projects} />
                        </div>

                    );
                }) : '';

            })}
        </>);
}


export default ProjectPoints;

ProjectPoints.propTypes = {
    projects: PropTypes.array.isRequired,
    project: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    getProject: PropTypes.func,
}
