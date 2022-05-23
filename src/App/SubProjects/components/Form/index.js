
import React, { useEffect, useState } from "react";
import Proptypes from 'prop-types';
import { connect } from "react-redux";
import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { projectActions } from "../../../../redux/modules/projects";
import { subProjectsActions } from "../../../../redux/modules/subProjects";
import PropTypes from "prop-types";
import API from "../../../../API";


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



function SubProjectForm({ createSubProject, selected, procuringEntityPackage, closeSubProjectForm, }) {

      /* eslint-disable no-unused-vars */
    const [status, setStatus] = useState([]);
    const [units, setUnits] = useState([]);
    const [types, setTypes] = useState([]);
    const [features, setFeatures] = useState([]);
    const [srid, setSrid] = useState('');
    const [regions, setRegions] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        API.getSubProjectStatus()
            .then(res => setStatus(res.data));
        API.getSubProjectTypes()
            .then(res => setTypes(res.data));
        API.getUnit().then(res => setUnits(res.data));
        API.getRegions()
            .then(res => setRegions(res.data));
    }, []);




    const onFinish = (values) => {
        const data = features.find(({ properties }) => properties.fid === values.sub_project_geo_data_id);
        const geo_json = { ...data, srid };
        const { id: procuring_entity_package_id, procuring_entity } = procuringEntityPackage
        const { project, id: procuring_entity_id, } = procuring_entity;
        const { id: project_id } = project
        const subProjectValue = {
            ...values,
            geo_json, code: values.name,
            procuring_entity_package_id,
            procuring_entity_id,
            project_id,
            quantity: {
                amount: values.quantity,
                unit: values.unit
            }
        }
        createSubProject(subProjectValue);
        closeSubProjectForm();
    };

    const handleOnRegionChange = (value) => {
        API.getDistricts(value)
            .then(res => setDistricts(res.data));
    };


    return (
        <Form
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            name="basicForm"
            onFinish={onFinish}
            autoComplete="off"
            className="ProjectForm"
            initialValues={{
                name: selected?.name,
                project_id: selected?.project_id,
                description: selected?.description,
                code: selected?.code
            }}

        >
            <h4>Please Fill the form correctly</h4>


            {/* start:sub project name */}
            <Form.Item
                label="Sub project Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Sub Project name is required",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            {/* end:sub project name */}

            {/* start:Description */}
            <Form.Item
                label="Description"
                name="description"
                rules={[
                    {
                        required: false,
                        message: "SubProject description is required",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            {/* end:Description */}

            <Form.Item
                label="Subproject Type"
                name="sub_project_type_id"
                rules={[
                    {
                        required: true,
                        message: "Sub project type is required",
                    },
                ]}
            >
                <Select>
                    {types.map(({ id, name }) => (
                        <Select.Option value={id} key={id}>{name}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
            {/*end: type id */}

            <Form.Item
                label="Subproject Status"
                name="sub_project_status_id"
                rules={[
                    {
                        required: true,
                        message: "Sub project status is required",
                    },
                ]}
            >
                <Select>
                    {status.map(({ id, name }) => (
                        <Select.Option value={id} key={id}>{name}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
            {/*end: sub project status id */}

            {/*start: region id */}
            <Form.Item
                label="Region"
                name="region_id"
                rules={[
                    {
                        required: true,
                        message: "Region is required",
                    },
                ]}
            >
                <Select onChange={handleOnRegionChange}>
                    {regions.map(({ id, name }) => (
                        <Select.Option value={id}>{name}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
            {/*end: region id */}


            {/*start: district id */}
            <Form.Item
                label="District"
                name="district_id"
                rules={[
                    {
                        required: true,
                        message: "District is required",
                    },
                ]}
            >
                <Select onChange={handleOnRegionChange}>
                    {districts.map(({ id, name }) => (
                        <Select.Option value={id}>{name}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
            {/*end: district id */}

            <Row>
                <Col lg={10}>
                    {/*start: quantity id */}
                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <InputNumber style={{ width: 180 }} />

                    </Form.Item>
                    {/*end: quantity id */}
                </Col>
                <Col lg={10} >
                    {/*start: unit id */}
                    <Form.Item
                        label="Unit"
                        name="unit"
                        rules={[
                            {
                                required: true,
                                message: "Sub project unit is required",
                            },
                        ]}
                    >
                        <Select>
                            {units.map(({ id, code }) => (
                                <Select.Option value={code} key={id}>{code}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {/*end: type id */}
                </Col>
            </Row>

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

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = {
    createSubProject: projectActions.createSubProjectStart,
    updateSubProject: subProjectsActions.updateSubProjectStart,

}

export default connect(mapStateToProps, mapDispatchToProps)(SubProjectForm);

SubProjectForm.propTypes = {
    procuringEntityPackage: Proptypes.object,
    closeSubProjectForm: Proptypes.func.isRequired,
    createSubProject: PropTypes.func.isRequired,
}

SubProjectForm.defaultProps = {
    procuringEntityPackage: null
}
