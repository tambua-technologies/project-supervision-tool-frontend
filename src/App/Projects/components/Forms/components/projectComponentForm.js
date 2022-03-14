
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
function ProjectSubComponentForm({
    selected,
    createProjectComponent,
    loading
}) {

    const onFinish = (values) => {
        const payload = {
            ...values,
            project_id: selected?.id
         };
        createProjectComponent(payload);

    };
 
    return (
        <>
            <Form.Provider   onFormFinish={(name, { values, forms }) => { }}>
                <Form
                    labelCol={labelCol}
                    wrapperCol={wrapperCol}
                    name="basicForm"
                    onFinish={onFinish}
                    autoComplete="off"
                    className="ProjectComponentForm"
                >
                    {/* start:project sub component name */}
                    <Form.Item
                        label="Name"
                        name="name"
                        title="Project name e.g priorty road"
                        rules={[
                            {
                                required: true,
                                message: "Project name is required",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {/* end:project name */}

                    {/* start:Description */}
                    <Form.Item
                        label="Description"
                        name="description"
                        title="Project sub component Description e.g water recyle project"
                        rules={[
                            {
                                required: true,
                                message: "Project sub component description is required",
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

            </Form.Provider>
        </>
    );
}


const mapStateToProps = state => ({
    loading: projectSelectors.getProjectComponentLoading(state)
});


const mapDispatchToProps = {
    createProjectComponent: projectActions.createProjectComponentStart,

};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSubComponentForm);

ProjectSubComponentForm.propTypes = {
    createProject: PropTypes.func.isRequired,  
    selected:  PropTypes.object.isRequired,
}

ProjectSubComponentForm.defaultProps = {
    selected: {},
}

