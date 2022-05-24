import React, {useEffect, useState}from "react";
import PropTypes from 'prop-types';
import CheckBoxGroupFilter from "../../../../../../../../../components/CheckBoxGroupFilter";

const prepareFilterItems = (items) => items.map(({ name, id, }) => ({
    title: name,
    value: name,
    id
}));

const ProjectsFilter = ({ projects,setProjectIdFilter, getProject,getSubProjectsByProjectId }) => {

    const projectsFilterData = projects.length > 0 ? prepareFilterItems(projects) : [];
   
    const [projectsIds, setProjectId] = useState([]);

    useEffect(() => {
        setProjectIdFilter(projectsIds.join(','));
    }, [projectsIds]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleOnClickFilterValue = (value) => {
        getSubProjectsByProjectId(value);
        getProject(value);
    };



    const handleOnclickFilterItem = (project_id) => {
        if (projectsIds.includes(project_id)) {
            const filterUncheckedItem = projectsIds.filter((i) => i !== project_id);
            setProjectId(filterUncheckedItem);
        }
        else {
            setProjectId([...projectsIds, project_id]);
        }
     }

    return (
        <CheckBoxGroupFilter
            items={projectsFilterData}
            itemsPerPage={5}
            handleOnClickFilterValue={handleOnClickFilterValue}
            handleFilter={handleOnclickFilterItem}
            filterClass="projectFilter"
        />
    )
}

export default ProjectsFilter;

ProjectsFilter.propTypes = {
    projects: PropTypes.array.isRequired,
    handleOnclickFilterItem:PropTypes.func.isRequired,
    getProject:PropTypes.func.isRequired,
    getSubProjectsByProjectId: PropTypes.func.isRequired,
}
ProjectsFilter.defaultProps = {
    handleOnclickFilterItem: () => {
    },
}
