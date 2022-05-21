import React from "react";
import { useHistory } from "react-router-dom";
import CustomList from "../../../components/List";
import ListItem from "../../../components/ListItem";
import ListItemActions from "../../../components/ListItemActions";
import {
  Col,
  Drawer,
  Layout,
  Button,
  Menu,
  Breadcrumb,
  Row,
  Card,
  Input,
} from "antd";
const nameSpan = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const descriptionSpan = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const contractNoSpan = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const contractorSpan = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const estimentedAmountNoSpan = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const completeDateSpan = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const financialProgress = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const Contractor = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };

const headerLayout = [
  { ...nameSpan, header: "Package" },
  { ...descriptionSpan, header: "Concern Type" },
  { ...contractNoSpan, header: "Issue" },
  { ...contractorSpan, header: "Commitment" },
  { ...estimentedAmountNoSpan, header: "Steps Taken" },
  { ...completeDateSpan, header: "Challenges" },
  { ...financialProgress, header: "Mitigation Measures" },
];
const { Content } = Layout;

const dummyData = [
  {
    package: "Package 1",
    concern_type: "Environmental",
    issue: "Noise and vibration",
    commitment: "High Impact noise and vibration",
    steps_taken: "compiled",
    challenges: "none",
    mitigation_measures: " - ",
  },
  {
    package: "Package 2",
    concern_type: "Social",
    issue: "Employment",
    commitment: "About 148 workers have been employed",
    steps_taken: "employees provided with contracts",
    challenges: "none",
    mitigation_measures: " - ",
  },
];

// const dummyData = [];

const Index = ({ packages, loading, handleRefresh, match }) => {
  const history = useHistory();
  const handleViewDetails = (item) => {
    const path = `${match.url}/${item.id}`;
    history.push(path);
  };

  return (
    <>
      <div style={{ padding: "0 0 15px 0" }}>
        <Breadcrumb separator=">" style={{ marginBottom: "5px" }}>
          <Breadcrumb.Item>Ilala</Breadcrumb.Item>
          <Breadcrumb.Item>Safeguard Concents</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            margin: 0,
          }}
          className="BaseLayoutContent"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3>Safeguard Concerns</h3>
            <Button
              style={{ border: "1.5px solid  #1890ff", color: "#1890ff" }}
            >
              + New Safeguard Concern
            </Button>
          </div>
        </Content>
      </div>
      <div>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
              <Card bordered={true} className="text-blue">
                <span>10</span>
                <h4>Environmental Concerns</h4>
              </Card>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
              <Card bordered={true} className="text-blue">
                <span>3</span>
                <h4>Social Concerns</h4>
              </Card>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
              <Card bordered={true} className="text-blue">
                <span>2</span>
                <h4>Healthy & Safety Concerns</h4>
              </Card>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
              <Card bordered={true} className="text-blue">
                <h4>Lastest report</h4>
                <h4>May 12 2021</h4>
              </Card>
            </Col>
          </Row>
        </div>

        <CustomList
          itemName="Packages"
          items={dummyData}
          page={1}
          itemCount={dummyData.length}
          loading={loading}
          onRefresh={handleRefresh}
          headerLayout={headerLayout}
          renderListItem={({ item }) => (
            <ListItem
              key={item.id} // eslint-disable-line
              name={item?.package}
              item={item}
              renderActions={() => (
                <ListItemActions
                  view={{
                    name: "View Details",
                    title: "View more detail of selected Package",
                    onClick: () => handleViewDetails(item),
                  }}
                />
              )}
            >
              {/* eslint-disable react/jsx-props-no-spreading */}

              <Col {...nameSpan}>{item?.package ? item?.package : "N/A"}</Col>
              <Col {...descriptionSpan} className="contentEllipse">
                {item?.concern_type ? item?.concern_type : "N/A"}
              </Col>
              <Col {...contractNoSpan}>{item?.issue ? item?.issue : "N/A"}</Col>
              <Col {...estimentedAmountNoSpan} className="contentEllipse">
                {item?.commitment ? item?.commitment : "N/A"}
              </Col>
              <Col {...estimentedAmountNoSpan} className="contentEllipse">
                {item?.steps_taken ? item?.steps_taken : "N/A"}
              </Col>
              <Col {...estimentedAmountNoSpan} className="contentEllipse">
                {item?.challenges ? item?.challenges : "N/A"}
              </Col>
              <Col {...estimentedAmountNoSpan} className="contentEllipse">
                {item?.mitigation_measures ? item?.mitigation_measures : "N/A"}
              </Col>

              {/* eslint-enable react/jsx-props-no-spreading */}
            </ListItem>
          )}
        />
      </div>
    </>
  );
};

export default Index;
