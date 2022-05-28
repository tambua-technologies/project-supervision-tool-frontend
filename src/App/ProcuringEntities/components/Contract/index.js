
import React, { useContext, useEffect } from "react";
import { Card, Row, Col } from 'antd';
import { AppContext } from '../../../../context/AppContext';
import { isoDateToHumanReadableDate } from '../../../../Util/index';

const Contract = () => {
  const { procuringEntity } = useContext(AppContext);
  useEffect(() =>{
      console.log('its work',procuringEntity)
  },[procuringEntity])

  return procuringEntity ? (
    <>
    <div>
      <h3>CSC Contract</h3>
    </div>
    <div>
    <Card bordered={false} style={{ width: "100%" ,backgroundColor: "#f5f5f5"}} >
    <Row>
      <Col span={6}>{ procuringEntity.project.code}</Col>
      <Col span={6}>
        UWP Consulting SA <br />
        UWP Tanzania
      </Col>
      <Col span={6}>{procuringEntity.contract.original_contract_sum.currency} {procuringEntity.contract.original_contract_sum.amount}</Col>
      <Col span={6}>Flood Control and Storm Water Drainage </Col>
    </Row>
    <Row style={{color:"#1890ff"}}>
      <Col span={6}>Procuring Entity</Col>
      <Col span={6}>In Association With</Col>
      <Col span={6}>Original Contract Period</Col>
      <Col span={6}>Extended Contract Period</Col>
    </Row>
    <Row>
      <Col span={6}>{procuringEntity.agency.name}</Col>
      <Col span={6}>{procuringEntity.contract.consortium_name}</Col>
      <Col span={6}>48 months</Col>
      <Col span={6}>21 months</Col>
    </Row>
    <Row style={{color:"#1890ff"}}>
      <Col span={6}>Supervision Consultant Contract No.</Col>
      <Col span={6}>Commencement Date</Col>
      <Col span={6}>Original Completion Date</Col>
      <Col span={6}>Revised Completion Date</Col>
    </Row>
    <Row>
      <Col span={6}>{procuringEntity.contract.contract_no}</Col>
      <Col span={6}>{isoDateToHumanReadableDate(procuringEntity.contract.commencement_date)}</Col>
      <Col span={6}>june 1,2016</Col>
      <Col span={6}>june 1,2016</Col>
    </Row>
    </Card>
  </div>
  </>
  ) : '';
}


export default Contract;