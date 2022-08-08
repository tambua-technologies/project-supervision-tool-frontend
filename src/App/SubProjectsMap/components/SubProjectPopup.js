import React from "react";
import PropTypes from "prop-types";
import { Spin, Row, Col } from "antd";

const SubProjectPopupDetail = ({ subProject, subProjectLoading, project }) => {
    const properties = subProject.geo_json.properties;
    console.log(properties);
    
    return (
        <Spin spinning={subProjectLoading}>
        <section className="mapPopup">
            <div className="popupHeader"><h2>{subProject?.name}</h2></div>
            <div className="projectDetail">
                {
                    Object.keys(properties)
                    .filter(k => !['fid', 'Id', 'X_Y_Cordin', 'Orign_Dest', 'Drain'].includes(k))
                    .map((key, index) => {
                        return (
                            <Row key={index}>
                                <Col span={8}><b style={{color: '#0f6788'}}>{key}</b></Col>
                                <Col span={16}>{properties[key]}</Col>
                            </Row>
                        );
                    }
                    )
                }
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
