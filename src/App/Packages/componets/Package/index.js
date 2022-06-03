import React from "react";
import TopSummary from "../../../components/TopSummary";
import ActionBar from "../../../components/ActionBar";
import "./style.css";
import LatestReports from "../../../components/TableComponent";
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
// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sidney No. 1 Lake Park",
//   },
// ];

const Package = (props) => {
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
    { title: "Sub-Project" },
    { title: "Status" },
    { title: "Actual Physical progress(%)" },
    { title: "Financial Progress(%)" },
    // { title: "Latest Update" },
  ];
  const data = [
    {
      Sub_name: "Ndanda Road",
      progress: "Ongoing",
      remark: "55",
      Challenge: "50",
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
      progress: "Ongoing",
      remark: "55",
      Challenge: "50",
      // latest: "Jan 10,2022",
    },
    {
      Sub_name: "Ndanda Road",
      progress: "Ongoing",
      remark: "55",
      Challenge: "50",
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
          <TableContainer tableData={data} titles={titles} />
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
        <TableContainer tableData={data} titles={titles} />
      </div>
    </div>
  );
};
export default Package;
