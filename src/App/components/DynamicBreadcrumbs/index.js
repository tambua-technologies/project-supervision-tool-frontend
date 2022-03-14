
import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @function
 * @name DynamicBreadcrumbs
 * @description render dyanmic breadcrumbs
 * @param {object} props
 * @param {object} props.breadcrumbs breadcrumbs data
 * 
 * @version 0.1.0
 * @since 0.1.0
 */
function DynamicBreadcrumbs({ breadcrumbs }) {

  return (
    <Breadcrumb className="Breadcrumb" separator=">">
      {breadcrumbs.map((item, index) => {
        return (
          <Breadcrumb.Item key={index}>
            <Link to={item.url} title={item.name}>
              {item.title}
            </Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );

}
DynamicBreadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired)
};

export default DynamicBreadcrumbs;