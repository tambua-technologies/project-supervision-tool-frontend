import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import MultlevelFilter from "../../../../../../../../../components/CheckBoxGroupFilter/MultlevelFilter";

const prepareFilterItems = (items, districts) => items.map(({ name, id }) => ({
    title: name,
    id,
    children: districts,
})
);

const SubProjectRegionsFilter = ({ project, getDistricts, districts, setSubProjectDistrictsFilter }) => {

    const { regions } = project;
    const regionsFilterData = regions?.length > 0 ? prepareFilterItems(regions, districts) : [];

    useEffect(() => {
        getDistricts(regionsFilterData.map(({ id }) => id));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (

        <MultlevelFilter
            items={regionsFilterData}
            handleFilter={setSubProjectDistrictsFilter}
        />
    )
}

export default SubProjectRegionsFilter;

SubProjectRegionsFilter.propTypes = {
    region: PropTypes.array.isRequired
}
