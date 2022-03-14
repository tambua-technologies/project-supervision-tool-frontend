import React, {useEffect, useState}from "react";
import PropTypes from 'prop-types';
import CheckBoxGroupFilter from "../../../../../../../../../components/CheckBoxGroupFilter";

const prepareFilterItems = (items) => items.map(({ name, id, }) => ({
    title: name,
    value: name,
    id
}));

const SubProjectTypesFilter = ({ subProjectTypes,setSubProjectTypesFilter }) => {

    const SubprojectTypesFilterData = subProjectTypes.length > 0 ? prepareFilterItems(subProjectTypes) : [];
   
    const [subProjectTypesIds, setProjectId] = useState([]);

    useEffect(() => {
        setSubProjectTypesFilter(subProjectTypesIds.join(','));
    }, [subProjectTypesIds]); // eslint-disable-line react-hooks/exhaustive-deps


    const handleOnclickFilterItem = (project_id) => {
        if (subProjectTypesIds.includes(project_id)) {
            const filterUncheckedItem = subProjectTypesIds.filter((i) => i !== project_id);
            setProjectId(filterUncheckedItem);
        }
        else {
            setProjectId([...subProjectTypesIds, project_id]);
        }
     }

    return (
        <CheckBoxGroupFilter
            items={SubprojectTypesFilterData}
            itemsPerPage={5}
            // filterTitle={`Subproject Types`}
            handleFilter={handleOnclickFilterItem}
            // filterClass="projectFilter"
        />
    )
}

export default SubProjectTypesFilter;

SubProjectTypesFilter.propTypes = {
    subProjectTypes: PropTypes.array.isRequired,
    handleOnclickFilterItem:PropTypes.func.isRequired,
    getProject:PropTypes.func.isRequired,

}
SubProjectTypesFilter.defaultProps = {
    handleOnclickFilterItem: () => {
    },
}
