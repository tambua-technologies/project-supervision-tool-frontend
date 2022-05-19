import React from "react";
import PropTypes from "prop-types";
import { Col, Layout, Row } from "antd";
import UserMenu from "../navigation/UserMenu";
import "./styles.css";

/* constants */
const { Header, Content } = Layout;

/**
 * @function
 * @name BaseLayout
 * @description Render base layout for the app
 * @param {object} props Properties inject by router
 * @param {object} props.location Location object from react router
 * @param {object} props.match Match prop from react router
 * @returns {object} BaseLayout component
 * @version 0.1.0
 * @since 0.1.0
 */
const BaseLayout = (props) => {
  return (
    <Layout className="BaseLayout">
      <Header className="BaseLayoutHeader">
        <Row type="flex" align="middle">
          {/* breadcrumb section start */}
          <Col xxl={22} xl={22} lg={22} md={22} sm={20} xs={20} justify="start">
            <Row type="flex" justify="start">
              {props.breadcrumbs}
            </Row>
          </Col>
          {/* breadcrumb section end */}

          <Col xxl={2} xl={2} lg={2} md={2} sm={4} xs={4}>
            <Row type="flex" justify="end">
              <Col span={12}>
                <UserMenu />
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>
      <Content className="BaseLayoutContent">{props.children}</Content>
    </Layout>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
  breadcrumbs: PropTypes.node.isRequired,
};

export default BaseLayout;
