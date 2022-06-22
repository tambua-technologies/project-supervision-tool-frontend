import React from "react";
import "./style.css";
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

const UsersForm = ({
  firstNameInp,
  lastNameInp,
  roleInp,
  phoneNumberInp,
  roleNameInp,
  descriptionInpt,
  permissionInp,
  titleInp,
  organizationInp,
  emailInp,
}) => {
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
      {firstNameInp && (
        <Form.Item
          name={["user", "name"]}
          label="First Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
      )}
      {lastNameInp && (
        <Form.Item
          name={["user", "name"]}
          label="Last Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
      )}
      {titleInp && (
        <Form.Item
          name={["user", "title"]}
          label="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="title" />
        </Form.Item>
      )}
      {organizationInp && (
        <Form.Item
          name={["user", "organization"]}
          label="organization"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="organization" />
        </Form.Item>
      )}
      {emailInp && (
        <Form.Item
          name={["user", "email"]}
          label="email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="email" />
        </Form.Item>
      )}
      {roleInp && (
        <Form.Item
          name={["user", "name"]}
          label="Role"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Role" />
        </Form.Item>
      )}
      {phoneNumberInp && (
        <Form.Item
          name={["user", "name"]}
          label="Phone Number"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>
      )}
      {roleNameInp && (
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
      )}
      {descriptionInpt && (
        <Form.Item
          name={["user", "name"]}
          label="Description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Description" />
        </Form.Item>
      )}
      {permissionInp && (
        <Form.Item name={["user", "Permission"]} label="Permission">
          <Input.TextArea placeholder="Permission" />
        </Form.Item>
      )}
    </Form>
  );
};

export default UsersForm;
