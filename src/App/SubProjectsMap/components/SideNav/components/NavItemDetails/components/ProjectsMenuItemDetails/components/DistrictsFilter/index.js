import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import CheckBoxGroupFilter from "../../../../../../../../../components/CheckBoxGroupFilter";

const prepareFilterItems = (items) => items.map(({ name, id, projects_count }) => ({
    title: name,
    value: name,
    total_count: projects_count,
    id
}));

const DistrictsFilter = ({ districts, setSubProjectDistrictsFilter }) => {


    const [districtsIds, setRegionId] = useState([]);
    useEffect(() => {
        setSubProjectDistrictsFilter(districtsIds.join(','));
    }, [districtsIds]);

    const handleOnclickFilterItem = (status_id) => {
        if (districtsIds.includes(status_id)) {
            const filterUncheckedItem = districtsIds.filter((i) => i !== status_id);
            setRegionId(filterUncheckedItem);
        }
        else {
            setRegionId([...districtsIds, status_id]);
        }

    }

    const DistrictsFilterData = districts.length > 0 ? prepareFilterItems(districts) : [];

    return (
        <CheckBoxGroupFilter
            items={DistrictsFilterData}
            itemsPerPage={5}
            filterTitle={`Districts`}
            // filterClass={`projectFilter`}
            handleFilter={handleOnclickFilterItem}
            projectFilterClass="districtFilter"
        />
    )
}

export default DistrictsFilter;

DistrictsFilter.propTypes = {
    districts: PropTypes.array.isRequired
}
