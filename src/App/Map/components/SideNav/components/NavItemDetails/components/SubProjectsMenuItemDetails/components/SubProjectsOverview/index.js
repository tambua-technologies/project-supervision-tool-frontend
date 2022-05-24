import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { mapSubProjectActions, mapSubProjectSelectors } from '../../../../../../../../../../redux/modules/map/subProjects';
import NationalSubProjectsOverview from "../NationalSubProjectsOverview";
import RegionalSubProjectsOverview from "../RegionalSubProjectsOverview";
import TopSection from "../../../TopSection";
import {  mapSelectors } from "../../../../../../../../../../redux/modules/map";
import DistrictsSubProjectsOverview from "../DistrictsSubProjectsOverview";

const SubProjectsOverview = ({
    subProjectsStatistics,
    getSubProjectsByRegion,
    subProjectCountByRegion,
    getSubProjectsOverview,
    showSubProjectsNationalOverview,
    regionSubProjectStatistics,
    loadingStatistics,
    showRegionalOverview,
    showRegionalOverviewLoader,
    regionSubProjectsOverView,
    setShowRegionalOverview,
    setShowNationalOverview,
    getSubProject,
    region,
    getDistricts,
    clearRegionSubProjects,
    showDistrictsSubProjectOverview,
    setShowDistrictsOverview,
    showDistrictsOverviewLoader,
    clearDistrictsSubProjects,
    districtsSubProjects
}) => {
    return (
        <>
            <TopSection  title='SUB PROJECTS'  searchPlaceHolder='Search SubProjects'/>
            { showSubProjectsNationalOverview ? <NationalSubProjectsOverview
                getSubProjectsOverview={getSubProjectsOverview}
                subProjectsStatistics={subProjectsStatistics}
                subProjectCountByRegion={subProjectCountByRegion}
                loadingStatistics={loadingStatistics}
                getSubProjectsByRegion={getSubProjectsByRegion}
            /> : ''}
            {showRegionalOverview ? <RegionalSubProjectsOverview
                regionSubProjectStatistics={regionSubProjectStatistics}
                showRegionalOverviewLoader={showRegionalOverviewLoader}
                regionSubProjectsOverView={regionSubProjectsOverView}
                setShowNationalOverview={setShowNationalOverview}
                setShowRegionalOverview={setShowRegionalOverview}
                getDistricts={getDistricts}
                region={region}
                clearRegionSubProjects={clearRegionSubProjects}
            /> : ''}
            {
            showDistrictsSubProjectOverview ? 
            <DistrictsSubProjectsOverview 
            setShowDistrictsOverview={setShowDistrictsOverview}
            setShowRegionalOverview={setShowRegionalOverview}
            showDistrictsOverviewLoader={showDistrictsOverviewLoader}
            getSubProject={getSubProject}
            clearDistrictsSubProjects={clearDistrictsSubProjects}
            districtsSubProjects={districtsSubProjects}
            /> : ''
            }
        </>
    );
}

const mapStateToProps = state => ({
    subProjectsStatistics: mapSubProjectSelectors.getSubProjectsStatistics(state),
    loadingStatistics: mapSubProjectSelectors.getSubProjectsStatisticsLoading(state),
    showSubProjectsNationalOverview: mapSubProjectSelectors.showSubProjectNationalOverview(state),
    subProjectCountByRegion: mapSubProjectSelectors.getSubProjectsOverviewSelector(state),
    regionSubProjectStatistics: mapSubProjectSelectors.getRegionSubProjectsStatistics(state),
    showRegionalOverview: mapSubProjectSelectors.showRegionalOverviewSelector(state),
    showRegionalOverviewLoader: mapSubProjectSelectors.getRegionSubProjectsStatisticsLoader(state),
    showDistrictsOverviewLoader: mapSubProjectSelectors.getDistrictsSubProjectsLoader(state),
    regionSubProjectsOverView: mapSubProjectSelectors.getRegionSubProjectsOverviewSelector(state),
    region: mapSelectors.getRegionDetailsSelector(state),
    showDistrictsSubProjectOverview: mapSubProjectSelectors.showDistrictsSubProjectOverview(state),
    districtsSubProjects: mapSubProjectSelectors.getDistrictsSubProjectsSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
    getSubProjectsOverview: bindActionCreators(mapSubProjectActions.getSubProjectOverviewStart, dispatch),
    getSubProjectsByRegion: bindActionCreators(mapSubProjectActions.getSubProjectsByRegionStart, dispatch),
    setShowRegionalOverview: bindActionCreators(mapSubProjectActions.showRegionSubProjectsOverview, dispatch),
    setShowNationalOverview: bindActionCreators(mapSubProjectActions.showNationalSubProjectsOverview, dispatch),
    setShowDistrictsOverview:bindActionCreators(mapSubProjectActions.showDistrictsSubProjectsOverview, dispatch),
    getSubProject:bindActionCreators(mapSubProjectActions.getSubProjectStart, dispatch),
    getDistricts:bindActionCreators(mapSubProjectActions.getDistrictsSubProjectsOverviewStart, dispatch),
    clearRegionSubProjects:bindActionCreators(mapSubProjectActions.clearRegionSubProjects, dispatch),
    clearDistrictsSubProjects:bindActionCreators(mapSubProjectActions.clearDistrictsPerRegion, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(SubProjectsOverview);

SubProjectsOverview.propTypes = {
    projectsStatistics: PropTypes.object,
    showSubProjectsNationalOverview: PropTypes.bool.isRequired,
}

SubProjectsOverview.defaultProps = {
    projectsStatistics: null,
}
