import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import CheckBoxGroupFilter from "../../../../../../../../../components/CheckBoxGroupFilter";

const prepareFilterItems = (items) => items.map(({ name, id, projects_count }) => ({
    title: name,
    value: name,
    total_count: projects_count,
    id
}));

const RegionsFilter = ({ regions, setProjectRegionsFilter }) => {


    const [regionsIds, setRegionId] = useState([]);
    useEffect(() => {
        setProjectRegionsFilter(regionsIds.join(','));
    }, [regionsIds]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleOnclickFilterItem = (status_id) => {
        if (regionsIds.includes(status_id)) {
            const filterUncheckedItem = regionsIds.filter((i) => i !== status_id);
            setRegionId(filterUncheckedItem);
        }
        else {
            setRegionId([...regionsIds, status_id]);
        }

    }

    const regionsFilterData = regions.length > 0 ? prepareFilterItems(regions) : [];

    return (
        <CheckBoxGroupFilter
            items={regionsFilterData}
            itemsPerPage={5}
            // filterTitle={`Regions`}
            // filterClass={`projectFilter`}
            handleFilter={handleOnclickFilterItem}
            projectFilterClass="regionFilter"
        />
    )
}

export default RegionsFilter;

RegionsFilter.propTypes = {
    regions: PropTypes.array.isRequired
}
