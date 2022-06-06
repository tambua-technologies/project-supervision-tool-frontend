import React, { useEffect, useState } from "react";
import API from "../../../../API";
import TopSummary from "../../../components/TopSummary";
import "./style.css";
import Img from "../../../../../src/assets/img/prof.jpg";
import TopContent from "../../../components/TopContent";
import TableContainer from "../../../components/TableContainer";

const columns = [
  {
    title: "Sub-Project",
    dataIndex: "name",
  },
  {
    title: "Status",
    dataIndex: "age",
  },
  {
    title: "Actual Physcal Progress(%)",
    dataIndex: "address",
  },
  {
    title: "Financial Progress(%)",
    dataIndex: "address",
  },
  {
    title: "Latest Update",
    dataIndex: "address",
  },
];

const Package = (props) => {

  const [subProjects, setSubProjects] = useState([]);

  const {
    match: { url },
  } = props;
  const allReportsUrl = url.replace("overview", "reports");
  const summaries = [
    { label: "Actual Progress", value: "22" },
    { label: "Planned Progress", value: "42" },
    { label: "Sub-Projects", value: "202" },
    { label: "Challenges", value: "202" },
  ];
  const contents = [
    { title: "Works Types", description: "Drainage system, Road" },
    { title: "Works Types", description: "Drainage system, Road" },
    { title: "Works Types", description: "Drainage system, Road" },
    { title: "Works Types", description: "Drainage system, Road" },
  ];
  const titles = [
    { title: "Sub-Project", key: "Sub_name", avatar: true },
    { title: "Status", key: "progress" },
    { title: "Actual Physical progress(%)", key: "remark" },
    { title: "Financial Progress(%)", key: "Challenge" },
    // { title: "Latest Update" },
  ];

  const subProjetsConfigs = [
    {title: "Sub-Project", key: "name", avatar: true},
    {title: "Status", key: "status.name"},
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
    // {
    //   Sub_name:"Ndanda Road",
    //   progress:"Ongoing",
    //   remark:"55",
    //   Challenge:"50",
    //   latest:"Jan 10,2022"
    // },
  ];

  useEffect(() => {
    API.get(`/sub_projects/`, {page: 1, per_page: 3})
    .then(res => {
      setSubProjects(res.data);
      console.log(res.data)
    })

  }, []);


  return (
    <div>
      <TopSummary summaries={summaries} />
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
        <div style={{ width: "50%", backgroundColor: "#F5F5F5" }}>
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
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "15px",
          marginBottom: "20px",
        }}
      >
        {/* safeguards concerns table */}
        <TableContainer tableData={data} titles={titles} />
      </div>
    </div>
  );
};
export default Package;
