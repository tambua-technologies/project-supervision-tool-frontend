import { Row, Col, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import TopSummary from "../../../components/TopSummary";
import ProgressBarOverview from "../../../components/ProgressBar";
import "./styles.css";
import API from "../../../../API";
import { isoDateToHumanReadableDate } from "../../../../Util";
import { LoadingOutlined } from "@ant-design/icons";
import ActionBar from "../../../components/ActionBar";
import { setActiveMenuItem } from "../../../../redux/modules/app/actions"

import TableContainer from "../../../components/TableContainer";
import { useDispatch } from "react-redux";
import { AppContext } from "../../../../context/AppContext";
import { UPLOAD_SAFEGUARD_CONCERNS_ENDPOINT} from '../../../../API/endpoints';

const ProcuringEntity = (props) => {
  const [physicalProgress, setPysicalProgress] = useState([]);
  const [financialProgress, setFinancialProgress] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [reports, setReports] = useState([]);
  const { sideMenuKeys } = useContext(AppContext);
  const history = useHistory();
  const dispatch = useDispatch();

  const { match: { url } } = props;
  const allReportsUrl = url.replace(sideMenuKeys.overview, sideMenuKeys.reports);
  const addFieldUrl = url.replace(sideMenuKeys.overview, sideMenuKeys.fieldNotes);
  const createReportFormUrl = `${allReportsUrl}/create`;
  const fieldNoteUrl = `${addFieldUrl}/create`;

  const handleOnClickViewAllReports = () => {
    history.push(allReportsUrl);
    dispatch(setActiveMenuItem(sideMenuKeys.reports));

  }

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
        let dataArr = res.data.reports;
        const result = dataArr.map((repo) =>
          repo.start.length > 0
            ? {
              ...repo,
              generatedBy: "N/A",
              period: `${isoDateToHumanReadableDate(
                repo.start
              )} - ${isoDateToHumanReadableDate(repo.end)}`,
              updated_at: isoDateToHumanReadableDate(repo.updated_at),
            }
            : "N/A"
        );
        setReports(result);
        setFinancialProgress(financialProgress);
        setPysicalProgress(physicalProgress);
        setSummaries(statisticsSummaries);
      })
      .catch((err) => console.log(err));
  }, []);

  const headings = [
    { title: "Title", key: "report_title", avatar: true },
    { title: "Report Period", key: "period" },
    { title: "Generated by", key: "generatedBy" },
    { title: "Last Update", key: "updated_at" },
  ];

  const handleOnUploadSafeguardConcerns = (e) =>  {
    const file = e.target.files[0];
    API.upload(UPLOAD_SAFEGUARD_CONCERNS_ENDPOINT, file)
  }

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
              btnName: "Import OHS or Safeguard concerns",
              btnAction: handleOnUploadSafeguardConcerns,
              btnType: 'upload',
            },
            {
              btnName: "Add Field Note ",
              btnAction: () => history.push(fieldNoteUrl),
            },
            {
              btnName: "New Monthly Report ",
              btnAction: () => history.push(createReportFormUrl),
            },
          ],
        }}
      />
      <TopSummary summaries={summaries} />
      <div
        style={{
          backgroundColor: "#f5f5f5",
          marginBottom: "20px",
          padding: "10px",
        }}
      >
        <h3>Latest Reports</h3>
        <TableContainer tableData={reports} titles={headings} />
        <div
          className="list-footer "
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link onClick={handleOnClickViewAllReports} style={{ textDecoration: "underline" }}>
            View All Reports
          </Link>
        </div>
      </div>
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
