import React from 'react';
import PropTypes from 'prop-types';

import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    MoreOutlined,
    ShareAltOutlined,
    UserSwitchOutlined,
    BookOutlined,
    FileAddOutlined,
    FileProtectOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';

import { Dropdown, Button, Menu } from 'antd';

// TODO refactor this to receive menu items rather than objects
/**
 * @function
 * @name ListItemActions
 * @description Render Dropdown component with has actions for list items
 * @param {object} props props object
 * @param {object} props.edit on edit action callback
 * @param {object} props.share on share action callback
 * @param {object} props.onMapPreview on map preview action
 * @param {object} props.view on view action
 * @param {object} props.reload on reload action
 * @param {object} props.archive on archive action callback
 * @param {object} props.components on add components
 * @returns {object} react element
 * @version 0.1.0
 * @since 0.1.0
 */
const ListItemActions = ({
    onMapPreview,
    view,
    edit,
    share,
    createSurvey,
    archive,
    assignPermissions,
    component,
    subComponent,
    fillSurvey,
    downloadReport,
    openIssues
}) => (
    <Dropdown
        overlay={
            <Menu>
                {view && (
                    <Menu.Item key="view" onClick={view.onClick} title={view.title}>
                        <EyeOutlined /> {view.name}
                    </Menu.Item>
                )}
                {downloadReport && (<Menu.Item key="downloadReport" title={downloadReport.title}>
                <a href={downloadReport.url} download> <FileProtectOutlined /> {downloadReport.name}</a>
                </Menu.Item>)}
                {fillSurvey && (
                    <Menu.Item key="fillSurvey" onClick={fillSurvey.onClick} title={fillSurvey.title}>
                        <BookOutlined /> {fillSurvey.name}
                    </Menu.Item>
                )}

                {component && (
                    <Menu.Item
                        key="components"
                        onClick={component.onClick}
                        title={component.title}
                    >
                        <FileAddOutlined />{component.name}
                    </Menu.Item>
                )}

                {subComponent && (
                    <Menu.Item
                        key="subComponents"
                        onClick={subComponent.onClick}
                        title={subComponent.title}
                    >
                        <FileAddOutlined />{subComponent.name}
                    </Menu.Item>
                )}
                {openIssues && (
                    <Menu.Item
                        key="openIssues"
                        onClick={openIssues.onClick}
                        title={openIssues.title}
                    >
                        <ExclamationCircleOutlined />{openIssues.name}
                    </Menu.Item>
                )}

                {edit && (
                    <Menu.Item key="edit" onClick={edit.onClick} title={edit.title}>
                        <EditOutlined /> {edit.name}
                    </Menu.Item>
                )}

                {onMapPreview && (
                    <Menu.Item
                        key="onMapPreview"
                        onClick={onMapPreview.onClick}
                        title={onMapPreview.title}
                    >
                        <EyeOutlined />{onMapPreview.name}
                    </Menu.Item>
                )}

                {createSurvey && (
                    <Menu.Item key="createSurvey" onClick={createSurvey.onClick} title={createSurvey.title}>
                        <FileProtectOutlined /> {createSurvey.name}
                    </Menu.Item>
                )}

                {assignPermissions && (
                    <Menu.Item
                        key="share"
                        onClick={assignPermissions.onClick}
                        title={assignPermissions.title}
                    >
                        <UserSwitchOutlined /> {assignPermissions.name}
                    </Menu.Item>
                )}


                {share && (
                    <Menu.Item key="share" onClick={share.onClick} title={share.title}>
                        <ShareAltOutlined /> {share.name}
                    </Menu.Item>
                )}

                {archive && (
                    <Menu.Item
                        key="archive"
                        onClick={archive.onClick}
                        title={archive.title}
                    >
                        <DeleteOutlined /> {archive.name}
                    </Menu.Item>
                )}


            </Menu>
        }
        trigger={['click']}
    >
        <Button
            shape="circle"
            size="large"
            icon={<MoreOutlined />}
            className="actionButton"
            title="More actions"
        />
    </Dropdown>
);

/* props validation */
const actionShape = {
    name: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
};
ListItemActions.propTypes = {
    view: PropTypes.shape(actionShape),
    onMapPreview: PropTypes.shape(actionShape),
    edit: PropTypes.shape(actionShape),
    reload: PropTypes.shape(actionShape),
    share: PropTypes.shape(actionShape),
    archive: PropTypes.shape(actionShape),
    components: PropTypes.shape(actionShape),
    fillSurvey: PropTypes.shape(actionShape),
};

ListItemActions.defaultProps = {
    view: null,
    onMapPreview: null,
    edit: null,
    reload: null,
    share: null,
    archive: null,
    fillSurvey: null,
    components: null,
};

export default ListItemActions;
