import React, { useEffect } from "react";
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
import API from '../../../../API';
import BreadCrumbContent from "../../../components/BreadCrumbContent/BreadCrumbContent";
const packageSpan = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const concernType = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const issue = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const commitment = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const stepsTaken = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const challenges = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const mitigationMeasures = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };

const headerLayout = [
  { ...packageSpan, header: "Package" },
  { ...concernType, header: "Concern Type" },
  { ...issue, header: "Issue" },
  { ...commitment, header: "Commitment" },
  { ...stepsTaken, header: "Steps Taken" },
  { ...challenges, header: "Challenges" },
  { ...mitigationMeasures, header: "Mitigation Measures" },
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



  useEffect(() => {
    API.getSafeguardConcerns()
    .then(res => console.log('safeguard concerns', res))
    .catch(err => console.log(err))
  }, []);

  return (
    <>
      {/* <div style={{ padding: "0 0 15px 0" }}>
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
      </div> */}
      <BreadCrumbContent
        title={"Safeguard"}
        name={"DMDP"}
        entity={"Procuring Entities"}
        location={"Ilala"}
        btnTitle={"Add EHS Update"}
      />
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

              <Col {...packageSpan}>
                {/* {item?.package ? item?.package : "N/A"} */}
                {"package"}
              </Col>
              <Col {...concernType} className="contentEllipse">
                {item?.concern_type ? item?.concern_type : "N/A"}
              </Col>
              <Col {...issue}>{item?.issue ? item?.issue : "N/A"}</Col>
              <Col {...commitment} className="contentEllipse">
                {item?.commitment ? item?.commitment : "N/A"}
              </Col>
              <Col {...stepsTaken} className="contentEllipse">
                {item?.steps_taken ? item?.steps_taken : "N/A"}
              </Col>
              <Col {...challenges} className="contentEllipse">
                {item?.challenges ? item?.challenges : "N/A"}
              </Col>
              <Col {...mitigationMeasures} className="contentEllipse">
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
