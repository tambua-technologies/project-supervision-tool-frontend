import { Row, Col } from "antd";
import React from "react";
import TopSummary from "../TopSummary";
import ProgressBarOverview from "../ProgressBar";
import MapDashboard from "../../../Map";
// import LatestReport from "../Reports/components/LatestReport";
import "./styles.css";
import BaseMap from "../../../Map/components/BaseMap";

const progress = [
  {
    name: "package 1",
    complete: "60",
  },
  {
    name: "package 2",
    complete: "75",
  },
  {
    name: "package 3",
    complete: "60",
  },
  {
    name: "package 4",
    complete: "60",
  },
  {
    name: "package 5",
    complete: "70",
  },
  {
    name: "package 6",
    complete: "40",
  },
  {
    name: "package 7",
    complete: "76",
  },
];

const Overview = () => {
  return (
    <div className="Overview">
      <TopSummary />
      <section className="Overview-progress">
        <Row gutter={16}>
          <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
            <ProgressBarOverview
              title="Actual Physical Progress (%)"
              item={progress}
              bgcolor={"#286b6b"}
            />
          </Col>

          <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
            <ProgressBarOverview
              title="Financial Progress (%)"
              item={progress}
              bgcolor={"#0f6788"}
            />
          </Col>
        </Row>
      </section>

      <section className="Overview-map-report">
        <Row gutter={16}>
          <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} style={{height: "50px"}}>
            <h4 className="text-blue" style={{ marginBottom: 30,fontSize: 16}}>
              Procuring Entity map
            </h4>
            <div className="project-map">
                            <BaseMap zoomControl={true} position={[-5.856, 34.074]}>
                            </BaseMap>

                        </div>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
            {/* <LatestReport /> */}
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Overview;
