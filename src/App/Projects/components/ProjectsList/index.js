
import React, { Component } from "react";
import { connect } from "react-redux";
import { projectActions, projectSelectors } from '../../../../redux/modules/projects';
import { Col, Drawer, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import Topbar from "../../../components/Topbar";
import CustomList from "../../../components/List";
import ListItem from "../../../components/ListItem";
import ListItemActions from "../../../components/ListItemActions";
import CommonProjectForm from "../Forms";
import { focalPeopleActions, focalPeopleSelectors } from "../../../FocalPeople/duck";
import ProjectLocations from "../../../Map/components/ProjectLocations";
import BaseMap from "../../../Map/components/BaseMap";
import SideNav from "../../../Map/components/SideNav";
import { mapSelectors } from "../../../../redux/modules/map";
import { mapProjectActions } from "../../../../redux/modules/map/projects";
import { mapSubProjectActions } from "../../../../redux/modules/map/subProjects";
import { showArchiveConfirm } from "../../../../Util";
import ProjectComponentForm from "../Forms/components/projectComponentForm";
import ProjectSubComponentForm from "../Forms/components/projectSubComponentForm";
import "./styles.css";
import { ticketActions, ticketSelectors } from "../../../../redux/modules/Tickets";
import TicketForm from '../../../Tickets/components/Form';
import BaseLayout from "../../../layouts/BaseLayout";
import DynamicBreadcrumbs from "../../../components/DynamicBreadcrumbs";

/* constants */
const codeSpan = { xxl: 2, xl: 3, lg: 3, md: 4, sm: 0, xs: 0 };
const projectIdSpan = { xxl: 3, xl: 2, lg: 2, md: 3, sm: 0, xs: 0 };
const nameSpan = { xxl: 5, xl: 5, lg: 5, md: 7, sm: 20, xs: 20 };
const approvalSpan = { xxl: 2, xl: 2, lg: 2, md: 2, sm: 0, xs: 0 };
const projectLeadSpan = { xxl: 3, xl: 3, lg: 3, md: 0, sm: 0, xs: 0 };
const statusSpan = { xxl: 2, xl: 2, lg: 2, md: 2, sm: 0, xs: 0 };
const projectCoordinatorSpan = { xxl: 2, xl: 2, lg: 2, md: 0, sm: 0, xs: 0 };
const closingSpan = { xxl: 2, xl: 2, lg: 2, md: 2, sm: 0, xs: 0 };

const headerLayout = [
  { ...nameSpan, header: "Name" },
  { ...projectIdSpan, header: "WB Project ID" },
  { ...codeSpan, header: "Code" },
  { ...statusSpan, header: "Status" },
  { ...approvalSpan, header: "Approve Date" },
  { ...closingSpan, header: "Closing Date" },
  { ...projectCoordinatorSpan, header: "Impelementing Agency" },
  { ...projectLeadSpan, header: "LGA(s)" },
];


/**
 * @class
 * @name ProjectsList
 * @description Render actions list which have search box, actions and Projects list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ProjectsList extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    isEditForm: false,
    visible: false,
    previewOnMap: false,
  };

  componentDidMount() {
    const { fetchProjects, focalPeople } = this.props;
    fetchProjects();
    focalPeople();
  }

  /**
   * @function
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {object} project Action Catalogue to be edited
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = (project) => {
    const { selectProject, openProjectForm } = this.props;
    selectProject(project);
    this.setState({ isEditForm: true });
    openProjectForm();
  };

  /**
   * @function
   * @name openProjectForm
   * @description Open form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openProjectForm = () => {
    const { openProjectForm } = this.props;
    openProjectForm();
  };

  /**
   * @function
   * @name closeProjectForm
   * @description close form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeProjectForm = () => {
    this.setState({ isEditForm: false, visible: false });
    const { closeProjectForm, selectProject } = this.props;
    selectProject(null);
    closeProjectForm();
  };

  /**
 * @function
 * @name openProjectSubComponentForm
 * @description Open form
 *
 * @version 0.1.0
 * @since 0.1.0
 */
  openProjectSubComponentForm = (project) => {
    const { openProjectSubComponentForm, selectProject } = this.props;
    selectProject(project);
    openProjectSubComponentForm();
  };

  /**
 * @function
 * @name openProjectComponentForm
 * @description Open form
 *
 * @version 0.1.0
 * @since 0.1.0
 */
  openProjectComponentForm = (project) => {
    const { openProjectComponentForm, selectProject } = this.props;
    selectProject(project);
    openProjectComponentForm();
  };

  /**
 * @function
 * @name closeProjectForm
 * @description close form
 *
 * @version 0.1.0
 * @since 0.1.0
 */
  closeProjectComponentForm = () => {
    this.setState({ isEditForm: false, visible: false });
    const { closeProjectComponentForm } = this.props;
    closeProjectComponentForm();
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
    this.setState({ isEditForm: false, visible: false });
    const { closeProjectSubComponentForm } = this.props;
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
  openIssueForm = (project) => {
    const { openTicketForm, selectProject } = this.props;
    selectProject(project);
    openTicketForm();
  };

  /**
 * @function
 * @name closeIssueForm
 * @description close form
 *
 * @version 0.1.0
 * @since 0.1.0
 */
  closeIssueForm = () => {
    this.setState({ isEditForm: false });
    const { closeTicketForm } = this.props;
    closeTicketForm();
  };

  /**
     * @function
     * @name handleAfterCloseForm
     * @description Perform post close form cleanups
     *
     * @version 0.1.0
     * @since 0.1.0
     */
  handleAfterCloseForm = () => {
    const { selectProject } = this.props;
    selectProject(null);
    this.setState({ isEditForm: false });
  };

  /**   
   * @function
   * @name handleSearch
   * @description Handle list search action
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSearch = (event) => {
    this.props.searchProject(event.target.value)
  };

  /**   
   * @function
   * @name handleRefresh
   * @description Handle refresh action
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleRefresh = () => {
    this.props.fetchProjects()
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
    const { getProject, getSubProjectsByProjectId } = this.props;
    getSubProjectsByProjectId(item_id)
    getProject(item_id);
    let path = `/projects/${item_id}`;
    this.props.history.push(path);

  };

  /**
  * @function
  * @name handleViewMap
  * @description Handle detail preview
  *
  * @version 0.1.0
  * @since 0.1.0
  */
  handleViewMap = () => {
    let path = `/map`;
    this.props.history.push(path);
  };

  /**
   * @function
   * @name handleMapPreview
   * @description Handle map preview
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleMapPreview = (item) => {
    const { getProjectOnMap, } = this.props;
    let path = `/map`;
    this.props.history.push(path);
    console.log('preview on map', item.id)
    getProjectOnMap(item.id);
  };



  render() {
    const {
      projects,
      loading,
      page,
      total,
      paginateProject,
      searchQuery,
      showForm,
      selected,
      focalPeoples,
      createProject,
      mapLoading,
      project,
      showTicketForm,
      deleteProject,
      showComponentForm,
      showSubComponentForm,
    } = this.props;

    const { isEditForm, previewOnMap } = this.state;

    const breadcrumbs = [
      {
        title: 'Projects',
        url: '/projects',
        name: 'Projects'
      }
    ]

    return previewOnMap ? <div className="MapDashboard">
      <SideNav />
      <Spin spinning={mapLoading} tip="Loading data...">
        <BaseMap ref={this.map} zoomControl={true}>
          <ProjectLocations project={project} />
        </BaseMap>
      </Spin>
    </div> : (
      <BaseLayout breadcrumbs={<DynamicBreadcrumbs breadcrumbs={breadcrumbs} />}>
        <div>
          {/* Topbar */}
          <Topbar
            search={{
              size: "large",
              placeholder: "Search for Projects here ...",
              onChange: this.handleSearch,
              value: searchQuery,
            }}
            actions={[
              {
                label: "New Project",
                icon: <PlusOutlined />,
                size: "large",
                title: "Add New Project",
                onClick: this.openProjectForm,
              },
            ]}
          />
          {/* end Topbar */}

          {/* list starts */}
          <CustomList
            itemName="Projects"
            items={projects}
            page={page}
            loading={loading}
            itemCount={total}
            onFilter={this.openFiltersModal}
            onRefresh={this.handleRefresh}
            onMapView={this.handleViewMap}
            onPaginate={(nextPage) => {
              paginateProject({ page: nextPage });
            }}
            headerLayout={headerLayout}
            renderListItem={({
              item,
              isSelected,
            }) => (
              <ListItem
                key={item.id} // eslint-disable-line
                name={item.name}
                item={item}
                avatarBackgroundColor={item.color}
                isSelected={isSelected}
                renderActions={() => (
                  <ListItemActions
                    edit={{
                      name: "Edit project",
                      title: "Update project details",
                      onClick: () => this.handleEdit(item),
                    }}
                    archive={{
                      name: "Archive project",
                      title:
                        "Remove project from list of active Projects",
                      onClick: () => showArchiveConfirm(item, deleteProject),
                    }}
                    component={{
                      name: "Add Component",
                      title:
                        "Add component to the project",
                      onClick: () => this.openProjectComponentForm(item),
                    }}
                    subComponent={{
                      name: "Add sub Component",
                      title:
                        "Add sub component to the project",
                      onClick: () => this.openProjectSubComponentForm(item),
                    }}
                    view={
                      {
                        name: "View Detail",
                        title: "View more detail of selected project",
                        onClick: () => this.handleViewDetails(item.id)
                      }
                    }
                  />

                )}
              >
                {/* eslint-disable react/jsx-props-no-spreading */}
                <Col
                  {...nameSpan}
                  className="contentEllipse"
                  title={item.descrition}
                  onClick={() => this.handleViewDetails(item.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {item.name}
                </Col>
                <Col {...projectIdSpan} className="contentEllipse">
                  {" "}

                  {item ? item.wb_project_id : "All"}
                </Col>
                <Col {...codeSpan} title={item.name} className="contentEllipse" >{item ? item?.code.toUpperCase() : 'N/A'}</Col>
                <Col {...statusSpan}>{item?.status?.name ? item?.status?.name : 'N/A'}</Col>
                <Col {...approvalSpan}>
                  {item ? new Date(item?.approval_date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
                </Col>
                <Col {...closingSpan}>
                  {item ? new Date(item?.closing_date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
                </Col>

                <Col {...projectCoordinatorSpan} className="contentEllipse">{item?.implementing_agency ? item?.implementing_agency?.name : 'N/A'}</Col>
                <Col {...projectLeadSpan}> {item?.lga_count ? item?.lga_count : 'N/A'}</Col>
                {/* eslint-enable react/jsx-props-no-spreading */}
              </ListItem>
            )}
          />
          {/* end list */}
          <Drawer
            title={
              isEditForm ? "Edit Project" : "Add New Project"
            } width={550}
            onClose={this.closeProjectForm}
            footer={null}
            visible={showForm}
            bodyStyle={{ paddingBottom: 80 }}
            destroyOnClose
            maskClosable={false}
            className="projectForm"
          >
            <CommonProjectForm
              selected={selected}
              isEditForm={isEditForm}
              createProject={createProject}
              focalPeoples={focalPeoples}
              Projects={projects}
              handleAfterCloseForm={this.handleAfterCloseForm}
              handleAfterSubmit={this.closeProjectForm} />
          </Drawer>

          <Drawer
            title={
              isEditForm ? "Edit Project Component" : "Add New Project Component"
            } width={550}
            onClose={this.closeProjectComponentForm}
            footer={null}
            visible={showComponentForm}
            bodyStyle={{ paddingBottom: 80 }}
            destroyOnClose
            maskClosable={false}
            className="projectForm"
          >
            <ProjectComponentForm
              selected={selected}
            />
          </Drawer>

          <Drawer
            title={
              isEditForm ? "Edit Project SubComponent" : "Add New Project SubComponent"
            } width={550}
            onClose={this.closeProjectSubComponentForm}
            footer={null}
            visible={showSubComponentForm}
            bodyStyle={{ paddingBottom: 80 }}
            destroyOnClose
            maskClosable={false}
            className="projectForm"
          >
            <ProjectSubComponentForm
              selected={selected}
            />
          </Drawer>

          <Drawer
            title={
              isEditForm ? "Edit Ticket" : "Add New Ticket"
            } width={550}
            onClose={this.closeIssueForm}
            footer={null}
            visible={showTicketForm}
            bodyStyle={{ paddingBottom: 80 }}
            destroyOnClose
            maskClosable={false}
            className="projectForm"
          >
            <TicketForm
              selected={selected}
            />
          </Drawer>
        </div>
      </BaseLayout>
    );
  }
}

ProjectsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  page: PropTypes.number.isRequired,
  searchQuery: PropTypes.string,
  total: PropTypes.number.isRequired,
};

ProjectsList.defaultProps = {
  projects: null,
  searchQuery: undefined,
};

const mapStateToProps = (state) => {
  return {
    projects: projectSelectors.getProjectsSelector(state),
    focalPeoples: focalPeopleSelectors.getFocalPeople(state),
    loading: projectSelectors.getProjectsLoadingSelector(state),
    page: projectSelectors.getProjectsPageSelector(state),
    total: projectSelectors.getProjectsTotalSelector(state),
    showForm: projectSelectors.getProjectShowFormSelector(state),
    selected: projectSelectors.selectedProject(state),
    mapLoading: mapSelectors.getMapLoadingSelector(state),
    project: projectSelectors.getProjectSelector(state),
    searchQuery: projectSelectors.searchQuery(state),
    showComponentForm: projectSelectors.getProjectComponentShowFormSelector(state),
    showSubComponentForm: projectSelectors.getProjectSubComponentShowFormSelector(state),
    showTicketForm: ticketSelectors.getTicketShowFormSelector(state),
  };
};

const mapDispatchToProps = {
  fetchProjects: projectActions.getProjectsStart,
  deleteProject: projectActions.deleteProjectStart,
  selectProject: projectActions.selectProject,
  focalPeople: focalPeopleActions.getFocalPeopleStart,
  createProject: projectActions.createProjectStart,
  openProjectForm: projectActions.openProjectForm,
  closeProjectForm: projectActions.closeProjectForm,
  paginateProject: projectActions.getProjectsStart,
  searchProject: projectActions.searchProjects,
  getProject: projectActions.getProjectStart,
  getProjectOnMap: mapProjectActions.getProjectStart,
  getSubProjectsByProjectId: mapSubProjectActions.getSubProjectByProjectId,
  openProjectComponentForm: projectActions.openProjectComponentForm,
  openProjectSubComponentForm: projectActions.openProjectSubComponentForm,
  closeProjectComponentForm: projectActions.closeProjectComponentForm,
  closeProjectSubComponentForm: projectActions.closeProjectSubComponentForm,
  openTicketForm: ticketActions.openTicketForm,
  closeTicketForm: ticketActions.closeTicketForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);




