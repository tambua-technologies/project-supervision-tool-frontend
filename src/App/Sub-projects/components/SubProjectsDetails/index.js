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

function SubProjectDetails({ getSubProject, match, sub_project, loading, mapLoading, permissions }) {

  const breadcrumbs = sub_project ? [
   
    {
      title: `${sub_project.procuring_entity.agency.name}`,
      url: `/projects/${sub_project.project.id}/procuring_entities/${sub_project.procuring_entity.id}`,
      name: `${sub_project.procuring_entity.agency.name}`
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
    getSubProject(match.params?.id);
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
                  <div className="container description" >
                          <p>{sub_project ? sub_project?.description : 'N/A'}</p>
                        </div>
                        <OverviewDetails sub_project={sub_project} mapLoading={mapLoading} subProjectTickets={[]} />
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


