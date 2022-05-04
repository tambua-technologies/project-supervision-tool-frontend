import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ProcuringEntityActions, ProcuringEntitySelectors } from '../../../../redux/modules/ProcuringEntities';
import PropTypes from 'prop-types';
import { Col, Drawer } from "antd";
import Topbar from "../../../components/Topbar";
import CustomList from "../../../components/List";
import ListItem from "../../../components/ListItem";
import ListItemActions from "../../../components/ListItemActions";
import { getIdFromUrlPath } from '../../../../Util';
import { projectActions, projectSelectors } from "../../../../redux/modules/projects";
import ProcuringEntityForm from '../Form';
import BaseLayout from '../../../layouts/BaseLayout';
import DynamicBreadcrumbs from '../../../components/DynamicBreadcrumbs';
import { useToggle } from '../../../../hooks/useToggle';
import "./styles.css";


/* constants */
const nameSpan = { xxl: 5, xl: 5, lg: 5, md: 5, sm: 10, xs: 20 };
const packageSpan = { xxl: 5, xl: 5, lg: 5, md: 5, sm: 10, xs: 0};
const contractSpan = { xxl: 11, xl: 11, lg: 11, md: 11, sm: 0, xs: 0};

const headerLayout = [
    {...contractSpan, header: "Contract"},
    { ...nameSpan, header: "Eentity" },
    { ...packageSpan, header: "Total Packages" },
];

const ProcuringEntitiesList = ({
    getProcuringEntities,
    procuringEntities,
    loading,
    deleteProcuringEntity,
    openProcuringEntityForm,
    closeProcuringEntityForm,
    selectProcuringEntity,
    selected,
    showForm,
    createProcuringEntity,
    getAgenciesActors,
    agencies,
    getProjectSubComponent,
    projectSubComponents,
    updateProcuringEntity,
    project,
    match,
    getProject,
    searchProcuring,
    searchQuery
}) => {

    const { isEditForm, setIsEditForm, setVisible } = useToggle(false);
    const projectId = getIdFromUrlPath(match.path, 2);
    const filter = { 'filter[project_id]': projectId };
    const history = useHistory();

    useEffect(() => {
        getProcuringEntities(filter);
        getProject(projectId)
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps


    /**
     * @function
     * @name handleCloseProcuringEntityForm
     * @description close form
     * @version 0.1.0
     * @since 0.1.0
     */
    const handleCloseProcuringEntityForm = () => {
        setIsEditForm(false);
        setVisible(false);
        selectProcuringEntity(null);
        closeProcuringEntityForm();
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
        getProcuringEntities(filter);
    };

    /**
   * @function
   * @name handleViewDetails
   * @description Handle handleViewDetails action
   *
   * @version 0.1.0
   * @since 0.1.0
   */
    const handleViewDetails = (item) => {
        const path = `${match.url}/${item.id}`;
        history.push(path);
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
        searchProcuring(event.target.value)
    };

    const breadcrumbs = project ? [
        {
            title: 'Projects',
            url: '/projects',
            name: 'Projects'
        },
        {
            title: project.code,
            url: `/projects/${project.id}`,
            name: project.name
        },
        {
            title: `Procuring Entities`,
            url: match.url,
            name: `Procuring Entities under ${project.name}(${project.code})`
        }
    ] : [];


    return (
        <BaseLayout breadcrumbs={<DynamicBreadcrumbs breadcrumbs={breadcrumbs} />}>

            <div>
                {/* Topbar */}
                <Topbar
                    search={{
                        size: "large",
                        placeholder: "Search for Procuring Entities here ...",
                        onChange: handleSearch,
                        value: searchQuery
                    }}
                    
                />
                {/* end Topbar */}

                {/* list starts */}
                <CustomList
                    itemName="ProcuringEntities"
                    items={procuringEntities}
                    page={1}
                    itemCount={1}
                    loading={loading}
                    onRefresh={handleRefresh}
                    headerLayout={headerLayout}
                    renderListItem={({
                        item,
                    }) => (
                        <ListItem
                            key={item.id} // eslint-disable-line
                            name={item?.agency?.name}
                            item={item}
                            renderActions={() => (
                                <ListItemActions
                                    view={
                                        {
                                            name: "View Details",
                                            title: "View more detail of selected Procuring Entity",
                                            onClick: () => handleViewDetails(item)
                                        }
                                    }

                                />
                            )}
                        >
                            {/* eslint-disable react/jsx-props-no-spreading */}

                            <Col {...contractSpan} className="contentEllipse" title={ item?.contract?.name || 'N/A'}>
                                {item?.contract?.name || 'N/A'}
                            </Col>

                            <Col {...nameSpan} className="contentEllipse" >
                                {item?.agency?.name ? item?.agency?.name : 'N/A'}
                            </Col>

                            <Col {...packageSpan} className="contentEllipse">
                                {
                                    item?.packages.length 
                                }
                            </Col>

                            {/* eslint-enable react/jsx-props-no-spreading */}
                        </ListItem>
                    )}
                />
                {/* end list */}

                <Drawer
                    title={
                        isEditForm ? "Edit Procuring Entity" : "Add New Procuring Entity"
                    } width={550}
                    onClose={handleCloseProcuringEntityForm}
                    footer={null}
                    visible={showForm}
                    bodyStyle={{ paddingBottom: 80 }}
                    destroyOnClose
                    maskClosable={false}
                    className="projectForm"
                >
                    <ProcuringEntityForm
                        isEditForm={isEditForm}
                        selected={selected}
                        handleAfterSubmit={handleCloseProcuringEntityForm}
                        createProcuringEntity={createProcuringEntity}
                        getAgenciesActors={getAgenciesActors}
                        loading={loading}
                        agencies={agencies}
                        getProjectSubComponent={getProjectSubComponent}
                        projectSubComponents={projectSubComponents}
                        updateProcuringEntity={updateProcuringEntity}
                        project={project}
                        match={match}
                        getProject={getProject}
                    />

                </Drawer>

            </div>
        </BaseLayout>

    )
}


const mapStateToProps = (state) => {
    return {
        procuringEntities: ProcuringEntitySelectors.getProcuringEntities(state),
        loading: ProcuringEntitySelectors.loading(state),
        selected: ProcuringEntitySelectors.selectedProcuringEntity(state),
        showForm: ProcuringEntitySelectors.getShowFormSelector(state),
        agencies: ProcuringEntitySelectors.getActorsSelector(state),
        projectSubComponents: projectSelectors.getProjectSubComponents(state),
        project: projectSelectors.getProjectSelector(state),
        searchQuery: projectSelectors.searchQuery(state),

    }
}

const mapDispatchToProps = {
    getProcuringEntities: ProcuringEntityActions.getProcuringEntitiesStart,
    deleteProcuringEntity: ProcuringEntityActions.deleteProcuringEntityStart,
    getAgenciesActors: ProcuringEntityActions.getActorsStart,
    openProcuringEntityForm: ProcuringEntityActions.openProcuringEntityForm,
    closeProcuringEntityForm: ProcuringEntityActions.closeProcuringEntityForm,
    selectProcuringEntity: ProcuringEntityActions.selectProcuringEntity,
    getProjectSubComponent: projectActions.getProjectSubComponentStart,
    createProcuringEntity: ProcuringEntityActions.createProcuringEntityStart,
    updateProcuringEntity: ProcuringEntityActions.updateProcuringEntityStart,
    searchProcuring: ProcuringEntityActions.searchProcuring,
    getProject: projectActions.getProjectStart,

}

ProcuringEntitiesList.propTypes = {
    getProcuringEntities: PropTypes.func.isRequired,
    procuringEntities: PropTypes.array,
    project: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    openProcuringEntityForm: PropTypes.func.isRequired,
    closeProcuringEntityForm: PropTypes.func.isRequired,
    selectProcuringEntity: PropTypes.func.isRequired,
    showForm: PropTypes.bool,
    isEditForm: PropTypes.bool
};

ProcuringEntitiesList.defaultProps = {
    procuringEntities: [],
    loading: null,
    isEditForm: null,
    showForm: null,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcuringEntitiesList);
