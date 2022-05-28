import PropTypes from "prop-types";
import React from "react";

function LayerItemDetails({layer}) {
    const {name, abstract, data_quality_statement, supplemental_information} = layer
    return (
        <div className='DataSetTitleHoverInfo'>
            <div>Name: {name}</div>
            <div>Abstract: {abstract}</div>
            <div>Data Quality Statement: {data_quality_statement}</div>
            <div>Supplemental Information: {supplemental_information}</div>
        </div>
    )
}

export default LayerItemDetails;

LayerItemDetails.propTypes = {
    layer: PropTypes.object.isRequired
}
