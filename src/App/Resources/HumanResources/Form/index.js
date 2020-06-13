import React from "react";
import PropTypes from "prop-types";
import { Button, Input, Form, Row, Col, Select } from "antd";

/* state actions */

/* ui */
const { TextArea } = Input;
const labelCol = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 24 },
  lg: { span: 24 },
  xl: { span: 24 },
  xxl: { span: 24 },
};
const wrapperCol = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 24 },
  lg: { span: 24 },
  xl: { span: 24 },
  xxl: { span: 24 },
};

/* messages */
const MESSAGE_POST_SUCCESS = "humanResource was created successfully";
const MESSAGE_POST_ERROR =
  "Something occurred while saving humanResource, Please try again!";
const MESSAGE_PUT_SUCCESS = "humanResource was updated successfully";
const MESSAGE_PUT_ERROR =
  "Something occurred while updating humanResource, Please try again!";

/**
 * @function HumanResourceForm
 * @name HumanResourceForm
 * @description Form for create and edit humanResource of measure
 * @param {object} props Valid form properties
 * @param {object} props.humanResource Valid humanResource object
 * @param {boolean} props.isEditForm Flag whether form is on edit mode
 * @param {boolean} props.posting Flag whether form is posting data
 * @param {Function} props.onCancel Form cancel callback
 * @returns {object} HumanResourceForm component
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * <HumanResourceForm
 *   humanResource={humanResource}
 *   isEditForm={isEditForm}
 *   posting={posting}
 *   onCancel={this.handleClosehumanResourceForm}
 * />
 *
 */
const HumanResourceForm = ({
  humanResource,
  isEditForm,
  posting,
  items,
  agencies,
  locations,
  onCancel,
}) => {
  // form finish(submit) handler
  const onFinish = (values) => {
    if (isEditForm) {
      const updates = {...humanResource, ...values};
    }
  }

    return (
      <Form
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        onFinish={onFinish}
        initialValues={{ ...humanResource }}
        autoComplete="off"
      >
        {/* start:type */}
        <Form.Item
          label="Type"
          title="humanResource type e.g People"
          rules={[
            {
              required: true,
              message: "humanResource type is required",
            },
          ]}
        >
          <Select>
            {items.map(item => <Select.Option value={item.id}>{item.name}</Select.Option>)}
          </Select>
        </Form.Item>
        {/* end:type */}

        {/* start:implementing partner */}
        <Form.Item
          label="Implementing Partner"
          title="humanResource Implementing Partner e.g Tanzania Red cross society"
          rules={[
            {
              required: true,
              message: "humanResource Implementing Partner is required",
            },
          ]}
        >
          <Select>
            {agencies.map(agency => <Select.Option value={agency.id}>{agency.name}</Select.Option>)}
          </Select>
        </Form.Item>
        {/* end:implementing partner */}

        {/* start:number */}
        <Form.Item
          label="Number"
          title=" available humanResources in number  e.g 30"
          name={["strings", "name", "en"]}
          rules={[
            {
              required: true,
              message: "humanResource number  is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* end:number */}

        {/* start:location */}
        <Form.Item
          label="Location"
          title="humanResources location is required  e.g Dar Es Salaam"
          rules={[
            {
              required: true,
              message: "humanResource number  is required",
            },
          ]}
        >
          <Select>
            {locations.map(location => <Select.Option value={location.id}>{location.name}</Select.Option>)}
          </Select>
        </Form.Item>
        {/* end:location */}

        {/* start: start date & end date */}
        <Row justify="space-between">
          {/* start:start date */}
          <Col span={11}>
            <Form.Item
              label="Start Date"
              title="humanResource start date e.g 06-20-2020"
              rules={[
                {
                  required: true,
                  message: "humanResource start date is required",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          {/* end:start date */}

          {/* start:end date */}
          <Col span={11}>
            <Form.Item
              label="End Date"
              title="humanResource end date e.g 07-30-2020"
              name={["strings", "symbol"]}
              rules={[
              {
                required: true,
                message: "humanResource end date is required",
              },
            ]}
            >
              <Input />
            </Form.Item>
          </Col>
          {/* end:end date */}
        </Row>
        {/* end: start date & end date */}

        {/* start:form actions */}
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "right" }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            style={{ marginLeft: 8 }}
            type="primary"
            htmlType="submit"
            loading={posting}
          >
            Save
          </Button>
        </Form.Item>
        {/* end:form actions */}
      </Form>
    );
  };

  HumanResourceForm.defaultProps = {
    humanResource: {},
  };

  HumanResourceForm.propTypes = {
    humanResource: PropTypes.shape({
      _id: PropTypes.string,
      strings: PropTypes.shape({
        code: PropTypes.string.isRequired,
        name: PropTypes.shape({
          en: PropTypes.string.isRequired,
        }),
        description: PropTypes.shape({
          en: PropTypes.string.isRequired,
        }),
      }),
    }),
    isEditForm: PropTypes.bool.isRequired,
    posting: PropTypes.bool.isRequired,
    items: PropTypes.array,
    onCancel: PropTypes.func.isRequired,
  };

export default HumanResourceForm;
