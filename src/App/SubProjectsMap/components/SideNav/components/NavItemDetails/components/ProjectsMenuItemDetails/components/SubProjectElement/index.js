import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import BackLink from "../BackLink";
import './styles.css';
import CustomGridList from "../CustomGridList";
import LongActionButton from "../LongActionButton";
import {mapActions} from "../../../../../../../../../../redux/modules/map";
import {bindActionCreators} from "redux";
import {projectSelectors} from "../../../../../../../../../../redux/modules/projects";


/**
 * @function
 * @name mapToSideMenuObject
 * @description helper function that maps complex subProjectElement object to a simple object
 *  for displaying
 *  @param subProjectElement
 *  @return {Object}
 */
const mapToSideMenuObject = ({ name, description , progress}) => {
    const customGridListData = [
        {title: 'ACTUAL PROGRESS', value: `${progress.actual}%`},
        {title: 'PLANNED PROGRESS', value: `${progress.planned }%`},
    ];

    return {
        description,
        customGridListData,
        name,
    };

}

/**
 * @function
 * @name SubProjectElementDetails
 * @description renders sub project details
 */
function SubProjectElementDetails({goBackFromSubProjectElementToSubProjectDetails, subProjectElement}) {
    const handleGoBack = () => goBackFromSubProjectElementToSubProjectDetails(subProjectElement?.sub_project_id);

    const sideMenuObj = subProjectElement ? mapToSideMenuObject(subProjectElement) : null;

    const viewFullSubProjectElementDetails = () => console.log('View full sub project details clicked');


    return (
        <div className='SubProjectElementDetails'>
            <section className="top-section">
                <div className='title'>
                    <div title='Sample Subproject'>{sideMenuObj?.name}</div>
                </div>
                <BackLink goBack={handleGoBack}/>
            </section>
            <hr/>
            <section>{sideMenuObj?.description}</section>
            {sideMenuObj?.customGridListData ? <CustomGridList data={sideMenuObj?.customGridListData}/> : ''}
            <LongActionButton
                handleOnclick={viewFullSubProjectElementDetails}
                title='view full sub-project element details'
            />
        </div>
    );

}

const mapStateToProps = (state) => ({
    subProjectElement: projectSelectors.getSubProjectElementSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
    goBackFromSubProjectElementToSubProjectDetails: bindActionCreators(mapActions.backFromSubProjectElementToSubProjectDetails, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(SubProjectElementDetails);

SubProjectElementDetails.propTypes = {
    goBackFromSubProjectElementToSubProjectDetails: PropTypes.func.isRequired,
    subProjectElement: PropTypes.object
}

SubProjectElementDetails.defaultPropTypes = {
    subProjectElement: null,
}
