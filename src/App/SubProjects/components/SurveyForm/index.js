import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Select} from 'antd';
import API from '../../../../API'

/* ui */
const labelCol = {
    xs: {span: 24},
    sm: {span: 24},
    md: {span: 24},
    lg: {span: 24},
    xl: {span: 24},
    xxl: {span: 24},
};
const wrapperCol = {
    xs: {span: 24},
    sm: {span: 24},
    md: {span: 24},
    lg: {span: 24},
    xl: {span: 24},
    xxl: {span: 24},
};


/**
 * @function
 * @name BasicSubProjectDetailsForm
 * @description renders form for creating sub project
 */
function SurveyForm(
    {
        onCancel,
        selected
    }
) {

    const [showMessage, setShowMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        API.getAssets()
            .then(res => {
                const tmp = res.results.filter(({asset_type}) => asset_type === 'template');
                setTemplates(tmp);
            })
    }, []);

    const onFinish = (values) => {
        const payload = {
            "clone_from": values.survey_template,
            "name": values.name,
            "asset_type": 'survey'
        };
        setLoading(true)
        API.createAsset(payload)
            .then(asset => API.createSubProjectSurvey({
                survey_id: asset.uid,
                category_name: values.survey_category,
                sub_project_id: selected.id,
            })
                .then(() => API.createAssetDeployment(asset.uid)
                    .then(() => API.activateDeployedAsset(asset.uid)
                        .then(() =>
                            API.assignViewSubmissionsPermissions(asset.uid)
                                .then(() => {
                                    setShowMessage(true);
                                    setLoading(false);
                                })
                        )
                    )));
    };


    return showMessage ? (
        <div>
            <h3>Your Survey has been created successfully!</h3>
            <p>Your survey has been created and linked with the SubProject.</p>
        </div>
    ) : (
        <Form
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            name="surveyForm"
            onFinish={onFinish}
            autoComplete="off"
        >
            <h4>Please Fill the form correctly</h4>

            {/* start: Survey Template */}
            <Form.Item
                label="Select Survey Template"
                name="survey_template"
                rules={[
                    {
                        required: true,
                        message: "Survey Template is  required",
                    },
                ]}
            >
                <Select>
                    {templates.map(t => <Select.Option value={t.uid}>{t.name}</Select.Option>)}
                </Select>
            </Form.Item>
            {/* end: Survey Template */}

            {/* start: Survey Category */}
            <Form.Item
                label="Survey Category"
                name="survey_category"
                rules={[
                    {
                        required: true,
                        message: "Survey Category is  required",
                    },
                ]}
            >
                <Select>
                    <Select.Option value='field_notes'>Field Notes</Select.Option>
                    <Select.Option value='field_images'>Field Images</Select.Option>
                </Select>
            </Form.Item>
            {/* end: Survey Category */}

            {/* start: name */}
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Survey name is  required",
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            {/* end: name */}

            {/* start:form actions */}
            <Form.Item wrapperCol={{span: 24}} style={{textAlign: "right"}}>
                <Button
                    type="primary"
                    style={{marginRight: 8}}
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    style={{marginLeft: 8}}
                >
                    Save
                </Button>
            </Form.Item>
            {/* end:form actions */}
        </Form>
    );
}


export default SurveyForm;

SurveyForm.propTypes = {}

SurveyForm.defaultProps = {}
