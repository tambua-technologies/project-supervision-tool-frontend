import React, { useEffect, useState } from "react";
import API from "../../../../API";
import { Link, useHistory, useParams } from "react-router-dom";
import TopSummary from "../../../components/TopSummary";
import "./style.css";
import { Image } from "antd";
import Img1 from "../../../../../src/assets/img/img1.jpg";
import Img2 from "../../../../../src/assets/img/img2.jpg";
import Img3 from "../../../../../src/assets/img/img3.jpg";
import TopContent from "../../../components/TopContent";
import ActionBar from "../../../components/ActionBar";
import TableContainer from "../../../components/TableContainer";
import { moneyFormat } from "../../../../Util";
import { isoDateToHumanReadableDate } from "../../../../Util";

const Package = (props) => {
  const [subProjects, setSubProjects] = useState([]);
  const [safeguardConfig, setSafeguardConfig] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [contents, setContents] = useState([]);
  const [humanResData, setHumanResData] = useState([]);
  const [equipmentMobilizationData, setEquipmentMobilization] = useState([]);
  const history = useHistory();
  let { packageID } = useParams();

  const {
    match: { url, params },
  } = props;

  const HumanResourceUrl = `${url}/human-resources`;
  const EquipmentUrl = `${url}/equipment-mobilization`;
  const GallaryUrl = `${url}/Gallary`;
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

  const equipmentMob = [
    { title: "Name", key: "name", avatar: true },
    { title: "Capacity", key: "status.name" },
    { title: "Contract Amount", key: "status.name" },
    { title: "Mobilized Amount", key: "status.name" },
  ];
  const equipmentMobilization = [
    { title: "Equipment", key: "equipment_name", avatar: true },
    { title: "Quantity Mobilized", key: "mobilized" },
    { title: "Remarks", key: "status_of_equipment" },
  ];
  const humanRes = [
    { title: "Name", key: "name", avatar: true },
    { title: "Contract Amount", key: "status.name" },
    { title: "Mobilized Amount", key: "status.name" },
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
    });
  }, []);
  useEffect(() => {
    API.get(`/procuring_entity_packages/${params.packageId}`).then((resp) => {
      const workTypeArr = [];
      resp.work_types.map((item) => workTypeArr.push(item.name));
      const summariess = [
        {
          label: "Actual Progress",
          value: resp?.progress?.actual_physical_progress || "N/A",
        },
        {
          label: "Planned Progress",
          value: resp?.progress?.planned_physical_progress || "N/A",
        },
        { label: "Sub-Projects", value: resp.sub_projects.length },
        { label: "Challenges", value: resp.challenges_count },
      ];
      const contents_data = [
        { title: "Works Types", description: workTypeArr.join(",") },
        { title: "Contract Number", description: resp.contract.contract_no },
        {
          title: "Contract Amount",
          description: moneyFormat(resp.contract.original_contract_sum.amount),
        },
        { title: "Contractor", description: resp.contract.contractor.name },
      ];
    const dataSafeGuard =  resp.safeguard_concerns.map((item) => item)
      setSafeguardConfig(resp.safeguard_concerns);
      setHumanResData(resp.staffs);
      setContents(contents_data);
      setEquipmentMobilization(resp.equipments);
      setCardData(summariess);
    });
  }, []);
  const humanResource = [
    { title: "Position", key: "position.name", avatar: true },
    { title: "Proposed Name", key: "proposed_name" },
    { title: "Replacement", key: "replacement" },
    { title: "Remarks", key: "remarks" },
  ];
 
  return (
    <div>
       <ActionBar
        actionButtonProp={{
          title:`Package ${params.packageId}`,
        }}
      />
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
          <h2 style={{ marginLeft: "15px", fontSize: "15px" }}>
            Site Photos
          </h2>
          <div className="image-container">
            <Image
              width={300}
              style={{ padding: "5px" }}
              rootClassName="img-galary"
              src={Img1}
            />
            <Image
              width={300}
              style={{ padding: "5px" }}
              rootClassName="img-galary"
              src={Img2}
            />
            <Image
              width={300}
              style={{ padding: "5px" }}
              rootClassName="img-galary"
              src={Img3}
            />
          </div>
          <Link
            to={GallaryUrl}
            style={{ fontSize: "15px", marginLeft: "78%" }}
          >
            View All Photos
          </Link>
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
        <div className="table-container1 table-container">
          <h3>Equipment Mobilization</h3>
          {/* <TableContainer tableData={subProjects} titles={equipmentMob} /> */}
          <TableContainer
            tableData={equipmentMobilizationData}
            titles={equipmentMobilization}
          />

          <Link
            to={EquipmentUrl}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              textDecoration: "underline",
            }}
          >
            View All
          </Link>
        </div>
        <div className="table-container1 table-container">
          <h3>Human Resources</h3>
          <TableContainer tableData={humanResData} titles={humanResource} />
          <Link
            to={HumanResourceUrl}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              textDecoration: "underline",
            }}
          >
            View All
          </Link>
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
        <div
          className="list-footer "
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link
            to={HumanResourceUrl}
            onClick={() => history.push(HumanResourceUrl)}
            style={{ textDecoration: "underline" }}
          >
            View All
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Package;
