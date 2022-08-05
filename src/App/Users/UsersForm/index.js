import React, { useEffect, useState } from "react";
import "./style.css";
import API from "../../../API";
import { Button, Form, Input, Select } from "antd";
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

const UsersForm = ({ onFinish, onCancel }) => {
  const [roles, setRoles] = useState([]);


  const fetchFormData = () => {
    API.get('roles')
      .then(roles => {
        setRoles(roles.data);
      }
      ).catch(err => console.log(err));
  }

  useEffect(() => {
    fetchFormData();
  }, []);

  return (
    <Form
      className="user-form"
      data-testid="user-form"
      {...layout}
      name="user-form"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name="first_name"
        label="First Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="First Name" />
      </Form.Item>

      <Form.Item
        name="last_name"
        label="Last Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="email" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
      >
        <Input placeholder="Phone Number" />
      </Form.Item>

      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Title" />
      </Form.Item>

      <Form.Item
        name="roles"
        label="Role"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select mode="multiple"
          placeholder="Role">
          {roles.map(role => (
            <Select.Option key={role.id} value={role.name}>
              {role.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input users Password!" },
        ]}
      >
        <Input.Password
          placeholder="Password"
        />
      </Form.Item>

      <div className="user-form-action-buttons">
        <Form.Item>
          <Button 
          type="primary" 
          htmlType="submit"
          data-testid="user-form-submit-button"
          >
            Submit
          </Button>
        </Form.Item>

        <Form.Item>
          <Button 
          onClick={onCancel}
          data-testid="cancel-user-form"
          >
            Cancel
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default UsersForm;
