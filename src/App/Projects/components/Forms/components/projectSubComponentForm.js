
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Form, Input, Button,
} from 'antd';
import { projectActions, projectSelectors } from "../../../../../redux/modules/projects";
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
 * @name ProjectComponentForm
 * @description renders form for creating project
 */
function ProjectComponentForm({
    selected,
    createProjectSubComponent,
    loading
}) {

    const onFinish = (values) => {
        const payload = {
            ...values,
            project_id: selected?.id
        };
        createProjectSubComponent(payload);

    };

    return (
        <>
            <Form
                labelCol={labelCol}
                wrapperCol={wrapperCol}
                name="basicForm"
                onFinish={onFinish}
                autoComplete="off"
                className="ProjectComponentForm"
            >

                {/* start:component  */}
                {/* <Form.Item
                    label="Component"
                    name="project_component_id"
                    title="Component i.e Institutional Strengthening"
                    rules={[
                        {
                            required: true,
                            message: "Please select component",
                        },
                    ]}
                >
                    <Select showSearch optionFilterProp="children">
                        {selected?.components.map((component) => (
                            <Select.Option key={component.id} value={component.id}>{component.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item> */}
                {/* end:Component */}

                {/* start:project name */}
                <Form.Item
                    label="SubComponent Name"
                    name="name"
                    title="Project component name e.g priorty road"
                    rules={[
                        {
                            required: true,
                            message: "Project component name is required",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                {/* end:project name */}

                {/* start:Description */}
                <Form.Item
                    label="SubComponent Description"
                    name="description"
                    title="Project component Description e.g water recyle project"
                    rules={[
                        {
                            required: true,
                            message: "Project description is required",
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                {/* end:Description */}

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
        </>
    );
}


const mapStateToProps = state => ({
    loading: projectSelectors.getProjectSubComponentLoading(state)
});


const mapDispatchToProps = {
    createProjectSubComponent: projectActions.createProjectSubComponentStart,

};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectComponentForm);

ProjectComponentForm.propTypes = {
    createProject: PropTypes.func.isRequired,
    selected: PropTypes.object.isRequired,
}

ProjectComponentForm.defaultProps = {
    selected: {},
}

