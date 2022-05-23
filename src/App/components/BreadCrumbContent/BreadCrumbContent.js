import React, { useState } from "react";
import {
  Col,
  Drawer,
  Layout,
  Button,
  Menu,
  Breadcrumb,
  Row,
  Input,
} from "antd";
const { Content } = Layout;

const BreadCrumbContent = ({ title, name, entity, location, btnTitle }) => {
  return (
    <div style={{ padding: "0 0 15px 0" }}>
      <Breadcrumb separator=">" style={{ marginBottom: "5px" }}>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
        <Breadcrumb.Item>{name}</Breadcrumb.Item>
        <Breadcrumb.Item>{entity}</Breadcrumb.Item>
        <Breadcrumb.Item>{location}</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          margin: 0,
        }}
        className="BaseLayoutContent"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>{title}</h3>
          {btnTitle ? (
            <Button
              style={{ border: "1.5px solid  #1890ff", color: "#1890ff" }}
            >
              {btnTitle}
            </Button>
          ) : (
            " "
          )}
        </div>
      </Content>
    </div>
  );
};

export default BreadCrumbContent;
