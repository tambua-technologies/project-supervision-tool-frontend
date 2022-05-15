import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import './styles.css';
import SideNavItemOverview from "../../../ProjectsMenuItemDetails/components/SideNavItemOverview";

/**
 * @function
 * @name NationalSubProjectsOverview
 * @description renders project overview at national level
 */
function NationalSubProjectsOverview(
    {
        subProjectsStatistics,
        loadingStatistics,
        getSubProjectsOverview,
        subProjectCountByRegion,
        getSubProjectsByRegion,
    }
    ) {

    // get project overview when
    // a  component has mounted
    useEffect(() => {
        getSubProjectsOverview();
    }, []);


    // transform data into structure that
    // filter can display
    const getFilterData = (items) => items.map(({name, sub_projects_count, id}) => ({
        title: name,
        value: sub_projects_count,
        id
    }));


    // prepare data for projects overview table
    const overViewData = subProjectsStatistics ? [
        {title: 'Sub Projects', value: subProjectsStatistics.sub_projects,},
        {title: 'Regions', value: subProjectsStatistics.regions},
        {title: 'Districts', value: subProjectsStatistics.districts},

    ] :  []
    ;

    const handleOnClickFilterItem = (id) => getSubProjectsByRegion(id);

    // prepare data for ProjectsRegionsPredefinedFilter
    const filterConfig = {filterTitle: 'Regions', filterRightTitle: 'Regions', filterLeftTitle: 'Sub Projects'}
    const filterData = subProjectCountByRegion?.length > 0 ? getFilterData(subProjectCountByRegion) : []

    return (
        <SideNavItemOverview
            overViewData={overViewData}
            predefinedFilterData={filterData}
            predefinedFilterConfig={filterConfig}
            loadingStatistics={loadingStatistics}
            handleOnclickFilterItem={handleOnClickFilterItem}
            title='National Overview'
        />
    );

}

export default NationalSubProjectsOverview;

NationalSubProjectsOverview.propTypes = {
    subProjectsStatistics: PropTypes.object,
    getSubProjectsOverview: PropTypes.func.isRequired,
    getSubProjectsByRegion: PropTypes.array.isRequired,

}

NationalSubProjectsOverview.defaultProps = {
    subProjectsStatistics: null,
}
