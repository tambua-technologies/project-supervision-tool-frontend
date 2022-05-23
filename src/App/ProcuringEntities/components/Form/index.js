
import React, { useEffect, useState } from 'react';
import API from '../../../../API';
import PropTypes from 'prop-types';
import {
    Form, Button, Select, Input
} from 'antd';
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
 * @name ProcuringEntityForm
 * @description renders form for creating project
 */
function ProcuringEntityForm({
    handleAfterSubmit,
    createProcuringEntity,
    isEditForm,
    selected,
    loading,
    updateProcuringEntity,
    project
}) {

    // const [projects, setProjects] = useState([]);
    const [agencies, setAgencies] = useState([]);
    // const [components, setComponents] = useState([]);
    // const [subComponents, setSubComponents] = useState([]);

    useEffect(() => {
        API.getAllAgencies()
            .then(res => setAgencies(res.data.data));
    }, [])


    const onFinish = (values) => {
        const {id} = project
        const payload = {
            ...values,
            project_id : id
        };
        if (isEditForm) {
            updateProcuringEntity(payload, selected.id);
        }
        else {
            createProcuringEntity(payload);
        }
        handleAfterSubmit();
    }

    return (
        <>
            <Form.Provider onFormFinish={(name, { values, forms }) => { }}>
                <Form
                    labelCol={labelCol}
                    wrapperCol={wrapperCol}
                    name="basicForm"
                    onFinish={onFinish}
                    autoComplete="off"
                    className="ProcuringEntityForm"
                >

                    {/* start: Agency */}
                    <Form.Item
                        label="Agency"
                        name="agency_id"
                        rules={[
                            {
                                required: true,
                                message: "Agency is required",
                            },
                        ]}
                        title="agency e.g ilala"
                        initialValue={
                            selected?.agency?.id ? selected?.agency?.id : ''
                        }
                    >
                        <Select
                            showSearch
                            optionFilterProp="children"

                        >
                            {
                                agencies?.map((agency) => (
                                    <Select.Option value={agency.id} key={agency.id}>{agency.name}</Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                    {/* end: Agency */}

                    {/* start: Project */}
                    <Form.Item
                        label="Project"
                        title="Project e.g DMDP"
                        rules={[
                            {
                                required: true,
                                message: "Project is required",
                            },
                        ]}
                        initialValue={
                            project ? project?.name : ''
                        }
                    >
                        <Input defaultValue={project?.name} />
                    </Form.Item>
                    {/* end of Project */}


                    {/* start:form actions */}
                    <Form.Item wrapperCol={{ span: 24 }} className='formAction'>
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

ProcuringEntityForm.propTypes = {
    createProcuringEntity: PropTypes.func.isRequired,
    getAgenciesActors: PropTypes.func.isRequired,
    getProjectSubComponent: PropTypes.func.isRequired,
    updateProcuringEntity: PropTypes.func.isRequired,
    handleAfterSubmit: PropTypes.func.isRequired,
    getProjects: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    isEditForm: PropTypes.bool,
    selected: PropTypes.object,
    projectSubComponents: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
    agencies: PropTypes.array.isRequired,
}

ProcuringEntityForm.defaultProps = {
    selected: {},
    projectSubComponents: [],
    projects: [],
    agencies: [],
    getProjects:()=> {}
}

export default ProcuringEntityForm;



