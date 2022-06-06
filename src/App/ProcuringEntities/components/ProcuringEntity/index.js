import { Row, Col, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TopSummary from "../../../components/TopSummary";
import ProgressBarOverview from "../../../components/ProgressBar";
import "./styles.css";
import API from "../../../../API";
import { isoDateToHumanReadableDate } from "../../../../Util";
import { LoadingOutlined } from "@ant-design/icons";
import ActionBar from "../../../components/ActionBar";
import LatestReports from "../../../components/TableComponent";

const ProcuringEntity = (props) => {
  const [physicalProgress, setPysicalProgress] = useState([]);
  const [financialProgress, setFinancialProgress] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [reports, setReports] = useState([]);

  
  const { match: {url}, setCurrentMenu } = props;
  const allReportsUrl = url.replace('overview', 'reports');
  const createReportFormUrl = `${allReportsUrl}/create`;
  const history = useHistory();

  useEffect(() => {
    const { procuringEntityId } = props.match.params;
    API.getProcuringEntitiesStatistics(procuringEntityId)
      .then((res) => {
        const physicalProgress = res.data.package_progress.map((p) => ({
          name: p.package_name,
          complete: p.actual_physical_progress,
        }));
        const financialProgress = res.data.package_progress.map((p) => ({
          name: p.package_name,
          complete: p.actual_financial_progress,
        }));
        const statisticsSummaries = [
          { label: "Packages", value: res.data.packages },
          { label: "Sub Projects", value: res.data.subProjects },
          { label: "Contractors", value: res.data.contractors },
          {
            label:
              res.data.reports?.length > 0
                ? isoDateToHumanReadableDate(res.data.reports[0].created_at)
                : null,
            value: "Latest Report",
            cardType: "date",
          },
        ];

        setReports(res.data.reports);
        setFinancialProgress(financialProgress);
        setPysicalProgress(physicalProgress);
        setSummaries(statisticsSummaries);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 54,
      }}
      spin
    />
  );

  return summaries.length > 0 ? (
    <div className="ProcuringEntity">
      <ActionBar
        actionButtonProp={{
          title: "Overview",
          arrActions: [
            {
              btnName: "Add Field Note ",
              btnAction: () => {},
            },
            {
              btnName: "New Monthly Report ",
              btnAction: () => history.push(createReportFormUrl),
            },
          ],
        }}
      />
      <TopSummary summaries={summaries} />
      <LatestReports reports={reports} allReportsUrl={allReportsUrl} setCurrentMenu={setCurrentMenu}/>
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
    </div>
  ) : (
    <Spin
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
      indicator={antIcon}
    />
  );
};

export default ProcuringEntity;
