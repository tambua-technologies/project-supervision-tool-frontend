import React, { useEffect, useState } from "react";
import { Layout, Button, Menu, Breadcrumb, Row, Col, Input } from "antd";
import { Link, Route, Switch } from "react-router-dom";
import MapDashboard from "../Map";
import Contracts from "../Contracts";
import UserMenu from "../navigation/UserMenu";
import PackagesList from "../Packages/componets/PackagesList";
import SubProjectsList from "../Sub-projects/components/SubProjectsList";
import SafeGuard from "../Csc/components/safeguad";
import API from '../../API';
import Reports from "../Csc/components/Reports";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "./styles.css";
import Overview from "../Csc/components/overview";
import {AppContext} from "../../context/AppContext";
const { Header, Content, Sider } = Layout;

const BaseLayout = (props) => {
  const [project, setProject] = useState(null);
  const [procuringEntity, setProcuringEntity] = useState(null);
  const { match: { url: baseUrl, params} } = props;
  const [collapsed, setCollapse] = useState(false);

  useEffect(() => {
    API.getProcuringEntity(params.procuringEntityId)
    .then(res => {
      setProcuringEntity(res.data);
      setProject(res.data.project);
    })
    .catch(err => console.log(err));
  
  }, []);

  const toggle = () => {
    setCollapse({
      collapsed: !collapsed,
    });
  };
  return (
   <AppContext.Provider value={{app: { project, procuringEntity }}}>
      <Layout>
      <Sider width={200} className="sider-layout">
        <Row type="flex" justify="start">
          <div className="header-logo">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
            <div className="logo">ReProST</div>
          </div>{" "}
        </Row>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "100%", borderRight: 0, paddingBlockStart: "2rem" }}
          theme="dark"
        >
          <h3 className="text-blue">Ilala</h3>

          <Menu.Item>
            <span className="CustomizedIcon" />
            <Link to={`${baseUrl}/overview`}>Overview</Link>
          </Menu.Item>
          <Menu.Item>
            <span className="CustomizedIcon" />
            <Link to={`${baseUrl}/reports`}>Report</Link>
          </Menu.Item>
          <Menu.Item>
            <span className="CustomizedIcon" />
            <Link to={`${baseUrl}/safeguard`}>Safeguard Concern</Link>
          </Menu.Item>
          <Menu.Item>
            <span className="CustomizedIcon" />
            <Link to={`${baseUrl}/packages`}>Package</Link>
          </Menu.Item>
          <Menu.Item>
            <span className="CustomizedIcon" />
            <Link to={`${baseUrl}/sub-projects`}>sub-project</Link>
          </Menu.Item>
          <Menu.Item>
            <span className="CustomizedIcon" />
            <Link to={`${baseUrl}/map`}>Map</Link>
          </Menu.Item>
          <Menu.Item>
            <span className="CustomizedIcon" />
            <Link to={`${baseUrl}/contract`}>CSC Contract</Link>
          </Menu.Item>
          <div
            style={{
              marginLeft: "15px",
              marginTop: "100%",
            }}
          >
            <span className="CustomizedIcon" />
            <Link to={`${baseUrl}/settings`}>Settings</Link>
          </div>
        </Menu>
      </Sider>

      <Layout className="BaseLayout">
        
        <Header className="header">
          <Row type="flex">
            <Col xxl={14} xl={14} lg={14} md={14} sm={24} xs={24}>
              <Input
                placeholder="Search here"
                allowClear
                className="TopbarSearch"
                size="large"
              />
            </Col>
            <Col xxl={2} xl={2} lg={2} md={2} sm={2} xs={2} offset={8}>
              <Row type="flex" justify="end">
                <Col span={12}>
                  <UserMenu />
                </Col>
              </Row>
            </Col>
          </Row>
        </Header>

        <div style={{ padding: "0 15px 15px" }}>
          <Content style={{ margin: 0, paddingTop: 20 }} className="BaseLayoutContent" >
            <Switch>
              <Route
                path={`${baseUrl}/overview`}
                component={({ match }) => <Overview match={match} />}
              />
              <Route
                path={`${baseUrl}/safeguard`}
                component={({ match }) => <SafeGuard />}
              />
              <Route
                path={`${baseUrl}/packages`}
                component={({ match }) => <PackagesList match={match} />}
              />
              <Route
                path={`${baseUrl}/reports`}
                component={(props) => <Reports {...props} />}
              />
              <Route
                path={`${baseUrl}/sub-projects`}
                component={({ match }) => <SubProjectsList match={match} />}
              />

              <Route path={`${baseUrl}/map`} component={MapDashboard} />

              <Route
                path={`${baseUrl}/contractors`}
                component={(props) => <Contracts />}
              />
            </Switch>
          </Content>
        </div>
      </Layout>
    </Layout>
     </AppContext.Provider>
  );
};

export default BaseLayout;
