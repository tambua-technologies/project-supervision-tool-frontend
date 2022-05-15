import React from "react";
import PropTypes from 'prop-types';
import SideNavItemOverview from "../../../ProjectsMenuItemDetails/components/SideNavItemOverview";
import './styles.css';

/**
 * @function
 * @name RegionalSubProjectsOverview
 * @description renders project overview at regional level
 */
function RegionalSubProjectsOverview({
    setShowNationalOverview,
    setShowRegionalOverview,
    getSubProject,
    regionSubProjectsOverView,
    showRegionalOverviewLoader,
    regionSubProjectStatistics,
    region,
    getDistricts,
    clearRegionSubProjects
}) {

    
    // // generate project commitment amount string
    // const getCommitmentAmount = ({ commitment_amount }) => {
    //     if(commitment_amount !== null ){
    //     const { iso, total } = commitment_amount;
    //     const money = moneyFormat(total);
    //     return `${iso} ${money}`;
    //     }
    //     else {
    //         return 0;
    //     }
    // }

    // data tobe displayed  on the overview filter
    const overViewData = regionSubProjectStatistics ? [
        { title: 'Sub Projects', value: regionSubProjectStatistics.sub_projects },
        { title: 'Commitment Amount', value: "23456 USD" },
        { title: 'Districts', value: "2" },

    ] : [];


    // config data from the predefined filter
    const filterConfig = { filterTitle: 'Districts', filterRightTitle: 'Districts', filterLeftTitle: 'Sub Project(s)' }

    // prepare data to display on predefined filter
    const filterData = regionSubProjectsOverView?.length > 0 ? regionSubProjectsOverView.map(({ name, sub_projects_count, id }) =>
        ({ title: name, value: sub_projects_count, id })) : '';

    const handleOnClickFilterItem = (id) => {
        // getSubProject(id);
        getDistricts(id)
        console.log("clicked" + id)
    };

    const handleGoBack = () => {
        setShowNationalOverview(true);
        setShowRegionalOverview(false);
        clearRegionSubProjects()
    }

    return (
        <SideNavItemOverview
            overViewData={overViewData}
            predefinedFilterConfig={filterConfig}
            predefinedFilterData={filterData}
            showRegionalOverviewLoader={showRegionalOverviewLoader}
            title={region?.name}
            handleOnclickFilterItem={handleOnClickFilterItem}
            goBack={handleGoBack}
        />
    );

}

export default RegionalSubProjectsOverview;

RegionalSubProjectsOverview.propTypes = {
    regionSubProjectStatistics: PropTypes.object,
    region: PropTypes.object,
    setShowNationalOverview: PropTypes.func.isRequired,
    setShowRegionalOverview: PropTypes.func.isRequired,
    clearRegionSubProjects: PropTypes.func.isRequired,
    regionSubProjectsOverView: PropTypes.array.isRequired,
    getSubProject: PropTypes.func.isRequired,
    showRegionalOverviewLoader: PropTypes.bool,
}

RegionalSubProjectsOverview.defaultProps = {
    region: null,
    regionSubProjectStatistics: null,
}
