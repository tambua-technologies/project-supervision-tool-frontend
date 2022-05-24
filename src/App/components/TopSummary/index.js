import React from "react";
import { Card, Col, Row } from "antd";
import "./styles.css";
import { isoDateToHumanReadableDate } from "../../../Util";


const TopSummaryItem = (props) => {
  const { label, value } = props;

  return (<Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
    <Card bordered={true} className="text-blue">
      <span>{value}</span>
      <h4>{label}</h4>
    </Card>
  </Col>);
}

const TopSummary = ({summaries}) => {

  

  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        {summaries.map((summary, index) => <TopSummaryItem key={index} label={summary.label} value={summary.value} />)}
      </Row>
    </div>
  )
}
 
export default TopSummary;
