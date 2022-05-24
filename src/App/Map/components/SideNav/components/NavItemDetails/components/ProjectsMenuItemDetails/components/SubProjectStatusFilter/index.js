import React, {useEffect, useState}from "react";
import PropTypes from 'prop-types';
import CheckBoxGroupFilter from "../../../../../../../../../components/CheckBoxGroupFilter";

const prepareFilterItems = (items) => items.map(({ name, id, }) => ({
    title: name,
    value: name,
    id
}));

const SubProjectStatusFilter = ({ subProjectStatus,setSubProjectStatusFilter }) => {

    const subProjectStatusFilterData = subProjectStatus.length > 0 ? prepareFilterItems(subProjectStatus) : [];
   
    const [subProjectStatusIds, setSubProjectStatusId] = useState([]);

    useEffect(() => {
        setSubProjectStatusFilter(subProjectStatusIds.join(','));
    }, [subProjectStatusIds]); // eslint-disable-line react-hooks/exhaustive-deps


    const handleOnclickFilterItem = (project_id) => {
        if (subProjectStatusIds.includes(project_id)) {
            const filterUncheckedItem = subProjectStatusIds.filter((i) => i !== project_id);
            setSubProjectStatusId(filterUncheckedItem);
        }
        else {
            setSubProjectStatusId([...subProjectStatusIds, project_id]);
        }
     }

    return (
       
            <CheckBoxGroupFilter
            items={subProjectStatusFilterData}
            itemsPerPage={5}
            handleFilter={handleOnclickFilterItem}
            // filterClass="projectFilter"
        />         
    )
}

export default SubProjectStatusFilter;

SubProjectStatusFilter.propTypes = {
    subProjectStatus: PropTypes.array.isRequired,
    handleOnclickFilterItem:PropTypes.func.isRequired,
    getProject:PropTypes.func.isRequired,

}
SubProjectStatusFilter.defaultProps = {
    handleOnclickFilterItem: () => {
    },
}
