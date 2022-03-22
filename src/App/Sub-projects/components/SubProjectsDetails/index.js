import React, { useEffect } from "react";
import { Layout, Spin, Tabs } from 'antd';
import { connect } from "react-redux";
import { mapActions, mapSelectors } from "../../../../redux/modules/map";
import OverviewDetails from "./components/OverviewDetails";
import * as appPermissions from '../../../../Util/permissions';
import FieldNotes from "./components/FieldNotes";
import FieldImages from "./components/FieldImages";
import { authSelectors } from "../../../../redux/modules/auth";
import {getIdFromUrlPath} from "../../../../Util";
import BaseLayout from "../../../layouts/BaseLayout";
import DynamicBreadcrumbs from "../../../components/DynamicBreadcrumbs";
import { subProjectsActions, subProjectsSelectors } from "../../../../redux/modules/subProjects";
import "./styles.css";

const { Content } = Layout;
const { TabPane } = Tabs;

function SubProjectDetails({ getSubProject, match, sub_project, loading, mapLoading, permissions, }) {

  const breadcrumbs = sub_project ? [
    {
      title: 'Projects',
      url: '/projects',
      name: 'Projects'
    },
    {
      title: sub_project.project.code,
      url: `/projects/${sub_project.project.id}/`,
      name: sub_project.project.name
    },
    {
      title: `Procuring Entities`,
      url: `/projects/${sub_project.project.id}/procuring_entities`,
      name: `Procuring Entities under ${sub_project.project.name}(${sub_project.project.code})`
    },
    {
      title: `${sub_project.procuring_entity.agency.name}`,
      url: `/projects/${sub_project.project.id}/procuring_entities/${sub_project.procuring_entity.id}`,
      name: `${sub_project.procuring_entity.agency.name}`
    },
    {
      title: `Packages`,
      url: `/projects/${sub_project.project.id}/procuring_entities/${sub_project.procuring_entity.id}/packages`,
      name: `Packages procured in ${sub_project.procuring_entity.agency.name}`
    },
    {
      title: `${sub_project.package?.name}`,
      url: `/projects/${sub_project.project.id}/procuring_entities/${sub_project.procuring_entity.id}/packages/${sub_project.package?.id}`,
      name: `${sub_project.package?.contract?.name}`
    },
    {
      title: `SubProjects`,
      url: `/projects/${sub_project.project.id}/procuring_entities/${sub_project.procuring_entity.id}/packages/${sub_project.package?.id}/sub_projects`,
      name: `List of Sub Projects`
    },
    {
      title: sub_project.name,
      url: match.url,
      name: `Details for ${sub_project.name}`
    }
  ] : [];

  useEffect(() => {
    const id = getIdFromUrlPath(match.url, 8);  
    getSubProject(id);
  }, [match]); // eslint-disable-line react-hooks/exhaustive-deps

  return sub_project ? (
      <BaseLayout breadcrumbs={<DynamicBreadcrumbs breadcrumbs={breadcrumbs} />} >
        <Layout className="sub-project-layout">
          <Spin spinning={loading} tip="Loading..." >
            <Content className="contents">
              <h3>{sub_project?.name}</h3>
              <Layout className="sub-project-inner-layout" >
                <Content className="sub-project-contents">
                  <div className="card-container">
                    <Tabs type="card">
                      <TabPane tab="Sub-Project Overview" key="1">
                        <div className="container description" >
                          <h4 className="text-blue">Sub Project Development Objective</h4>
                          <p>{sub_project ? sub_project?.description : 'N/A'}</p>
                        </div>
                        <OverviewDetails sub_project={sub_project} mapLoading={mapLoading} subProjectTickets={[]} />
                      </TabPane>
                      <TabPane tab="Field Notes" key="2">
                        <FieldNotes subProject={sub_project} getSubProject={getSubProject} permissions={permissions} permission={appPermissions.CAN_CREATE_SURVEY} />
                      </TabPane>
                      <TabPane tab="Field Images" key="3">
                        <FieldImages subProject={sub_project} getSubProject={getSubProject} permissions={permissions} permission={appPermissions.CAN_CREATE_SURVEY} />
                      </TabPane>
                    </Tabs>
                  </div>
                </Content>
              </Layout>
            </Content>
          </Spin>
        </Layout>
      </BaseLayout>
  ) : '';
}
const mapStateToProps = (state) => {
  return {
    sub_project: subProjectsSelectors.getSubProjectSelector(state),
    loading: subProjectsSelectors.getSubProjectLoadingSelector(state),
    mapLoading: mapSelectors.getMapLoadingSelector(state),
    permissions: authSelectors.authUserPermissionsSelector(state),

  };
};

const mapDispatchToProps = {
  getSubProject: subProjectsActions.getSubProjectStart,
  getWfsLayerData: mapActions.getWfsLayerDataStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubProjectDetails);


