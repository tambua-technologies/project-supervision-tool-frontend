import React from "react";
import './style.css';
import { Button, Form, Input, InputNumber } from "antd";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const UsersForm = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Form
    className="user-form"
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={["user", "name"]}
        label="Role Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Role Name" />
      </Form.Item>
      <Form.Item
        name={["user", "email"]}
        label="Description"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Description"/>
      </Form.Item>
      <Form.Item name={["user", "Permission"]} label="Permission">
        <Input.TextArea placeholder="Permission" />
      </Form.Item>
    </Form>
  );
};

export default UsersForm;
