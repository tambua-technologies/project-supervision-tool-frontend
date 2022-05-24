import React from "react";
import { Card, Col, Row } from "antd";
import "./styles.css";


const TopSummaryItem = (props) => {
  const { label, value, cardType } = props;

  return cardType ? (<Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
    <Card  bordered={true} className="text-blue">
      <span>{value}</span>
      <h4 className="cardhead">{label}</h4>
    </Card>
  </Col>) : (<Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
    <Card  bordered={true} className="text-blue">
      <span>{value}</span>
      <h4>{label}</h4>
    </Card>
  </Col>);
}


/**
 * @function 
 * @name TopSummary
 * @description Top summary component
 * @param {object[]} summaries list of summaries
 * @param {object} summaries.label label
 * @param {object} summaries.value value
 * @param {*} props 
 * @returns 
 */
const TopSummary = ({summaries}) => {
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        {summaries.map((summary, index) => <TopSummaryItem key={index} label={summary.label} value={summary.value} cardType={summary.cardType}/>)}
      </Row>
    </div>
  )
}
 
export default TopSummary;
