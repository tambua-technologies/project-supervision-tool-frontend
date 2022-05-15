import React from "react";
import PropTypes from 'prop-types';
import { moneyFormat } from "../../../../../../../../../../Util";
import SideNavItemOverview from "../../../ProjectsMenuItemDetails/components/SideNavItemOverview";
import './styles.css';

/**
 * @function
 * @name DistrictsSubProjectsOverview
 * @description renders project overview at regional level
 */
function DistrictsSubProjectsOverview({
    setShowRegionalOverview,
    setShowDistrictsOverview,
     districtsSubProjects,
    showDistrictsOverviewLoader,
    // regionSubProjectStatistics,
    // region,
    getSubProject,
    clearDistrictsSubProjects
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
    const overViewData = districtsSubProjects ? [
        { title: 'Sub Projects', value: districtsSubProjects.length },
        { title: 'Commitment Amount', value: "23456 USD" },
        { title: 'Districts', value: "2" },

    ] : [];


    // config data from the predefined filter
    const filterConfig = { filterTitle: 'Sub Project(s)', filterRightTitle: 'Sub Project(s)', filterLeftTitle: 'Phase' }

    // prepare data to display on predefined filter
    const filterData = districtsSubProjects?.length > 0 ? districtsSubProjects.map(({ name, details, id }) =>
        ({ title: name, value: details.phase.name, id })) : '';

    const handleOnClickFilterItem = (id) => {
        getSubProject(id)
        console.log("clicked" + id)
    };

    const handleGoBack = () => {
        setShowRegionalOverview(true);
        setShowDistrictsOverview(false);
        // clearDistrictsSubProjects()
    }
    return (
        <SideNavItemOverview
            overViewData={overViewData}
            predefinedFilterConfig={filterConfig}
            predefinedFilterData={filterData}
            showDistrictsOverviewLoader={showDistrictsOverviewLoader}
            title={districtsSubProjects?.[0].sub_project_locations.map(({district}) => district.name)} 
            handleOnclickFilterItem={handleOnClickFilterItem}
            goBack={handleGoBack}
        />
    );

}

export default DistrictsSubProjectsOverview;

DistrictsSubProjectsOverview.propTypes = {
    regionSubProjectStatistics: PropTypes.object,
    region: PropTypes.object,
    setShowRegionalOverview: PropTypes.func.isRequired,
    setShowDistrictsOverview: PropTypes.func.isRequired,
    clearDistrictsSubProjects: PropTypes.func.isRequired,
    districtsSubProjects: PropTypes.array.isRequired,
    getSubProject: PropTypes.func.isRequired,
    showDistrictsOverviewLoader: PropTypes.bool,
}

DistrictsSubProjectsOverview.defaultProps = {
    region: null,
    regionSubProjectStatistics: null,
}
