import React from "react";
import PropTypes from 'prop-types';
import MultlevelFilter from "../../../../../../../../../components/CheckBoxGroupFilter/MultlevelFilter";

const prepareFilterItems = (items) => items.map(({ name, id, sub_components }) => ({
    title: name,
    id,
    children: sub_components,
})
);


const ComponentSubComponentFilter = ({ setComponentsSubComponentFilter, project }) => {
  
const itemsData = project.components.length > 0 ? prepareFilterItems(project.components) : [];

    return (
        <MultlevelFilter
            items={itemsData}
            handleFilter={setComponentsSubComponentFilter}
        />
    )
}

export default ComponentSubComponentFilter;

ComponentSubComponentFilter.propTypes = {
    project: PropTypes.object.isRequired
}
