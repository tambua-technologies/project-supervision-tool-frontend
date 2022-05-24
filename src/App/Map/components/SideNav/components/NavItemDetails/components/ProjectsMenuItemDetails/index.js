import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {mapSelectors} from '../../../../../../../../redux/modules/map';
import ProjectsOverview from "./components/ProjectOverview";
import ProjectDetails from "./components/ProjectDetails";

/**
 * @function
 * @name ProjectsMenuItemDetails
 * @description shows project menu item details such as project overview
 * and project details
 */
function ProjectsMenuItemDetails({ isShowProjectOverview, isShowProjectDetails }) {

    return (
        <>
            {isShowProjectOverview ? <ProjectsOverview/> : ''}
            {isShowProjectDetails ? <ProjectDetails/> : ''}
        </>
    );

}

const mapStateToProps = state => ({
    isShowProjectOverview: mapSelectors.showProjectsOverviewSelector(state),
    isShowProjectDetails: mapSelectors.showProjectDetailsSelector(state),
});



export default connect(mapStateToProps)(ProjectsMenuItemDetails);

ProjectsMenuItemDetails.propTypes = {
    isShowProjectOverview: PropTypes.bool.isRequired,
    isShowProjectDetails: PropTypes.bool.isRequired,
}
