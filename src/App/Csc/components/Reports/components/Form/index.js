
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, InputNumber, Row, Select,DatePicker } from "antd";



/* ui */
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


const { RangePicker } = DatePicker;

function ProgressReportForm({ procuringEntity, createReport }) {

    const onFinish = (values) => {
        const {report_number, report_title, summary, start_end_date} = values;

        const payload = {
            report_number,
            report_title,
            summary,
            start: start_end_date[0].format('YYYY-MM-DD'),
            end: start_end_date[1].format('YYYY-MM-DD'),
            procuring_entity_id: procuringEntity.id
        };

        createReport(payload);
    };

    return (
        <Form
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            onFinish={onFinish}
            autoComplete="off"
        >
            <h4>Please Fill the form correctly</h4>

             {/* start: report number*/}
             <Form.Item
                label="Report Number"
                name="report_number"
                rules={[
                    {
                        required: true,
                        message: "Report Number is required",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            {/* end: report number */}


            {/* start: report title*/}
            <Form.Item
                label="Report Title"
                name="report_title"
                rules={[
                    {
                        required: true,
                        message: "Report Title is required",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            {/* end: report title */}

            {/* start: executive summary */}
            <Form.Item
                label="Executive Summary"
                name="summary"
                rules={[
                    {
                        required: true,
                        message: " Executive Summary is required",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            {/* end: executivve summary */}

             {/* start: start date & end date */}
             <Form.Item
                label="Report Start & End Date"
                name="start_end_date"
                rules={[
                    {
                        required: true,
                        message: " Report Start & End date is required",
                    },
                ]}
            >
                <RangePicker />
            </Form.Item>
            {/* end: start date & end date */}
            

        

            {/* start:form actions */}
            <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "right" }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ margin: 8 }}
                >
                    Save
                </Button>
            </Form.Item>
            {/* end:form actions */}
        </Form>
    );
}

export default ProgressReportForm;
