import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import CheckBoxGroupFilter from "../../../../../../../../../components/CheckBoxGroupFilter";

const prepareFilterItems = (items) => items.map(({ name, id, projects_count }) => ({
    title: name,
    value: name,
    total_count: projects_count,
    id
}));

const ContractorsFilter = ({ contractors, setSubProjectContractorsFilter }) => {


    const [contractorsIds, setContractorsId] = useState([]);
    useEffect(() => {
        setSubProjectContractorsFilter(contractorsIds.join(','));
    }, [contractorsIds]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleOnclickFilterItem = (status_id) => {
        if (contractorsIds.includes(status_id)) {
            const filterUncheckedItem = contractorsIds.filter((i) => i !== status_id);
            setContractorsId(filterUncheckedItem);
        }
        else {
            setContractorsId([...contractorsIds, status_id]);
        }

    }

    const contractorsFilterData = contractors.length > 0 ? prepareFilterItems(contractors) : [];

    return (
        <CheckBoxGroupFilter
            items={contractorsFilterData}
            itemsPerPage={5}
            // filterTitle={`Contractors`}
            // filterClass={`projectFilter`}
            handleFilter={handleOnclickFilterItem}
            projectFilterClass="contractorFilter"
        />
    )
}

export default ContractorsFilter;

ContractorsFilter.propTypes = {
    contractors: PropTypes.array.isRequired
}
