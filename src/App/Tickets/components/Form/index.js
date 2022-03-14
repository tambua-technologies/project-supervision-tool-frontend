
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Form, Input, Button, Row, Col, Select
} from 'antd';
import { ticketActions, ticketSelectors } from '../../../../redux/modules/Tickets';

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

/**
 * @function
 * @name TicketForm
 * @description renders form for creating project
 */
function TicketForm({
    selected,
    createProjectTicket,
    agencies,
    loading,
    getAgencies,
    createSubProjectTicket,
    isSelected
}) {
    ;

    useEffect(() => {
        getAgencies();
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    const onFinish = (values) => {
        const payload = {
            address: values.address,
            description: values.description,
            agency_responsible_id: values.agency_responsible_id,
            project_id: selected?.id,
            location: {
                geometry: {
                    type: "string",
                    coordinates: [
                        values.lng, values.lat
                    ]
                }
            },
        };
        if (isSelected) {
            const subProjectPayload = {
                ...payload,
                sub_project_id: selected?.id,
                project_id: selected?.project_id,

            }
            createSubProjectTicket(subProjectPayload)
        }
        else {
            createProjectTicket(payload);
        }
    };

    return (
        <>
            <Form.Provider onFormFinish={(name, { values, forms }) => { }}>
                <Form
                    labelCol={labelCol}
                    wrapperCol={wrapperCol}
                    name="basicForm"
                    onFinish={onFinish}
                    autoComplete="off"
                    className="TicketForm"
                >
                    {/* start:Description */}
                    <Form.Item
                        label="Description"
                        name="description"
                        title="Project component Description e.g water recyle project"
                        rules={[
                            {
                                required: true,
                                message: "Project description is required",
                            },
                        ]}
                    >
                        <Input.TextArea
                            autoSize={{ minRows: 2, maxRows: 6 }}
                        />
                    </Form.Item>
                    {/* end:Description */}

                    {/* start:agencies */}
                    <Form.Item
                        label="Address"
                        name="address"
                        title="Address e.g Mbezi mazulu"
                        rules={[
                            {
                                required: true,
                                message: "Address is required",
                            },
                        ]}
                    >
                        <Input.TextArea
                            autoSize={{ minRows: 2, maxRows: 6 }}
                        />
                    </Form.Item>
                    {/* end:agencies */}

                    <Row type="flex" justify="space-between">
                        <Col xxl={11} xl={11} lg={11} md={11} sm={24} xs={24}>
                            {/* start:Longtude  */}
                            <Form.Item
                                label="Longtude"
                                name="lng"
                                title="Longtude i.e The 38.909454345"
                            >
                                <Input />
                            </Form.Item>
                            {/* end:Longtude */}
                        </Col>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24} span={12}>
                            {/* start:Leaders */}

                            {/* start:Latitude */}
                            <Form.Item
                                label="Latitude"
                                name="lat"
                                title="Longtude e.g -6.620957270"
                            >
                                <Input />
                            </Form.Item>
                            {/* end:Latitude */}

                        </Col>
                    </Row>

                    {/* start:agencies */}
                    <Form.Item
                        label="Responsible Agency"
                        name="agency_responsible_id"
                        title="Responsible agency e.g PoRALG"
                        rules={[
                            {
                                required: true,
                                message: "Responsible agency is required",
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="children"

                        >
                            {agencies.map((agency) => (
                                <Select.Option key={agency.id} value={agency.id}>{agency.name}</Select.Option>
                            ))}
                        </Select>

                    </Form.Item>
                    {/* end:agencies */}


                    {/* start:agencies */}
                    <Form.Item
                        label="Assigned To"
                        name="assignee_id"
                        title="Issued assignee e.g Jacob John"

                    >
                        <Select
                            showSearch
                            optionFilterProp="children"

                        >
                            {agencies.map(({ focalPerson }) => (
                                <Select.Option key={focalPerson.id} value={focalPerson.id}>{focalPerson.first_name} {focalPerson.last_name}</Select.Option>
                            ))}
                        </Select>

                    </Form.Item>
                    {/* end:agencies */}

                    {/* start:form actions */}
                    <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "right", marginTop: "15px" }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginLeft: 8 }}
                            loading={loading}
                        >
                            Submit
                    </Button>
                    </Form.Item>
                    {/* end:form actions */}
                </Form>

            </Form.Provider>
        </>
    );
}


const mapStateToProps = state => ({
    agencies: ticketSelectors.fetchAgenciesSelector(state),
    loading: ticketSelectors.loading(state),

});


const mapDispatchToProps = {
    createProjectTicket: ticketActions.createProjectTicketStart,
    createSubProjectTicket: ticketActions.createProjectTicketStart,
    getAgencies: ticketActions.fetchAgenciesStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketForm);

TicketForm.propTypes = {
    createTicket: PropTypes.func.isRequired,
    selected: PropTypes.object.isRequired,
    getAgencies: PropTypes.func.isRequired,
    agencies: PropTypes.array.isRequired
}

TicketForm.defaultProps = {
    selected: {},
    agencies: []
}

