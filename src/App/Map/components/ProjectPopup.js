import React from "react";
import { isoDateToHumanReadableDate, moneyFormat } from "../../../Util";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Spin } from "antd";

const ProjectPopupDetail = ({ project, loading }) => {
    const getCommitmentAmount = (data) => {
        const { amount, currency } = data
        const { iso } = currency;
        const money = moneyFormat(amount);
        return `${iso} ${money}`;
    }

    const commitmentAmount = project?.commitment_amount ? getCommitmentAmount(project?.commitment_amount) : 'N/A';
    const totalProjectCost = project?.total_project_cost ? getCommitmentAmount(project.total_project_cost) : 'N/A';
    return (
        <Spin spinning={loading}>
            <section className="mapPopup">
                <div className="popupHeader"><h2>{project?.name}</h2></div>
                <div className="projectDetail">
                    <span >
                        <h4>World Bank Project ID</h4>
                        <p>{project ? project?.wb_project_id : 'N/A'}</p>
                    </span>
                    <div className="timeFrame">
                        <span>
                            <h4>Start Date</h4>
                            <p>{project ? isoDateToHumanReadableDate(project?.approval_date) : 'N/A'}</p>
                        </span>
                        <span>
                            <h4>Last updated</h4>
                            <p>{project ? isoDateToHumanReadableDate(project?.closing_date) : 'N/A'}</p>
                        </span>
                    </div>
                    <span>
                        <h4>Implementing Agency</h4>
                        <p>{project?.implementing_agency ? project?.implementing_agency?.name : 'N/A'}</p>
                    </span>
                    <span>
                        <h4>Project Total Cost</h4>
                        <p>{totalProjectCost}</p>
                    </span>
                    <span>
                        <h4>Commitment Amount</h4>
                        <p>{commitmentAmount}</p>
                    </span>
                </div>
                <span style={{ margin: 15, textDecoration:"underline" }}>
                    <Link to={{
                        pathname: `/app/projects/${project?.id}`,
                    }}>More details</Link> </span>
            </section>
        </Spin>
    )
}

export default ProjectPopupDetail;

ProjectPopupDetail.propTypes = {
    project: PropTypes.object,
    loading: PropTypes.bool.isRequired
}
