
import React from "react";
import {Upload, Button, Form, Input} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import API from '../../../API';


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

class FileUpload extends React.Component {
    state = {
        fileList: [],
        uploading: false,
    };

    handleUpload = (values) => {
        const { fileList } = this.state;
        const { subProject } = this.props;
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('photo', file);
            formData.append('description', values.description);
        });

        this.setState({
            uploading: true,
        });

        API.uploadPhotos(subProject.id, formData)
           .then(res => {
               this.setState({
                   uploading: false,
               });
           })


    };

    render() {
        const { uploading, fileList } = this.state;
        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };

        return (
            <Form
                labelCol={labelCol}
                wrapperCol={wrapperCol}
                name="UploadPhotoForm"
                onFinish={this.handleUpload}
                autoComplete="off"
                className="UploadPhotoForm"
            >
                {/* start:Description */}
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Image description is required",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                {/* end:Description */}

                {/* start:photo */}
                <Form.Item
                    label="Photo"
                    name="photo"
                    title="Upload Photo"
                    rules={[
                        {
                            required: true,
                            message: "Photo is required",
                        },
                    ]}
                >
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Form.Item>
                {/* end:photo */}

                {/* start:form actions */}
                <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "right" }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={fileList.length === 0}
                        loading={uploading}
                        style={{ marginLeft: 8 }}
                    >
                        {uploading ? 'Uploading' : 'Start Upload'}
                    </Button>
                </Form.Item>
                {/* end:form actions */}
            </Form>
        );
    }
}

export default FileUpload;

