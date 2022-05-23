import { Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import TopSummary from "../../../components/TopSummary";
import ProgressBarOverview from "../../../components/ProgressBar";
import "./styles.css";
import BaseMap from "../../../Map/components/BaseMap";
import API from "../../../../API";

const ProcuringEntity = () => {
  const [statistics, setStatistics] = useState(null);
  const [physicalProgress, setPysicalProgress] = useState([]);
  const [financialProgress, setFinancialProgress] = useState([]);


useEffect(() => {
  API.getProcuringEntitiesStatistics(1)
  .then(res => {
    const physicalProgress = res.data.package_progress.map((p) => ({name: p.package_name, complete: p.actual_physical_progress}));
    const financialProgress = res.data.package_progress.map((p) => ({name: p.package_name, complete: p.actual_financial_progress}));

    setFinancialProgress(financialProgress);
    setPysicalProgress(physicalProgress);
    setStatistics(res.data);

  })
  .catch(err => console.log(err));
}, []);

  return statistics ? (
    <div className="ProcuringEntity">
      <TopSummary
        packages={statistics.packages}
         subProjects={statistics.subProjects}
         contractors={statistics.contractors}
         latestReport={statistics?.reports?.length > 0 ? statistics.reports[0].created_at : null}
         />

      <section className="ProcuringEntity-progress">
        <Row gutter={16}>
          <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
            <ProgressBarOverview
              title="Actual Physical Progress (%)"
              item={physicalProgress}
              bgcolor={"#286b6b"}
            />
          </Col>

          <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
            <ProgressBarOverview
              title="Financial Progress (%)"
              item={financialProgress}
              bgcolor={"#0f6788"}
            />
          </Col>
        </Row>
      </section>

      <section className="ProcuringEntity-map-report">
        <Row gutter={16}>
          <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} style={{ height: "50px" }}>
            <h4 className="text-blue" style={{ marginBottom: 30, fontSize: 16 }}>
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
  ) : '';
};

export default ProcuringEntity;
