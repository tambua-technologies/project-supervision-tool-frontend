
import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import './styles.css';

const Logo = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Row>
            <Col span={6}>
                <div className="logo-menu" onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? <MenuUnfoldOutlined className='logo-menu__icon' /> : <MenuFoldOutlined className='logo-menu__icon' />}
                </div>
            </Col>
            <Col offset={1} span={17}>
                <div className="logo__title">ReProST</div>
            </Col>
        </Row>
    );
}

export default Logo;