import React, { useEffect, useState } from "react";
import { Layout, Menu, Row, Input } from "antd";
import { Link, Switch } from "react-router-dom";
import PrivateRoute from "../Auth/PrivateRoute";
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
import CreateReportForm from "../Reports/components/CreateReportForm";
const { Header, Content, Sider } = Layout;

const BaseLayout = (props) => {
  const [project, setProject] = useState(null);
  const [procuringEntity, setProcuringEntity] = useState(null);
  const [currentMenu, setCurrentMenu] = useState("");
  const {
    match: { url: baseUrl, params },
  } = props;
  const [collapsed, setCollapse] = useState(false);

  // persist current menu in local storage
  useEffect(() => {
    if(currentMenu) {
      localStorage.setItem('currentMenu', currentMenu);
    }
    console.log(currentMenu);
  }, [currentMenu]);

  useEffect(() => {
    API.getProcuringEntity(params.procuringEntityId)
      .then((res) => {
        setProcuringEntity(res.data);
        setProject(res.data.project);
      })
      .catch((err) => console.log(err));
  }, [params.procuringEntityId]);

  // set current menu from local storage
  useEffect(() => {
    const menu = localStorage.getItem("currentMenu");
    menu ? setCurrentMenu(menu) : setCurrentMenu("overview");
 
  }, []);

  const toggle = () => {
    setCollapse({
      collapsed: !collapsed,
    });
  };
  return (
    <AppContext.Provider value={{ app: { project, procuringEntity } }}>
      <Layout style={{ height: "100vh" }}>
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
            selectedKeys={[currentMenu]}
            onSelect={({ key }) => setCurrentMenu(key)}
            style={{
              height: "100%",
              borderRight: 0,
              paddingBlockStart: "2rem",
            }}
            theme="dark"
          >
            <h3 className="text-blue">Ilala</h3>

            <Menu.Item key="overview">
              <span className="CustomizedIcon" />
              <Link to={`${baseUrl}/overview`}>Overview</Link>
            </Menu.Item>

            <Menu.Item key="reports">
              <span className="CustomizedIcon" />
              <Link to={`${baseUrl}/reports`}>Reports</Link>
            </Menu.Item>
            <Menu.Item key="safeguard">
              <span className="CustomizedIcon" />
              <Link to={`${baseUrl}/safeguard`}>Safeguard Concerns</Link>
            </Menu.Item>
            <Menu.Item key="packages">
              <span className="CustomizedIcon" />
              <Link to={`${baseUrl}/packages`}>Packages</Link>
            </Menu.Item>
            <Menu.Item key="sub-projects">
              <span className="CustomizedIcon" />
              <Link to={`${baseUrl}/sub-projects`}>Sub-Projects</Link>
            </Menu.Item>
            <Menu.Item key="map">
              <span className="CustomizedIcon" />
              <Link
                to={`/map/procuring_entity/${props.match.params.procuringEntityId}`}
              >
                Map
              </Link>
            </Menu.Item>
            <Menu.Item key="csc-contract">
              <span className="CustomizedIcon" />
              <Link to={`${baseUrl}/contract`}>CSC Contract</Link>
            </Menu.Item>
            <Menu.Item style={{position:"absolute", bottom:"0"}} key="settings">
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
              style={{ margin: 0, paddingTop: '5%' }}
              className="BaseLayoutContent"
            >
              <Switch>
                <PrivateRoute
                  path={`/procuring_entity/:procuringEntityId/overview`}
                  component={({ match }) => <ProcuringEntity match={match} setCurrentMenu={setCurrentMenu} />}
                />
                <PrivateRoute
                  path={`/procuring_entity/:procuringEntityId/safeguard`}
                  component={({ match }) => <SafeGuard match={match} />}
                />
                <PrivateRoute
                  path={`/procuring_entity/:procuringEntityId/packages`}
                  component={({ match }) => <Packages match={match} />}
                />

                {/*  Reports routes */}
                <PrivateRoute
                  exact
                  path={'/procuring_entity/:procuringEntityId/reports'}
                  component={(props) => <Reports {...props} />}
                />
                <PrivateRoute
                  path={`/procuring_entity/:procuringEntityId/reports/create`}
                  component={(props) => <CreateReportForm {...props} />}
                />



                <PrivateRoute
                  path={`/procuring_entity/:procuringEntityId/sub-projects`}
                  component={({ match }) => <SubProjects match={match} />}
                />

                <PrivateRoute
                  path={`/procuring_entity/:procuringEntityId/contractors`}
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
