import { Col, Row,  } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

/**
 * @function
 * @name ListHeaderData
 * @description List header component
 *
 * @param {object} props props object
 * @param {object[]} props.headerLayout list of header items configs
 * @param {Function} props.onSelectAll callback to handle select all checkbox
 * @param {Function} props.onDeselectAll callback to handle deselect all checkbox
 * @param {boolean} props.isBulkSelected flag to show if current page results are
 * selected
 * @returns {object} react element
 *
 * @version 0.1.0
 * @since 0.1.0
 */

const ListHeaderData = ({
  headerLayout,
 headerTitle
}) => (
  <Row className="ListHeader">
    {/* <div><h4 className="title" >{headerTitle}</h4></div> */}
    {headerLayout.map((item) => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Col key={item.header} {...item} title={item.title}>
        <h4 className="title">{item.header}</h4>
      </Col>
    ))}
  </Row>
);

/* props validation */
ListHeaderData.propTypes = {
  headerLayout: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
    })
  ).isRequired,
  headerTitle:PropTypes.string
};

ListHeaderData.defaultProps = {
  isBulkSelected: false,
};

export default ListHeaderData;
