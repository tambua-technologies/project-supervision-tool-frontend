import {Button, Col, Row} from "antd";
import PropTypes from "prop-types";
import React from "react";
import "./styles.css";

/**
 * @function
 * @name Toolbar
 * @description Render action bar for actions which are applicable to list
 * content
 *
 * @param {object} props props object
 * @param {string} props.itemName names for items/ modules used by toolbar
 * @param {number} props.page current page
 * @param {number} props.total total number of results from the API
 * @param {number} props.selectedItemsCount total Number of selected items
 * @param {string} props.exportUrl export url
 * @param {Function} props.onArchive on archive action callback
 * @param {Function} props.onFilter on filter action callback
 * @param {Function} props.onNotify on notify action callback
 * @param {Function} props.onPaginate on paginate action callback
 * @param {Function} props.onRefresh on refresh action callback
 * @param {Function} props.onShare on share action callback
 *
 * @returns {object} React component
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const Toolbar = ({
                     actions,
                     exportUrl,
                     onFilter,
                     filterFrom,
                     onRefresh,
                     showOnMap,
                     filterData,
                     download,
                     filterTo
                 }) => (
    <div className="Toolbar">
        <Row>
            {/* action bar */}
            <Col xxl={19} xl={19} lg={19} md={19} sm={12} xs={12}>
                <Row>
                    {/* refresh  action */}
                    {onRefresh && (
                        <Col xxl={2} xl={3} lg={6} md={6} sm={12} xs={12}>
                            <Button
                                title="Refresh "
                                className="actionButton"
                                size="large"
                                onClick={onRefresh}
                            >
                                Refresh
                            </Button>
                        </Col>
                    )}
                    {/* end refresh  action */}

                    {/* export action */}
                    {exportUrl && (
                        <Col xxl={3} xl={3} lg={3} md={4} sm={12} xs={12}>
                            <a href={exportUrl} download>
                                <Button
                                    title="Export Data"
                                    className="actionButton"
                                    size="large"
                                    onClick={onRefresh}
                                >
                                    Export
                                </Button>
                            </a>
                        </Col>
                    )}
                    {/* end export action */}

                    {/* download action */}
                    {download && (
                        <Col xxl={3} xl={3} lg={3} md={4} sm={12} xs={12}>
                                <Button
                                    title="Download Data"
                                    className="actionButton"
                                    size="large"
                                    onClick={download}
                                >
                                    Download
                                </Button>
                        </Col>
                    )}
                    {/* end download action */}

                  {/* showOnMap  action */}
                  {showOnMap && (
                      <Col xxl={2} xl={3} lg={6} md={6} sm={12} xs={12}>
                        <Button
                            title="View on Map "
                            className="actionButton"
                            size="large"
                            onClick={showOnMap}
                        >
                          View on Map
                        </Button>
                      </Col>
                  )}
                  {/* end showOnMap  action */}

                    {/* filter action */}
                    {onFilter && (
                        <Col xxl={16} xl={16} lg={16} md={16} sm={0} xs={0}>
                            <div className="ToolbarFilter">
                                <p>{filterFrom}</p>
                                <Button
                                    title="Filter"
                                    className="actionButton"
                                    size="large"
                                    onClick={onFilter}
                                >
                                    {filterData}
                                </Button>
                                <p>{filterTo}</p>
                                <Button
                                    title="Filter"
                                    className="actionButton"
                                    size="large"
                                    onClick={onFilter}
                                >
                                    Latest
                                </Button>
                            </div>
                        </Col>
                    )}
                    {/* end filter action */}

                </Row>
            </Col>
            {/* end action bar */}
            {/* filter bar */}
            <Col xxl={5} xl={5} lg={5} md={5} sm={12} xs={12}>
                <Row type="flex" justify="center">
                    {/* selected and  number summary */}
                    {actions.map((action) => {
                        const {label, ...props} = action;

                        return (
                            <Button {...props} type="primary"
                                    style={{background: "#0f6788", display: "flex", border: "#0f6788"}}>
                                {label}
                            </Button>
                        );
                    })}
                </Row>
            </Col>
            {/* end filter bar */}
        </Row>
    </div>
);

/* props validation */
Toolbar.propTypes = {
    itemName: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    exportUrl: PropTypes.string,
    selectedItemsCount: PropTypes.number.isRequired,
    onArchive: PropTypes.func,
    onFilter: PropTypes.func,
    onNotify: PropTypes.func,
    onPaginate: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onShare: PropTypes.func,
};

Toolbar.defaultProps = {
    exportUrl: undefined,
    onFilter: null,
    onShare: () => {
    },
    onNotify: null,
    onArchive: null,
};

export default Toolbar;
