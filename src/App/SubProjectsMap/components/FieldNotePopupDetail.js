import React from "react";
import { isoDateToHumanReadableDate, moneyFormat } from "../../../Util";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Col, Row, Spin } from "antd";
import { PictureOutlined, FileOutlined } from "@ant-design/icons";

const FieldNotePopupDetail = ({ project }) => {
    const getCommitmentAmount = (data) => {
        const { amount, currency } = data
        const { iso } = currency;
        const money = moneyFormat(amount);
        return `${iso} ${money}`;
    }

    return (
        // <Spin spinning={loading}>
        <section className="mapPopup">
            <div className="fieldNoteHeader"><h2>re-allocate contractors</h2></div>
            <div className="fieldNote">
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwy5ZB6_2vih7u79GZW07nZ2cGaXOCuwI9Jg&usqp=CAU"' width={270} />
                <div style={{ padding: '15px' }}>
                    <Row className="timeFrame">
                        <Col span={12} >
                            <h4>Uploaded by</h4>
                            <p>Beatrice Mkumbo</p>
                        </Col>
                        <Col span={12}  >
                            <h4>Contact Information</h4>
                            <p>068763636</p>
                        </Col>
                        <Col span={12} >
                            <h4>Last Update</h4>
                            <p>2021-03-12</p>
                        </Col>

                    </Row>

                </div>
            </div>
            <span style={{ margin: 15, textDecoration: "underline" }}>
                <Link to={{
                    pathname: `/app/sub_projects/`,
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
        // </Spin>
    )
}

export default FieldNotePopupDetail;

FieldNotePopupDetail.propTypes = {
    project: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired
}
