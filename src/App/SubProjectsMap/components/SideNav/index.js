import React, { useEffect, useState,createRef } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { mapSubProjectActions, mapSubProjectSelectors } from "../../../../redux/modules/map/subProjects";
import SubProjectTypesFilter from "./components/SubProjectTypesFilter";
import SubProjectStatusFilter from "./components/SubProjectStatusFilter";
import { projectActions, projectSelectors } from "../../../../redux/modules/projects";
import ContractorsFilter from "./components/ContractorsFilter";
import ProcuringEntityPackageFilter from "./components/ProcuringEntityFilter";
import CustomSearch from "./components/CustomSearch";
import TopSection from "./components/TopSection";
import { mapActions } from "../../../../redux/modules/map";
import SideNavItem from "./components/SideNavItem";
import homeIcon from '../../../../assets/icons/home-white.svg';

import {Link} from 'react-router-dom';
import { Collapse, Drawer } from 'antd';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import SubProjectRegionsFilter from "./components/SubProjectRegionsFilter";
import './styles.css';
import UserMenu from "../../../Auth/components/UserMenu";

const { Panel } = Collapse;


function SideNav({
    subProjectTypes,
    subProjectStatus,
    setSubProjectTypesFilter,
    getSubProjectTypes,
    getSubProjectStatus,
    setSubProjectStatusFilter,
    getRegions,
    setSubProjectRegionsFilter,
    districts,
    getDistricts,
    setSubProjectDistrictsFilter,
    getContractors,
    contractors,
    setSubProjectContractorsFilter,
    procuringEntityPackage,
    setProcuringEntityFilter,
    procuringEntity,
    project,
    history
}) {


    const [showSideNav, setShowSideNav] = useState(true);
    const ref = createRef();

    /**
     * @function
     * @name handleClearCachedValues
     * @description open drawer
     *
     * @version 0.1.0
     * @since 0.1.0
     */
    const handleShowSideNav = () => setShowSideNav(true);

    /**
     * @function
     * @name handleClearCachedValues
     * @description close drawer
     *
     * @version 0.1.0
     * @since 0.1.0
     */
    const handleCloseSideNav = () => setShowSideNav(false);

    useEffect(() => {
        getSubProjectTypes();
        getSubProjectStatus();
        getRegions();
        getContractors();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps



    return (
        <section>
            <div className="openDrawer">
                <MenuUnfoldOutlined onClick={handleShowSideNav} style={{ fontSize: '150%', padding: '12px 16px' }} />
            </div>

            <div ref={ref} />

            <Drawer
                placement="left"
                mask={false}
                onClose={handleCloseSideNav}
                visible={showSideNav}
                className="mapSideNav"
                getContainer={ref.current}
                width={450}
            >
                <div className='SideNav'>
                    <div className='nav-items-list'>
                        <Link onClick={() => history.goBack()} className="SideNavItem">
                            <SideNavItem
                                activeThumbnail={homeIcon}
                                inactiveThumbnail={homeIcon}
                                itemId='projects'
                                activeItem='home'
                            />
                        </Link>
                        <UserMenu />
                    </div>
                    <div
                        className='NavItemDetails'
                    >
                        <div className="ProjectInfo">
                            <div style={{ display: 'flex' }}>
                                {project && procuringEntity && <TopSection title={`${project?.name}(${procuringEntity?.agency.name})`} />}
                            </div>
                            <hr />
                            <CustomSearch placeholder='Search Sub projects' />
                            <hr />
                            <Collapse
                                defaultActiveKey={['1']}
                                expandIconPosition={'right'}
                                bordered={false}
                                className="FilterCollapse"
                            >
                                <Panel header="Subproject Types" key="1" >
                                    <SubProjectTypesFilter subProjectTypes={subProjectTypes} setSubProjectTypesFilter={setSubProjectTypesFilter}
                                    />
                                </Panel>
                                <Panel header="Subproject Status" key="2" >
                                    <SubProjectStatusFilter subProjectStatus={subProjectStatus} setSubProjectStatusFilter={setSubProjectStatusFilter} />
                                </Panel>
                                <Panel header="Regions" key="4" >
                                    <SubProjectRegionsFilter project={project}
                                        setProjectRegionsFilter={setSubProjectRegionsFilter}
                                        getDistricts={getDistricts}
                                        districts={districts}
                                        setSubProjectDistrictsFilter={setSubProjectDistrictsFilter} />
                                </Panel>
                                <Panel header="Procuring Entity Package" key="5" >
                                    <ProcuringEntityPackageFilter procuringEntityPackage={procuringEntityPackage} setProcuringEntityFilter={setProcuringEntityFilter} />
                                </Panel>
                                <Panel header="Contractors" key="6" >
                                    <ContractorsFilter contractors={contractors} setSubProjectContractorsFilter={setSubProjectContractorsFilter} />
                                </Panel>
                            </Collapse>
                        </div>

                    </div>

                </div>
            </Drawer>
        </section>

    );
}

const mapStateToProps = state => ({
    subProjectTypes: mapSubProjectSelectors.getSubProjectTypesSelector(state),
    subProjectStatus: mapSubProjectSelectors.getSubProjectStatusSelector(state),
    regions: projectSelectors.getRegionsSelector(state),
    districts: projectSelectors.getDistrictsSelector(state),
    contractors: mapSubProjectSelectors.getContractorsSelector(state),
    procuringEntityPackage: mapSubProjectSelectors.getProcuringEntityPackageSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
    getSubProject: bindActionCreators(mapSubProjectActions.getSubProjectStart, dispatch),
    getSubProjectTypes: bindActionCreators(mapSubProjectActions.getSubProjectTypesStart, dispatch),
    getSubProjectStatus: bindActionCreators(mapSubProjectActions.getSubProjectStatusStart, dispatch),
    getRegions: bindActionCreators(projectActions.getRegionsStart, dispatch),
    getDistricts: bindActionCreators(projectActions.getDistrictsStart, dispatch),
    getContractors: bindActionCreators(mapSubProjectActions.getContractorsStart, dispatch),
    getProcuringEntity: bindActionCreators(mapSubProjectActions.getProcuringEntityPackageStart, dispatch),
    getMapSubProjects: bindActionCreators(mapSubProjectActions.getSubProjectsStart, dispatch),
    getSubprojects: bindActionCreators(mapSubProjectActions.getSubProjectsStart, dispatch),
    setSubProjectTypesFilter: bindActionCreators(mapSubProjectActions.setSubProjectTypesFilter, dispatch),
    setSubProjectStatusFilter: bindActionCreators(mapSubProjectActions.setSubProjectStatusFilter, dispatch),
    setSubProjectRegionsFilter: bindActionCreators(mapSubProjectActions.setSubProjectRegionsFilter, dispatch),
    setSubProjectDistrictsFilter: bindActionCreators(mapSubProjectActions.setSubProjectDistrictFilter, dispatch),
    setSubProjectContractorsFilter: bindActionCreators(mapSubProjectActions.setSubProjectContractorFilter, dispatch),
    setProcuringEntityFilter: bindActionCreators(mapSubProjectActions.setSubProjectProcuringEntityFilter, dispatch),
    setComponentsSubComponentFilter: bindActionCreators(mapSubProjectActions.setSubProjectComponentFilter, dispatch),
    goBackToProjects: bindActionCreators(mapActions.backFromSubProjectsToProjects, dispatch)

});

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
