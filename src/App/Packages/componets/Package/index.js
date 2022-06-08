import React, { useEffect, useState } from "react";
import API from "../../../../API";
import TopSummary from "../../../components/TopSummary";
import "./style.css";
import Img from "../../../../../src/assets/img/prof.jpg";
import TopContent from "../../../components/TopContent";
import TableContainer from "../../../components/TableContainer";
import HumanResources from "./HumanResource";
import EquipmentMobilization from "./EquipmentMobilization";
const Package = (props) => {
  const [subProjects, setSubProjects] = useState([]);
  const [safeguardConfig, setSafeguardConfig] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [contents, setContents] = useState([]);

  const { match } = props;
  const packageId = match.params;
  console.log(packageId);
  useEffect(() => {
    API.get("safeguard_concerns").then((res) => {
      // setSafeguardConfig(res.data);
      console.log(res.data);
    });
  }, []);
  console.log(safeguardConfig);
  const summaries = [
    { label: "Actual Progress", value: "22" },
    { label: "Planned Progress", value: "42" },
    { label: "Sub-Projects", value: "202" },
    { label: "Challenges", value: "202" },
  ];

  const headings = [
    { title: "Concern Type", key: "concern_type", avatar: true },
    { title: "Issue", key: "issue" },
    { title: "Commitment", key: "commitment" },
    { title: "Steps Taken", key: "steps_taken" },
    { title: "Challenges", key: "challenges" },
    { title: "Mitigation Measures", key: "mitigation_measures" },
    { title: "Latest Update", key: "updated_at" },
  ];

  const subProjetsConfigs = [
    { title: "Sub-Project", key: "name", avatar: true },
    { title: "Status", key: "status.name" },
  ];

  const data = [
    {
      progress: "Ongoing",
      Sub_name: "Ndanda Road",
      Challenge: "50",
      remark: "55",
      // latest: "Jan 10,2022",
    },
    {
      Sub_name: "Ndanda Road",
      progress: "Ongoing",
      remark: "55",
      Challenge: "50",
      // latest: "Jan 10,2022",
    },
    {
      Sub_name: "Ndanda Road",
      remark: "55",
      progress: "Ongoing",

      Challenge: "50",
      // latest: "Jan 10,2022",
    },
    {
      progress: "Ongoing",
      remark: "55",
      Challenge: "50",
      Sub_name: "Ndanda Road",
      // latest: "Jan 10,2022",
    },
  ];

  useEffect(() => {
    API.get(`/sub_projects/`, { page: 1, per_page: 3 }).then((res) => {
      setSubProjects(res.data);
      console.log(res.data);
    });
  }, []);
  useEffect(() => {
    API.get("/procuring_entity_packages/1").then((resp) => {
      console.log(resp);
      const summariess = [
        {
          label: "Actual Progress",
          value: resp.progress.actual_physical_progress,
        },
        {
          label: "Planned Progress",
          value: resp.progress.planned_physical_progress,
        },
        { label: "Sub-Projects", value: resp.sub_projects.length },
        { label: "Challenges", value: "202" },
      ];
      const contents_data = [
        { title: "Works Types", description: "Drainage system, Road" },
        { title: "Contract Number", description: resp.contract.contract_no },
        { title: "Contract Amount", description: "Drainage system, Road" },
        { title: "Contractor", description: "Drainage system, Road" },
      ];
      setSafeguardConfig(resp.safeguard_concerns);

      setContents(contents_data);
      setCardData(summariess);
    });
  }, []);
  console.log(subProjects);
  return (
    <div>
      <TopSummary summaries={cardData} />
      <div className="rectangle-container">
        {contents.map((content) => (
          <TopContent title={content.title} description={content.description} />
        ))}
      </div>
      <section
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div className="table-container">
          {/* Sub projects table */}
          <TableContainer tableData={subProjects} titles={subProjetsConfigs} />
        </div>
        <div className="container">
          <h2 style={{ marginLeft: "15px", fontSize: "15px", color: "blue" }}>
            Site photes
          </h2>
          <div className="image-container">
            <img src={Img} alt="Img" />
            <img src={Img} alt="Img" />
            <img src={Img} alt="Img" />
          </div>
          <h2 style={{ fontSize: "15px", color: "blue", marginLeft: "78%" }}>
            view All Photos
          </h2>
        </div>
      </section>
      <section
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div className="table-container1">
          <h3>Equipment Mobilization</h3>
          <TableContainer tableData={subProjects} titles={subProjetsConfigs} />
        </div>
        <div className="table-container1">
          <h3>Human Resources</h3>
          <TableContainer tableData={subProjects} titles={subProjetsConfigs} />
        </div>
      </section>
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "15px",
          marginBottom: "20px",
        }}
        className="bottom-table"
      >
        {/* safeguards concerns table */}
        <TableContainer tableData={safeguardConfig} titles={headings} />
      </div>
    </div>
  );
};
export default Package;
