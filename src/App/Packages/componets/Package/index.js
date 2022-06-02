import React from "react";
import TopSummary from "../../../components/TopSummary";
import { Table } from "antd";
import TopContent from "../../../components/TopContent";
import "./style.css";
import LatestReports from "../../../components/TableComponent";
import Img from "../../../../../src/assets/img/prof.jpg";


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
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
];

const Package = (props) => {
  const { match: {url} } = props;
  const allReportsUrl = url.replace('overview', 'reports');
  const summaries = [
    { label: "Actual Progress", value: "22" },
    { label: "Planned Progress", value: "42" },
    { label: "Sub-Projects", value: "202" },
    { label: "Challenges", value: "202" },
  ];
  const contents = [
    {type:"Work Type", descrpt:"Drainage system, Road"},
    {type:"Work Type", descrpt:"Drainage system, Road"},
    {type:"Work Type", descrpt:"Drainage system, Road"},
    {type:"Work Type", descrpt:"Drainage system, Road"},
  ]

  return (
    <div>
      <TopSummary summaries={summaries} />
      <div className="rectangle-container">
      {contents.map(item =>(<TopContent type={item.type} descrpt={item.descrpt}/>))}
      </div>
      {/* {contents.map(item =>(<TopContent type={item.type} descrpt={item.descrpt}/>))} */}
      <section
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom:"20px"
        }}
      >
        <div style={{ width: "50%", backgroundColor: "#F5F5F5" }}>
          <LatestReports  reports={columns} allReportsUrl={allReportsUrl}/>
        </div>
        <div className="container">
          <h2 style={{marginLeft:"15px", fontSize:"15px", color:"blue"}}>Site photes</h2>
          <div className="image-container">
            <img src={Img} alt="Img" />
            <img src={Img} alt="Img" />
            <img src={Img} alt="Img" />
          </div>
          <h2 style={{ fontSize:"15px", color:"blue", marginLeft:"78%"}}>view All Photos</h2>
        </div>
      </section>
      <div>
      <LatestReports  reports={columns} allReportsUrl={allReportsUrl}/>
      </div>
    </div>
  );
};
export default Package;
