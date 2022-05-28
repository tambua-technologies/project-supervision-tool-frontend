import { Col, Row, } from "antd";
import PropTypes from 'prop-types';
import React from "react";
import ProjectPoints from "../../../../../Map/components/ProjectPoints";
import * as turf from '@turf/turf';
import BaseMap from "../../../../../Map/components/BaseMap";
import GeneralProgress from "../../../../../components/GeneralProgress";

const totalCostSpan = { xxl: 6, xl: 6, lg: 6, md: 6, sm: 12, xs: 12 };
const projectIdSpan = { xxl: 6, xl: 6, lg: 6, md: 6, sm: 12, xs: 12 };
const commitmentSpan = { xxl: 6, xl: 6, lg: 6, md: 6, sm: 12, xs: 12 };
const projectSpan = { xxl: 6, xl: 6, lg: 6, md: 6, sm: 12, xs: 12 };
const projectLeadSpan = { xxl: 6, xl: 6, lg: 6, md: 6, sm: 12, xs: 12 };
const statusSpan = { xxl: 6, xl: 6, lg: 6, md: 6, sm: 12, xs: 12 };
const projectCoordinatorSpan = { xxl: 6, xl: 6, lg: 6, md: 0, sm: 12, xs: 12 };
const implementingAgencySpan = { xxl: 6, xl: 6, lg: 6, md: 6, sm: 12, xs: 12 };
const projectsLocationSpan = { xxl: 6, xl: 6, lg: 6, md: 6, sm: 12, xs: 12 };
const lastUpdateSpan = { xxl: 6, xl: 6, lg: 6, md: 0, sm: 12, xs: 12 };

const firstSpan = { xxl: 12, xl: 12, lg: 12, md: 12, sm: 24, xs: 24 };
const secondSpan = { xxl: 11, xl: 11, lg: 11, md: 11, sm: 24, xs: 24 };

const OverviewDetails = ({
  project,
  commitmentAmount,
  totalProjectCost,
  approval_date,
  closing_date,

}) => {

  const commitment_amount = project?.commitment_amount?.amount;
  const total_project_cost =  project?.total_project_cost?.amount;
  const amount =  100 * ( total_project_cost - commitment_amount ) / total_project_cost;
  const disbursed_gap = Math.round(amount);
  const percent_completed = 100 - disbursed_gap;
 const completed = percent_completed < 100 ? percent_completed : 100;
  
  return (
    <>
      <div className="keyDetails grey-bgr">
        <h2 id="sider-title">Key Details</h2>
        <section className="container">
          <Row className="key-details">
            <Col {...projectIdSpan}>
              <h4>World Bank Project ID</h4>
              <p>{project ? project?.wb_project_id : 'N/A'}</p>
            </Col>
            <Col {...statusSpan}>
              <h4>Status</h4>
              <p>{project?.status?.name ? project?.status?.name : 'N/A'}</p>
            </Col>
            <Col {...totalCostSpan}>
              <h4>Project Total Cost</h4>
              <p>{totalProjectCost}</p>
            </Col>
            <Col {...commitmentSpan}>
              <h4>Commitment Amount</h4>
              <p>{commitmentAmount}</p>
            </Col>

            <Col {...projectLeadSpan}>
              <h4>WB Task Team Leader</h4>
              <p>{project?.leaders.length  > 0 ? project?.leaders.map(({ first_name, last_name }, index) => { return (index ? ", " : "") + first_name + " " + last_name }) : 'N/A'}</p>

            </Col>
           
            <Col {...projectCoordinatorSpan}>
              <h4>Funding organisation</h4>
              <p>{project?.funding_organisation ? project?.funding_organisation?.name : 'N/A'}</p>

            </Col>

            <Col {...implementingAgencySpan}>
              <h4>Implementing Agency</h4>
              <p>{project?.implementing_agency ? project?.implementing_agency?.name : 'N/A'}</p>
            </Col>
            <Col {...projectSpan}>
              <h4>Sub Projects</h4>
              <p>{project?.sub_projects_count ? project?.sub_projects_count : 'N/A'}</p>
            </Col>
            <Col {...projectsLocationSpan}>
              <h4>Project locations</h4>
              {project?.regions ? project?.regions.map(({ name }, index) => { return (index ? ", " : "") + name }) : 'N/A'}
            </Col>
            <Col {...projectCoordinatorSpan}>
              <h4>Approval year</h4>
              <p>{project?.approval_fy ? project?.approval_fy : 'N/A'}</p>
            </Col>
            <Col {...lastUpdateSpan} >
              <h4>Last updated</h4>
              <p>{project?.approval_date ? new Date(project?.approval_date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p>
            </Col>
          </Row>
        </section>
      </div>
      <Row className="Progress-overview container" >
        <Col {...firstSpan} className="sector_chat">
          <GeneralProgress
            commitmentAmount={commitmentAmount}
            totalProjectCost={totalProjectCost}
            completed={completed}
            remained={disbursed_gap}
            bgcolor={"#0f6788"}
            approval_date={approval_date}
            closing_date={closing_date}
            progress_initial_title="Approval Date"
            progress_final_title="Closing Date"
            progress_title="Elapsed Time"
            item={project}
          />
        </Col>
        <Col {...secondSpan} offset={1} >
            <h5>Project Location </h5>  
          <div className="project-map">
            {
              project?.regions.length > 0 ? project?.regions?.map((region, i)  => {
                const polygon = JSON.parse(region.geom);
                const { geometry } = turf.pointOnFeature(polygon);
                return (
                  <BaseMap zoomControl={true} position={[geometry.coordinates[1], geometry.coordinates[0]]} key={i}>
                    {project ? <ProjectPoints projects={[project]} loading={false} /> : ''}
                  </BaseMap>
                )
              }) : 'No Locatios on map'

            }
          </div>


        </Col>
      </Row>
    </>
  )
}

OverviewDetails.propTypes = {
  project: PropTypes.object
}


export default OverviewDetails;
