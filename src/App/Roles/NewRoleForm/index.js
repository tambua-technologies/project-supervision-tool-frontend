import React, { useEffect, useState } from "react";
import API from "../../../API";
import { Button, Form, Input, Select } from "antd";
import './styles.css';
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

const NewRoleForm = ({ onFinish, onCancel }) => {
  const [permissions, setPermissions] = useState([]);


  const fetchFormData = () => {
    API.get('permissions')
      .then(res => {
        setPermissions(res);
      }
      ).catch(err => console.log(err));
  }

  useEffect(() => {
    fetchFormData();
  }, []);

  return (
    <Form
      className="role-form"
      data-testid="role-form"
      {...layout}
      name="role-form"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item
        name="permissions"
        label="Permissions"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select mode="multiple"
          placeholder="Permissions">
          {permissions.map(permission => (
            <Select.Option key={permission.id} value={permission.name}>
              {permission.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <div className="role-form-action-buttons">
        <Form.Item>
          <Button 
          type="primary" 
          htmlType="submit"
          data-testid="role-form-submit-button"
          >
            Submit
          </Button>
        </Form.Item>

        <Form.Item>
          <Button 
          onClick={onCancel}
          data-testid="cancel-role-form"
          >
            Cancel
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default NewRoleForm;
