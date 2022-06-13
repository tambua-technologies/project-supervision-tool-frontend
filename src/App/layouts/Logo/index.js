
import React from 'react';
import { Row, Col } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import './styles.css';

const Logo = (props) => {
    const { collapsed, setCollapsed } = props;
    return (
        <Row >
            <Col span={collapsed ? 24 : 6 } align='center'>
                <div className="logo-menu" onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? <MenuUnfoldOutlined className='logo-menu__icon' /> : <MenuFoldOutlined className='logo-menu__icon' />}
                </div>
            </Col>
            <Col offset={0} span={collapsed ? 0 : 17}>
                <div className="logo__title">DMDP</div>
            </Col>
        </Row>
    );
}

export default Logo;