import React from 'react';
import { Row, Input, Col } from 'antd';
import UserMenu from "../../Auth/components/UserMenu";

import './styles.css';

const NavigationBar = () => {
    
    return (
        <Row>
            <Col span={14}>
                <Input
                    placeholder="Search here"
                    allowClear
                    className="navigation-bar__search-input"
                    size="large"
                />

            </Col>
            <Col offset={9} span={1}>
                <UserMenu />
            </Col>
        </Row>
    );
}

export default NavigationBar;