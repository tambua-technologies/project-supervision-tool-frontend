import React from "react";
import TableContainer from "../../../components/TableContainer";
import TopContent from "../../../components/TopContent";
import ImgMapp from "../../../../../src/assets/img/mapp.png";
import Img1 from "../../../../../src/assets/img/flyover.png";
import Img2 from "../../../../../src/assets/img/mradi1.png";
import Img3 from "../../../../../src/assets/img/mradi2.jpg";
import "./style.css";

const Subproject = () => {
  const contents = [
    { title: "Work Types", description: "Road" },
    { title: "Name", description: "Ndanda Road" },
    { title: "Length", description: "1.27km" },
    { title: "Contractor", description: "Mhandisi Consultancy Ltd" },
  ];
  const titles = [
    { title: "Sub-Project", key: 'Sub_name', avatar: true },
    { title: "Progress of Works", key: 'progress' },
    { title: "Remarks", key: 'remark' },
    { title: "Challenges", key: 'Challenge' },
  ]
  const data = [
    {
      Sub_name: "Ndanda Road",
      progress: "Lower Sub grade (G7)",
      remark: "1.45km",
      Challenge: "-"
    },
    {
      Sub_name: "Ndanda Road",
      progress: "Lower Sub grade (G7)",
      remark: "1.45km",
      Challenge: "-"
    },
    {
      Sub_name: "Ndanda Road",
      progress: "Lower Sub grade (G7)",
      remark: "1.45km",
      Challenge: "-"
    },
    {
      Sub_name: "Ndanda Road",
      progress: "Lower Sub grade (G7)",
      remark: "1.45km",
      Challenge: "-"
    }
  ]
  return (
    <div className="subproject-container">
      <h3>Ndanda Road</h3>
      <div className="rectangle-container">
        {contents.map((item) => (
          <TopContent title={item.title} description={item.description} />
        ))}
      </div>
      <div className="table-container">
        <h3>Detailed Progress</h3>
        <TableContainer titles={titles} tableData={data} />
      </div>
      <div className="container-content">
        <div className="map-container">
          <h3>Subproject Map</h3>
          <img src={ImgMapp} alt="map-img" />
        </div>
        <div className="photos-container">
          <div className="top-content">
            <h3>Subproject Photos</h3>
            <a href="#">View All Photos</a>
          </div>
          <div className="photos">
            <img src={Img1} alt="Img1" />
            <img src={Img2} alt="Img1" />
            <img src={Img3} alt="Img1" />
            <img src={Img2} alt="Img1" />
            <img src={Img1} alt="Img1" />
            <img src={Img3} alt="Img1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subproject;
