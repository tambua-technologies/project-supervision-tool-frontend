import React from 'react';
import { Row, Input, Col } from 'antd';
import UserMenu from "../../Auth/components/UserMenu";

import './styles.css';

const NavigationBar = () => {
    
    return (
        <Row className="navigation-bar">
            <Col span={14}>
                <Input
                    placeholder="Search here"
                    allowClear
                    className="navigation-bar__search-input"
                    size="large"
                />

            </Col>
            <Col offset={8} span={2}>
                <UserMenu />
            </Col>
        </Row>
    );
}

export default NavigationBar;