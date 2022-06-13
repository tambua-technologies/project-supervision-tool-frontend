import React from "react";
import "./style.css";
import { Col, Image, Row } from "antd";
import Img from "../../../assets/img/prof.jpg";
import ActionBar from "../ActionBar";

const Gallary = () => {
  return (
  <>
  <ActionBar    actionButtonProp={{
          title: "Gallary Photo",
        }} />
    <Row className="gallary-container" justify="space-between">
      <Col span={4}>
        <Image src={Img} style={{ padding: "15px" }} width={300} />
      </Col>
      <Col span={4}>
        <Image src={Img} style={{ padding: "15px" }} width={300} />
      </Col>
      <Col span={4}>
        <Image src={Img} style={{ padding: "15px" }} width={300} />
      </Col>
      <Col span={4}>
        <Image src={Img} style={{ padding: "15px" }} width={300} />
      </Col>
    </Row>
  </>
  );
};

export default Gallary;
