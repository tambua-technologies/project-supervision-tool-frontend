import React, {Component} from "react";
import {connect} from "react-redux";
import {Col, Drawer} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";
import Topbar from "../../../components/Topbar";
import CustomList from "../../../components/List";
import ListItem from "../../../components/ListItem";
import ListItemActions from "../../../components/ListItemActions";
import {Link} from "react-router-dom";
import {getIdFromUrlPath, getSurveyIdByCategory, showArchiveConfirm} from "../../../../Util";
import SubProjectForm from "../Form";
import {subProjectsActions, subProjectsSelectors} from "../../../../redux/modules/subProjects"
import {bindActionCreators} from "redux";
import {mapActions} from "../../../../redux/modules/map";
import PreviewOnMap from "../PreviewOnMap";
import SurveyForm from "../SurveyForm";
import DisplaySurveyForm from "../../../components/DisplaySurveyForm";
import {ticketActions, ticketSelectors} from "../../../../redux/modules/Tickets";
import TicketForm from '../../../Tickets/components/Form';
import BaseLayout from "../../../layouts/BaseLayout";
import DynamicBreadcrumbs from "../../../components/DynamicBreadcrumbs";
import { ProcuringEntityActions,ProcuringEntitySelectors } from "../../../../redux/modules/ProcuringEntities";
import "./styles.css";

/* constants */
const subProjectNameSpan = {xxl: 5, xl: 5, lg: 5, md: 5, sm: 20, xs: 20};
const projectIdSpan = {xxl: 4, xl: 4, lg: 4, md: 4, sm: 0, xs: 0};
const itemsSpan = {xxl: 4, xl: 4, lg: 4, md: 4, sm: 0, xs: 0};
const locationSpan = {xxl: 4, xl: 4, lg: 4, md: 4, sm: 0, xs: 0};
const statusSpan = {xxl: 4, xl: 4, lg: 4, md: 4, sm: 0, xs: 0};


const headerLayout = [
    {...subProjectNameSpan, header: "Name"},
    {...projectIdSpan, header: "Project"},
    {...itemsSpan, header: "Type"},
    {...locationSpan, header: "Location"},
    {...statusSpan, header: "Status"},

];


/**
 * @class
 * @name SubProjects
 * @description Render actions list which have search box, actions and Sub Projects list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class SubProjectsList extends Component {

    packageId = getIdFromUrlPath(this.props.match.url, 6);
    subProjectsFilter = {'filter[procuring_entity_package_id]': this.packageId};
    state = {
        showShare: false,
        isEditForm: false,
        cached: null,
        visible: false,
        previewOnMap: false,
        isSelected: false
    };

    componentDidMount() {
        const {fetchSubProjects, getProcuringEntityPackage} = this.props;
        fetchSubProjects(this.subProjectsFilter );
        getProcuringEntityPackage(this.packageId);
    }


    /**
     * @function
     * @name handleMapPreview
     * @description Handle map preview
     *
     * @version 0.1.0
     * @since 0.1.0
     */
    handleMapPreview = (item_id) => {
        const {getSubProject} = this.props;
        this.setState({previewOnMap: true})
        getSubProject(item_id);
        console.log(item_id)
        let path = '/app/map';
        this.props.history.push(path);
    };


    /**
     * @function
     * @name createSurvey
     * @description creates new survey through kobotoolbox and  attach to sub project
     *
     * @version 0.1.0
     * @since 0.1.0
     */
    createSurvey = (subProject) => {
        console.log('inside createSurvey', subProject)
    };


    /**
     * @function
     * @name handleViewDetails
     * @description Handle detail preview
     *
     * @version 0.1.0
     * @since 0.1.0
     */
    handleViewDetails = (item_id) => {
        const {getSubProject, match} = this.props;
        getSubProject(item_id);
        let path = `${match.url}/${item_id}`;
        this.props.history.push(path);
    };


    /**
     * @function
     * @name fillSurvey
     * @description Opens  kobotoolbox survey form
     * @version 0.1.0
     * @since 0.1.0
     */
    fillSurvey = (subProject) => {
        const {openSurveyForm, selectSubProject} = this.props;
        selectSubProject(subProject)
        openSurveyForm();
    };


    /**
     * @function
     * @name openSubProjectForm
     * @description Open Create SubProject form
     *
     * @version 0.1.0
     * @since 0.1.0
     */
    openSubProjectForm = () => {
        const {openSubProjectForm} = this.props;
        openSubProjectForm();
    };

    /**
     * @function
     * @name openSubProjectSurveyForm
     * @description Open Create SubProject Survey form
     *
     * @version 0.1.0
     * @since 0.1.0
     */
    openSubProjectSurveyForm = (subProject) => {
        const {openCreateSurveyForm, selectSubProject} = this.props;
        selectSubProject(subProject)
        openCreateSurveyForm();
    };

    /**
     * @function
     * @name closeSubProjectForm
     * @description close Create SubProject form
     *
     * @version 0.1.0
     * @since 0.1.0
     */
    closeSubProjectForm = () => {
        this.setState({isEditForm: false, visible: false});
        const {closeSubProjectForm, selectSubProject} = this.props;
        selectSubProject(null)
        closeSubProjectForm();
    };

    /**
     * @function
     * @name closeSubProjectSurveyForm
     * @description close Create Survey Form
     *
     * @version 0.1.0
     * @since 0.1.0
     */
    closeSubProjectSurveyForm = () => {
        const {closeSubProjectSurveyForm, selectSubProject} = this.props;
        selectSubProject(null)
        closeSubProjectSurveyForm();
    };

    /**
     * @function
     * @name handleEdit
     * @description Handle on Edit action for list item
     *
     * @param {object} subProject Action Catalogue to be edited
     *
     * @version 0.1.0
     * @since 0.1.0
     */
    handleEdit = (subProject) => {
        const {selectSubProject, openSubProjectForm, } = this.props;
        selectSubProject(subProject);
        this.setState({isEditForm: true});
        openSubProjectForm();
    };

    /**
     * @function
     * @name handleRefreshSubProjects
     * @description Handle list refresh action
     *
     * @version 0.1.0
     * @since 0.1.0
     */
    handleRefreshSubProjects = () => {
        const {page, fetchSubProjects} = this.props;
        fetchSubProjects({...this.subProjectsFilter, page});
    };

    /**
     * @function
     * @name searchSubProject
     * @description Handle list refresh action
     *
     * @version 0.1.0
     * @since 0.1.0
     */
    searchSubProject = (searchData) => {
        const {searchSubProject} = this.props;
        searchSubProject(searchData);
    };


    /**
     * @function
     * @name closeProjectSubComponentForm
     * @description close form
     *
     * @version 0.1.0
     * @since 0.1.0
     */
    closeProjectSubComponentForm = () => {
        this.setState({isEditForm: false, visible: false});
        const {closeProjectSubComponentForm} = this.props;
        closeProjectSubComponentForm();
    };

    /**
     * @function
     * @name openIssueForm
     * @description Open form
     *
     * @version 0.1.0
     * @since 0.1.0
     */
    openIssueForm = (sub_project) => {
        this.setState({isSelected: true});
        const {openTicketForm, selectSubProject} = this.props;
        selectSubProject(sub_project);
        openTicketForm();
    };

    /**
     * @function
     * @name closeIssueForm
     * @description close form
     * @version 0.1.0
     * @since 0.1.0
     */
    closeIssueForm = () => {
        this.setState({isEditForm: false, isSelected: false});
        const {closeTicketForm} = this.props;
        closeTicketForm();
    };

    render() {
        const {
            subProjects,
            searchQuery,
            loading,
            showForm,
            showSurveyForm,
            showTicketForm,
            page,
            total,
            paginateSubProject,
            closeCreateSurveyForm,
            showCreateSurveyForm,
            closeSurveyForm,
            selected,
            deleteSubproject,
            procuringEntityPackage
        } = this.props;
        
        const breadcrumbs = procuringEntityPackage ? [
            {
                title: 'Projects',
                url: '/projects',
                name: 'Projects'
            },
            {
                title: procuringEntityPackage?.procuring_entity?.project.code,
                url: `/projects/${procuringEntityPackage?.procuring_entity?.project.id}/`,
                name: procuringEntityPackage?.procuring_entity?.project.name
            },
            {
                title: `Procuring Entities`,
                url: `/projects/${procuringEntityPackage?.procuring_entity?.project.id}/procuring_entities`,
                name: `Procuring Entities under ${procuringEntityPackage?.procuring_entity?.project.name}(${procuringEntityPackage?.procuring_entity?.project.code})`
            },
            {
                title: `${procuringEntityPackage?.procuring_entity?.agency.name}`,
                url: `/projects/${procuringEntityPackage?.procuring_entity?.project.id}/procuring_entities/${procuringEntityPackage?.procuring_entity?.id}`,
                name: `${procuringEntityPackage?.procuring_entity?.agency.name}`
            },
            {
                title: `Packages`,
                url: `/projects/${procuringEntityPackage?.procuring_entity?.project.id}/procuring_entities/${procuringEntityPackage?.procuring_entity?.id}/packages`,
                name: `Packages procured in ${procuringEntityPackage?.procuring_entity?.agency.name}`
            },
            {
                title: `${procuringEntityPackage?.name}`,
                url: `/projects/${procuringEntityPackage?.procuring_entity?.project.id}/procuring_entities/${procuringEntityPackage?.procuring_entity?.id}/packages/${procuringEntityPackage?.id}`,
                name: `${procuringEntityPackage?.contract?.name}`
            },
            {
                title: `SubProjects`,
                url: this.props.match.url,
                name: `List of Sub Projects`
            }
        ]: [];


        const survey_id = selected?.surveys ? getSurveyIdByCategory('field_notes', selected?.surveys) : null;

        const {isEditForm, previewOnMap, isSelected} = this.state;
        return previewOnMap ? <PreviewOnMap data={selected}/> : (
            <BaseLayout breadcrumbs={<DynamicBreadcrumbs breadcrumbs={breadcrumbs}/>}>
                <div>
                    {/* Topbar */}
                    <Topbar
                        search={{
                            size: "large",
                            placeholder: "Search for Sub-project here ...",
                            onSearch: this.searchSubProject,
                            value: searchQuery
                        }}
                        actions={[
                            {
                                label: "New Sub-project",
                                icon: <PlusOutlined/>,
                                size: "large",
                                title: "Add New Sub-project",
                                onClick: this.openSubProjectForm,
                            },
                        ]}
                    />
                    {/* end Topbar */}

                    {/* list starts */}
                    <CustomList
                        itemName="Sub-projects"
                        items={subProjects}
                        page={page}
                        itemCount={total}
                        loading={loading}
                        onPaginate={(nextPage) => {
                            paginateSubProject(nextPage);
                        }}
                        onRefresh={this.handleRefreshSubProjects}
                        headerLayout={headerLayout}
                        renderListItem={({
                                             item,
                                         }) => (
                            <ListItem
                                key={item.id} // eslint-disable-line
                                name={item.name}
                                item={item}
                                renderActions={() => (
                                    <ListItemActions
                                        edit={{
                                            name: "Edit Sub-project",
                                            title: "Update Sub-project details",
                                            onClick: () => this.handleEdit(item),
                                        }}
                                        archive={{
                                            name: "Archive Sub-project",
                                            title:
                                                "Remove Sub project from list of active Sub Projects",
                                            onClick: () => showArchiveConfirm(item, deleteSubproject),
                                        }}
                                        view={
                                            {
                                                name: "View Details",
                                                title: "View more detail of selected sub project",
                                                onClick: () => this.handleViewDetails(item.id)
                                            }
                                        }
                                        createSurvey={
                                            {
                                                name: "Create Survey",
                                                title: "Create sub project survey",
                                                onClick: () => this.openSubProjectSurveyForm(item)
                                            }
                                        }
                                        openIssues={{
                                            name: "Create New Ticket",
                                            title:
                                                "Open Ticket to the this sub project",
                                            onClick: () => this.openIssueForm(item),
                                        }}
                                    />
                                )}
                            >
                                {/* eslint-disable react/jsx-props-no-spreading */}

                                <Col
                                    {...subProjectNameSpan}
                                    className="contentEllipse"
                                    title={item.description}
                                >
                                    {" "}
                                    <Link
                                        to={{
                                            pathname: `/app/sub_projects/${item.id}`,
                                        }}
                                        className="sub-project-list"
                                    >
                                        {item.name}
                                    </Link>

                                </Col>

                                <Col {...projectIdSpan} className="contentEllipse">

                                    {item?.project.code ? item?.project.code : "N/A"}
                                </Col>

                                <Col {...itemsSpan} className="contentEllipse">
                                    {item?.type ? item?.type?.name : 'N/A'}
                                </Col>
                                <Col {...locationSpan} className="contentEllipse">
                                    {item.district.name}
                                </Col>
                                <Col {...statusSpan}>
                                    {item?.status ? item?.status.name : 'N/A'}
                                </Col>
                                {/* eslint-enable react/jsx-props-no-spreading */}
                            </ListItem>
                        )}
                    />
                    {/* end list */}

                    {/* Sub project form */}
                    <Drawer
                        title={
                            isEditForm ? "Edit Sub Projects" : "Add New Sub Projects"}
                        width={550}
                        onClose={this.closeSubProjectForm}
                        footer={null}
                        visible={showForm}
                        bodyStyle={{paddingBottom: 80}}
                        destroyOnClose
                        maskClosable={false}
                
                        className="subProjectForm"
                    >
                        <SubProjectForm isEditForm={isEditForm} onCancel={this.closeSubProjectForm} procuringEntityPackage={procuringEntityPackage}
                                        closeSubProjectForm={this.closeSubProjectForm} selected={selected}/>
                    </Drawer>

                    {/* Create Survey form */}
                    <Drawer
                        width={550}
                        onClose={closeCreateSurveyForm}
                        footer={null}
                        visible={showCreateSurveyForm}
                        destroyOnClose
                        maskClosable={false}
                        className="surveyForm"
                    >
                        <SurveyForm onCancel={closeCreateSurveyForm} closeSubProjectSurveyForm={closeCreateSurveyForm}
                                    selected={selected}/>
                    </Drawer>

                    {/* Survey form */}
                    <Drawer
                        width={550}
                        onClose={closeSurveyForm}
                        footer={null}
                        visible={showSurveyForm}
                        destroyOnClose
                        maskClosable={false}
                    >
                        <DisplaySurveyForm survey_id={survey_id}/>
                    </Drawer>
                    <Drawer
                        title={
                            isEditForm ? "Edit Ticket" : "Add New Ticket"
                        } width={550}
                        onClose={this.closeIssueForm}
                        footer={null}
                        visible={showTicketForm}
                        bodyStyle={{paddingBottom: 80}}
                        destroyOnClose
                        maskClosable={false}
                        className="projectForm"
                    >
                        <TicketForm
                            selected={selected}
                            isSelected={isSelected}
                        />
                    </Drawer>
                </div>
            </BaseLayout>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        subProjects: subProjectsSelectors.getSubProjectsSelector(state),
        loading: subProjectsSelectors.getSubProjectsLoadingSelector(state),
        showForm: subProjectsSelectors.getSubProjectShowFormSelector(state),
        showSurveyForm: subProjectsSelectors.getShowSurveyFormSelector(state),
        showCreateSurveyForm: subProjectsSelectors.getShowCreateSurveyFormSelector(state),
        page: subProjectsSelectors.getSubProjectsPageSelector(state),
        total: subProjectsSelectors.getSubProjectsTotalSelector(state),
        selected: subProjectsSelectors.selectedSubProject(state),
        showTicketForm: ticketSelectors.getTicketShowFormSelector(state),
        procuringEntityPackage: ProcuringEntitySelectors.getPackageSelector(state)

    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchSubProjects: bindActionCreators(subProjectsActions.getSubProjectsStart, dispatch),
    deleteSubproject: bindActionCreators(subProjectsActions.deleteSubProjectStart, dispatch),
    paginateSubProject(page) {
        dispatch(subProjectsActions.getSubProjectsStart({page}));
    },
    searchSubProject(searchQuery) {
        dispatch(subProjectsActions.getSubProjectsStart({searchQuery}));
    },
    getSubProject: bindActionCreators(subProjectsActions.getSubProjectStart, dispatch),
    openSubProjectForm: bindActionCreators(subProjectsActions.openSubProjectForm, dispatch),
    openCreateSurveyForm: bindActionCreators(subProjectsActions.openSubProjectSurveyForm, dispatch),
    closeCreateSurveyForm: bindActionCreators(subProjectsActions.closeSubProjectSurveyForm, dispatch),
    openSurveyForm: bindActionCreators(subProjectsActions.openSurveyForm, dispatch),
    closeSurveyForm: bindActionCreators(subProjectsActions.closeSurveyForm, dispatch),
    closeSubProjectForm: bindActionCreators(subProjectsActions.closeSubProjectForm, dispatch),
    selectSubProject: bindActionCreators(subProjectsActions.selectedSubProject, dispatch),
    getWfsLayerData: bindActionCreators(mapActions.getWfsLayerDataStart, dispatch),
    openTicketForm: bindActionCreators(ticketActions.openTicketForm, dispatch),
    closeTicketForm: bindActionCreators(ticketActions.closeTicketForm, dispatch),
    getProcuringEntityPackage: bindActionCreators(ProcuringEntityActions.getPackageStart, dispatch)

});

export default connect(mapStateToProps, mapDispatchToProps)(SubProjectsList);



SubProjectsList.propTypes = {
    loading: PropTypes.bool.isRequired,
    subProjects: PropTypes.arrayOf(PropTypes.shape({name: PropTypes.string}))
        .isRequired,
    page: PropTypes.number,
    searchQuery: PropTypes.string,
    total: PropTypes.number,
};

SubProjectsList.defaultProps = {
    subProjects: [],
    searchQuery: undefined,
    loading: null,
};
