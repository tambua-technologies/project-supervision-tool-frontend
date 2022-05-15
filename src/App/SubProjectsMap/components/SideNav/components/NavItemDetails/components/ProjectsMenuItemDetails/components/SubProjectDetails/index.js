import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BackLink from "../BackLink";
import CustomGridList from "../CustomGridList";
import PredefinedFilter from "../PredefinedFilter";
import LongActionButton from "../LongActionButton";
import { mapActions } from "../../../../../../../../../../redux/modules/map";
import { bindActionCreators } from "redux";
import { projectActions, projectSelectors } from "../../../../../../../../../../redux/modules/projects";
import { isoDateToHumanReadableDate } from "../../../../../../../../../../Util";
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';
import './styles.css';
import { mapSubProjectSelectors } from "../../../../../../../../../../redux/modules/map/subProjects";


/**
 * @function
 * @name mapToSideMenuObject
 * @description helper function that maps complex subProject object to a simple object
 *  for displaying
 *  @param subProject
 *  @return {Object}
 */
const mapToSideMenuObject = ({ details, name, description, sub_project_items }) => {
    const contractor = details?.contractor?.name;
    const consultant = details?.supervising_agency?.name;
    const lga = details?.actor?.name;
    const customGridListData = [
        { title: 'START DATE', value: isoDateToHumanReadableDate(details?.start_date) },
        { title: 'closing date', value: isoDateToHumanReadableDate(details?.end_date) },
        { title: 'phase', value: details?.phase?.name }
    ];
    const subProjectElementsData = sub_project_items.map(({ name, id, progress }) => ({ title: name, value: `${progress.actual}%`, id }));

    return {
        contractor,
        consultant,
        lga,
        description,
        customGridListData,
        subProjectElementsData,
        name,
    };

}

/**
 * @function
 * @name SubProjectDetails
 * @description renders sub project details
 */
function SubProjectDetails({ goBackFromSubProjectToProjectDetails, subProject, getSubProjectElement, subProjectLoader }) {

    const sideMenuObj = subProject ? mapToSideMenuObject(subProject) : null;
    const history = useHistory();

    const viewFullSubProjectDetails = () => history.push(`/app/sub_projects/${subProject.id}`);


    return (
        <div className='SubProjectDetails'>

            <section className="top-section">
                <div className='title'>
                    <div title='Sample Subproject'>{sideMenuObj?.name}</div>
                </div>
            </section>
            <hr />
            { subProject ?
                <div>
                    <section>
                        <div><b>contractor:</b> {sideMenuObj?.contractor}</div>
                        <div><b>consultant:</b> {sideMenuObj?.consultant}</div>
                        <div><b>LGA:</b> {sideMenuObj?.lga}</div>
                    </section>

                    <hr />
                    <section>{sideMenuObj?.description}</section>
                    {sideMenuObj?.customGridListData ? <CustomGridList data={sideMenuObj?.customGridListData} /> : ''}
                    <LongActionButton
                        handleOnclick={viewFullSubProjectDetails}
                        title='view full sub-project details'
                    />
                </div> : <Spin spinning={subProjectLoader} style={{ paddingLeft: 125, paddingTop: 150 }} />}
        </div>
    );
}

const mapStateToProps = (state) => ({
    subProject: mapSubProjectSelectors.getSubProjectSelector(state),
    subProjectLoader: projectSelectors.getSubProjectLoadingSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
    getSubProjectElement: bindActionCreators(projectActions.getSubProjectElementStart, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(SubProjectDetails);

SubProjectDetails.propTypes = {
    goBackFromSubProjectToProjectDetails: PropTypes.func.isRequired,
    getSubProjectElement: PropTypes.func.isRequired,
    subProject: PropTypes.object
}

SubProjectDetails.defaultPropTypes = {
    subProject: null,
}
