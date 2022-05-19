import React from "react";

import { Layout, Menu, Breadcrumb } from "antd";

import "./styles.css";
// import UserMenu from "../navigation/UserMenu";
import { Link, Switch } from "react-router-dom";
import PrivateRoute from "../Auth/PrivateRoute";
import ProjectsList from "../Projects/components/ProjectsList";
import MapDashboard from "../Map";
import Dashboards from "../Dashboards";
import Contracts from "../Contracts";
import ProjectDetails from "../Projects/components/Project/ProjectDetails";
import ProcuringEntitiesList from "../ProcuringEntities/componets/ProcuringEntitiesList";
import PackagesList from "../Packages/componets/PackagesList";
import SubProjectsList from "../Sub-projects/components/SubProjectsList";
import { projectSelectors } from "../../redux/modules/projects";
import { connect } from "react-redux";
import ProjectMenu from "../navigation/ProjectMenu";
import CscLayout from "./cscLayout";

const { Content, Sider } = Layout;

const AppLayout = ({  match: { url: baseUrl }, project }) => {

  return (
    <Layout>
      {true ? (
        <Layout>
          <CscLayout baseUrl={baseUrl} />
         
        </Layout>
      ) : (
        <Layout>
          <Sider width={300} className="sider-layout">
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              style={{
                height: "100%",
                borderRight: 0,
                paddingBlockStart: "2rem",
              }}
              theme="dark"
            >
              <Menu.Item>
                <span className="CustomizedIcon" />
                <Link to={`${baseUrl}/projects`}>All Projects</Link>
              </Menu.Item>
              <Menu.Item>
                <span className="CustomizedIcon" />
                <Link to={`${baseUrl}/map`}>Map</Link>
              </Menu.Item>
              <Menu.Item>
                <span className="CustomizedIcon" />
                <Link to={`${baseUrl}/dashboards`}>Dashboards</Link>
              </Menu.Item>
              <Menu.Item>
                <span className="CustomizedIcon" />
                <Link to={`${baseUrl}/contractors`}>Contractors</Link>
              </Menu.Item>
              <hr />
              {project ? (
                <ProjectMenu project={project} baseUrl={baseUrl} />
              ) : (
                <></>
              )}
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }} className="BaseLayout">
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                margin: 0,
              }}
              className="BaseLayoutContent"
            >
              <Switch>
                <PrivateRoute
                  path={`${baseUrl}/projects`}
                  component={({ match }) => <ProjectsList match={match} />}
                />
                <PrivateRoute
                  path={`${baseUrl}/projects/:id`}
                  component={({ match }) => <ProjectDetails match={match} />}
                />
                <PrivateRoute
                  path={`${baseUrl}/projects/procuring-entity`}
                  component={({ match }) => (
                    <ProcuringEntitiesList match={match} />
                  )}
                />
                <PrivateRoute
                  path={`${baseUrl}/projects/packages`}
                  component={({ match }) => <PackagesList match={match} />}
                />
                <PrivateRoute
                  path={`${baseUrl}/projects/sub-projects`}
                  component={({ match }) => <SubProjectsList match={match} />}
                />

                <PrivateRoute
                  path={`${baseUrl}/map`}
                  component={MapDashboard}
                />
                <PrivateRoute
                  path={`${baseUrl}/dashboards`}
                  component={(props) => <Dashboards />}
                />
                <PrivateRoute
                  path={`${baseUrl}/contractors`}
                  component={(props) => <Contracts />}
                />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    project: projectSelectors.getProjectSelector(state),
  };
};

export default connect(mapStateToProps)(AppLayout);
