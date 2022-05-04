
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Col, Drawer, Spin } from "antd";
import PropTypes from "prop-types";
import Topbar from "../../../components/Topbar";
import CustomList from "../../../components/List";
import ListItem from "../../../components/ListItem";
import ListItemActions from "../../../components/ListItemActions";
import { projectActions, projectSelectors } from '../../../../redux/modules/projects';
import CommonProjectForm from "../Forms";
import ProjectLocations from "../../../Map/components/ProjectLocations";
import BaseMap from "../../../Map/components/BaseMap";
import SideNav from "../../../Map/components/SideNav";
import { mapSelectors } from "../../../../redux/modules/map";
import ProjectComponentForm from "../Forms/components/projectComponentForm";
import ProjectSubComponentForm from "../Forms/components/projectSubComponentForm";
import { ticketActions, ticketSelectors } from "../../../../redux/modules/Tickets";
import TicketForm from '../../../Tickets/components/Form';
import BaseLayout from "../../../layouts/BaseLayout";
import DynamicBreadcrumbs from "../../../components/DynamicBreadcrumbs";
import { useToggle } from '../../../../hooks/useToggle';
import "./styles.css";

/* constants */
const codeSpan = { xxl: 2, xl: 3, lg: 3, md: 4, sm: 0, xs: 0 };
const projectIdSpan = { xxl: 3, xl: 2, lg: 2, md: 3, sm: 0, xs: 0 };
const nameSpan = { xxl: 5, xl: 5, lg: 5, md: 7, sm: 19, xs: 19 };
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
 * @function
 * @name ProjectsList
 * @description Render actions list which have search box, actions and Projects list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const ProjectsList  = ( 
  {
  fetchProjects,
  projects,
  loading,
  page,
  total,
  paginateProject,
  searchQuery,
  showForm,
  selected,
  mapLoading,
  project,
  showTicketForm,
  showComponentForm,
  showSubComponentForm,
  
  getProject,
  openProjectForm,
  selectProject,
  closeProjectForm,
  closeProjectComponent,
  closeProjectSubComponent,
  closeTicketForm,
  searchProject
  }
  ) =>  {
  // eslint-disable-next-line react/state-in-constructor

  const { isEditForm, setIsEditForm, previewOnMap, setVisible } = useToggle(false);
  const history = useHistory();

  useEffect(() => {
    fetchProjects();
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps


  

  
  /**
   * @function
   * @name closeProjectCreateForm
   * @description close form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
 const closeProjectCreateForm = () => {
    setIsEditForm( false)
    setVisible(false);
    selectProject(null);
    closeProjectForm();
  };

  /**
 * @function
 * @name closeProjectForm
 * @description close form
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const closeProjectComponentForm = () => {
    setIsEditForm(false)
    setVisible(false);
    closeProjectComponent();
  };

  /**
 * @function
 * @name closeProjectSubComponentForm
 * @description close form
 *
 * @version 0.1.0
 * @since 0.1.0
 */
 const closeProjectSubComponentForm = () => {
    setIsEditForm( false)
    setVisible(false);
    closeProjectSubComponent();
  };

  /**
 * @function
 * @name closeIssueForm
 * @description close form
 *
 * @version 0.1.0
 * @since 0.1.0
 */
 const closeIssueForm = () => {
    setIsEditForm( false)
    closeTicketForm();
  };

  /**   
   * @function
   * @name handleSearch
   * @description Handle list search action
   *
   * @version 0.1.0
   * @since 0.1.0
   */
 const handleSearch = (event) => {   
  searchProject(event.target.value)
  };

  /**   
   * @function
   * @name handleRefresh
   * @description Handle refresh action
   *
   * @version 0.1.0
   * @since 0.1.0
   */
const handleRefresh = () => {
    fetchProjects()
  };

  /**
  * @function
  * @name handleViewDetails
  * @description Handle detail preview
  *
  * @version 0.1.0
  * @since 0.1.0
  */
const handleViewDetails = (item_id) => {
    getProject(item_id);
    let path = `/projects/${item_id}`;  
    history.push(path);

  };

  /**
  * @function
  * @name handleViewMap
  * @description Handle detail preview
  *
  * @version 0.1.0
  * @since 0.1.0
  */
const handleViewMap = () => {
    let path = `/map`;   
    history.push(path);
  };


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
              onChange: handleSearch,
              value: searchQuery,
            }}
            
          />
          {/* end Topbar */}

          {/* list starts */}
          <CustomList
            itemName="Projects"
            items={projects}
            page={page}
            loading={loading}
            itemCount={total}
            onRefresh={handleRefresh}
            onMapView={handleViewMap}
            onPaginate={(nextPage) => {
              paginateProject({ page: nextPage });
            }}
            headerLayout={headerLayout}
            renderListItem={({
              item
            }) => (
              <ListItem
                key={item.id} // eslint-disable-line
                name={item.name}
                item={item}
                avatarBackgroundColor={item.color}
                renderActions={() => (
                  <ListItemActions
                    view={
                      {
                        name: "View Detail",
                        title: "View more detail of selected project",
                        onClick: () => 
                        handleViewDetails(item.id)
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
                  onClick={() => 
                    handleViewDetails(item.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {item.name}
                </Col>
                <Col {...projectIdSpan} className="contentEllipse">
                  {" "}

                  {item ? item?.wb_project_id : "All"}
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
            onClose={closeProjectCreateForm}
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
              Projects={projects}
              handleAfterSubmit={closeProjectForm} />
          </Drawer>

          <Drawer
            title={
              isEditForm ? "Edit Project Component" : "Add New Project Component"
            } width={550}
            onClose={
              closeProjectComponentForm}
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
            onClose={
              closeProjectSubComponentForm}
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
            onClose={
              closeIssueForm}
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


const mapStateToProps = (state) => {
  return {
    projects: projectSelectors.getProjectsSelector(state),
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
  openProjectForm: projectActions.openProjectForm,
  closeProjectForm: projectActions.closeProjectForm,
  paginateProject: projectActions.getProjectsStart,
  searchProject: projectActions.searchProjects,
  getProject: projectActions.getProjectStart,
  openProjectComponent: projectActions.openProjectComponentForm,
  openProjectSubComponent: projectActions.openProjectSubComponentForm,
  closeProjectComponent: projectActions.closeProjectComponentForm,
  closeProjectSubComponent: projectActions.closeProjectSubComponentForm,
  openTicketForm: ticketActions.openTicketForm,
  closeTicketForm: ticketActions.closeTicketForm,
};

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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);




