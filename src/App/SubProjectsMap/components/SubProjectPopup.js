import React from "react";
import { isoDateToHumanReadableDate } from "../../../Util";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Col, Row, Spin } from "antd";
import { PictureOutlined, FileOutlined } from "@ant-design/icons";

const SubProjectPopupDetail = ({ subProject, subProjectLoading, project }) => {
    
    return (
        <Spin spinning={subProjectLoading}>
        <section className="mapPopup">
            <div className="popupHeader"><h2>{subProject?.name}</h2></div>
            <div className="projectDetail">
                <Row className="timeFrame">
                    <Col span={12} >
                        <h4>Project</h4>
                        <p>{project ? project?.code : 'N/A'}</p>
                    </Col>
                    <Col span={12}  >
                        <h4>Issues</h4>
                        <p>2</p>
                    </Col>
                    <Col span={12} >
                        <h4>Start Date</h4>
                        <p>{subProject?.details ? isoDateToHumanReadableDate(subProject?.details?.approval_date) : 'N/A'}</p>
                    </Col>
                    <Col span={12} >
                        <h4>End Date</h4>
                        <p>{subProject?.details ? isoDateToHumanReadableDate(subProject?.details?.closing_date) : 'N/A'}</p>
                    </Col>
                    <Col span={12} >
                        <h4>Physical Progess </h4>
                        <p>30%</p>
                    </Col>
                    <Col span={12} >
                        <h4>Financial Progress</h4>
                        <p>59%</p>
                    </Col>
                </Row>
                <span>
                    <h4>Sub Project Item(s)</h4>
                    <p>{subProject?.type ? subProject?.type?.name : 'N/A'}</p>
                </span>
                <span>
                    <h4>Procuring Entities</h4>
                    <p>N/A</p>
                </span>
                <span>
                    <h4>Location</h4>
                    {subProject?.districts ? subProject?.districts.map(({ name }) => <p>{name}</p>) : ' N/A'}
                </span>
                <span>
                    <h4>Last updated</h4>
                    <p>{subProject?.details ? isoDateToHumanReadableDate(subProject?.details?.closing_date) : 'N/A'}</p>
                </span>
            </div>
            <span style={{ margin: 15, textDecoration: "underline" }}>
                <Link to={{
                    pathname: `/app/sub_projects/${project?.id}`,
                }}>More details</Link> </span>
            <div style={{ borderTop: '0.8px solid grey', padding: '10px 10px 0 10px', marginTop: '10px' }}>
                <Row>
                    <Col span={12} style={{ display: 'flex', justifyContent: 'space-around', borderRight: '0.8px solid grey' }}>
                        <PictureOutlined style={{ fontSize: '200%' }} />
                        <h3>Add Image</h3>
                    </Col>
                    <Col span={12} style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <FileOutlined style={{ fontSize: '200%' }} />
                        <h3>Log Report</h3>
                    </Col>
                </Row>
            </div>
        </section>
        </Spin>
    )
}

export default SubProjectPopupDetail;

SubProjectPopupDetail.propTypes = {
    project: PropTypes.string.isRequired,
    subProjectLoading: PropTypes.bool.isRequired,
    subProject:PropTypes.string.isRequired,
}
