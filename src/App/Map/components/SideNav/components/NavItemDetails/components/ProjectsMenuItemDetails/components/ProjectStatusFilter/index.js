import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import CheckBoxGroupFilter from "../../../../../../../../../components/CheckBoxGroupFilter";

const ProjectStatusFilter = ({statuses,setProjectStatusFilter}) => {

const [statusIds, setStatusId] = useState([]);
    useEffect(() => {
        setProjectStatusFilter(statusIds.join(','));
    }, [statusIds]); // eslint-disable-line react-hooks/exhaustive-deps


const getFilterData = (items) => items.map(({name, description, id}) => ({
        title: description,
        value: name,
        id
    }));

const statusFilter = statuses.length > 0 ? getFilterData(statuses) : []


 const handleOnclickFilterItem = (status_id) => {
    if (statusIds.includes(status_id)) {
        const filterUncheckedItem = statusIds.filter((i) => i !== status_id);
        setStatusId(filterUncheckedItem);
    }
    else {
        setStatusId([...statusIds, status_id]);
    }

 }

    return (
        <CheckBoxGroupFilter
            items={statusFilter}
            itemsPerPage={5}
            // filterTitle={`Project Status`}
            handleFilter={handleOnclickFilterItem}
            filterClass="statusFilter"
        />
    )
}

export default ProjectStatusFilter;

ProjectStatusFilter.propTypes = {
    statuses: PropTypes.array.isRequired,
    handleOnclickFilterItem:PropTypes.func.isRequired,
}

ProjectStatusFilter.defaultProps = {
    handleOnclickFilterItem: () => {
    },
}
