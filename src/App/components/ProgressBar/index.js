import React from "react";
import { Avatar, Col, Row } from "antd";
import randomColor from "randomcolor";
import ProgressBar from "../Progress";

import "./styles.css";

const ProgressBarOverview = ({ item, title, bgcolor }) => {
  const avatarBackground = randomColor();

  return (
    <div className="ProgressBarOverview">
      <h4 className="text-blue" style={{ marginBottom: 30 }}>
        {title}
      </h4>
      {item.map((data) => {
        return (
          <Row  className="ProgressBarRow">
            <Col className="progressBar-content">
            <Avatar style={{ backgroundColor: avatarBackground }}>
                  {data.name.charAt(0).toUpperCase()}
                </Avatar>
                <span>{data.name}</span>
              {/* <Col xxl={1} xl={1} lg={1} md={1} sm={2} xs={2}>
                <Avatar style={{ backgroundColor: avatarBackground }}>
                  {data.name.charAt(0).toUpperCase()}
                </Avatar>
                <span>{data.name}</span>
              </Col> */}
              {/* <Col xxl={4} xl={4} lg={4} md={4} sm={4} xs={4} className="progress-name">
                <p>{data.name}</p>
              </Col> */}
            </Col>
            <Col xxl={18} xl={18} lg={18} md={18} sm={18} xs={18} className="progressbar">
              <ProgressBar completed={data.complete} bgcolor={bgcolor} />
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

export default ProgressBarOverview;
