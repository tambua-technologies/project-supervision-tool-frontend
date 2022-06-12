
import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const Logo = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Row justify='center' align='middle'>
            <Col offset={2} span={4}>
                <div className="logo-menu" onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? <MenuUnfoldOutlined className='logo-menu__icon' /> : <MenuFoldOutlined className='navigation-bar__menu-icon' />}
                </div>
            </Col>
            <Col span={16}>
                <div className="logo__title">ReProST</div>
            </Col>
        </Row>
    );
}

export default Logo;