import React, { useEffect, useState } from "react";
import { Layout, Menu, Row, Input } from "antd";
import { Link, Route, Switch } from "react-router-dom";
import Contract from "../ProcuringEntities/components/Contract";
import UserMenu from "../Auth/components/UserMenu";
import Packages from "../Packages";
import SubProjects from "../SubProjects";
import SafeGuard from "../SafeguardConcerns";
import API from "../../API";
import Reports from "../Reports";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "./styles.css";
import { AppContext } from "../../context/AppContext";
import ProcuringEntity from "../ProcuringEntities/components/ProcuringEntity";
const { Header, Content, Sider } = Layout;

const BaseLayout = (props) => {
  const [project, setProject] = useState(null);
  const [procuringEntity, setProcuringEntity] = useState(null);
  const {
    match: { url: baseUrl, params },
  } = props;
  const [collapsed, setCollapse] = useState(false);

  useEffect(() => {
    API.getProcuringEntity(params.procuringEntityId)
      .then((res) => {
        setProcuringEntity(res.data);
        setProject(res.data.project);
      })
      .catch((err) => console.log(err));
  }, [params.procuringEntityId]);

  const toggle = () => {
    setCollapse({
      collapsed: !collapsed,
    });
  };
  return (
    <AppContext.Provider value={{ app: { project, procuringEntity } }}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider  className="sider-layout">
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
            style={{
              height: "100%",
              borderRight: 0,
              paddingBlockStart: "2rem",
            }}
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
              <Link
                to={`/map/procuring_entity/${props.match.params.procuringEntityId}`}
              >
                Map
              </Link>
            </Menu.Item>
            <Menu.Item>
              <span className="CustomizedIcon" />
              <Link to={`${baseUrl}/contract`}>CSC Contract</Link>
            </Menu.Item>
            <Menu.Item style={{position:"absolute", bottom:"0"}}>
            <span className="CustomizedIcon" />
              <Link to={`${baseUrl}/settings`}>Settings</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="BaseLayout">
          <Header className="header">
            <Row type="flex" className="header-content">
              <div className="header-left-content">
              <Input
                  placeholder="Search here"
                  allowClear
                  className="TopbarSearch"
                  size="large"
                />
              </div>
              <div>
              <UserMenu />
              </div>
            </Row>
          </Header>

          <div className="maincontent-layout">
            <Content
              style={{ margin: 0, paddingTop: 20 }}
              className="BaseLayoutContent"
            >
              <Switch>
                <Route
                  path={`${baseUrl}/overview`}
                  component={({ match }) => <ProcuringEntity match={match} />}
                />
                <Route
                  path={`${baseUrl}/safeguard`}
                  component={({ match }) => <SafeGuard match={match} />}
                />
                <Route
                  path={`${baseUrl}/packages`}
                  component={({ match }) => <Packages match={match} />}
                />
                <Route
                  path={`${baseUrl}/reports`}
                  component={(props) => <Reports {...props} />}
                />
                <Route
                  path={`${baseUrl}/sub-projects`}
                  component={({ match }) => <SubProjects match={match} />}
                />

                <Route
                  path={`${baseUrl}/contractors`}
                  component={(props) => <Contract />}
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
