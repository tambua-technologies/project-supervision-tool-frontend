import React from "react";
import { Avatar, Col, Row } from "antd";
import ProgressBar from "../Progress";

import "./styles.css";

const ProgressBarOverview = ({ item, title, bgcolor }) => {

  return (
    <div className="ProgressBarOverview">
      <h4 className="text-blue" style={{ paddingBottom: 10 }}>
        {title}
      </h4>
      {item.map((data) => {
        return (
          <Row className="ProgressBarRow">
            <Col xxl={6} xl={6} lg={6} md={6} sm={6} xs={6} className="progressBar-content">
              <Avatar 
              style={{ backgroundColor: bgcolor, marginRight: '10px' }}
              size="small"
              >
                {data.name.charAt(0).toUpperCase()}
              </Avatar>
              <span style={{paddingRight: '5px'}}>{data.name}</span>
            </Col>
            <Col xxl={18} xl={18} lg={18} md={18} sm={18} xs={18} className="progressbar">
              <ProgressBar  completed={data.complete} bgcolor={bgcolor} />
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

export default ProgressBarOverview;
