import React, { useEffect } from "react";
import {Layout, Spin} from 'antd';
import OverviewDetails from "./components/OverviewDetails";
import { connect } from "react-redux";
import { projectActions, projectSelectors } from "../../../../redux/modules/projects";
import { getIdFromUrlPath, isoDateToHumanReadableDate, moneyFormat } from "../../../../Util";
import DynamicBreadcrumbs from '../../../components/DynamicBreadcrumbs';
import ProjectHome from "../../../navigation/ProjectHome";
import BaseLayout from "../../../layouts/BaseLayout";
import DetailsSection from "../../components/Project/components/ComponentSubComponent";
import PropTypes from 'prop-types';
import "./styles.css";

const { Content } = Layout;

const ProjectDetails = ({ project, loading, getProject, match }) => {

  useEffect(() => {
    const id  = getIdFromUrlPath(match.path,2);
    getProject(id);

  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  const breadcrumbs = project ? [
    {
        title: 'Projects',
        url: '/projects',
        name: 'Projects'
    },
    {
        title: project.code,
        url: match.url,
        name: project.name
    }
] : [];



  const getCommitmentAmount = (data) => {
    const { amount, currency } = data
    const { iso } = currency;
    const money = moneyFormat(amount);
    return `${iso} ${money}`;
  }

  const commitmentAmount = project?.commitment_amount ? getCommitmentAmount(project?.commitment_amount) : 'N/A';
  const totalProjectCost = project?.total_project_cost ? getCommitmentAmount(project.total_project_cost) : 'N/A';
  const approval_date = project?.approval_date ? isoDateToHumanReadableDate(project?.approval_date) : 'N/A';
  const closing_date = project?.closing_date ? isoDateToHumanReadableDate(project?.closing_date) : 'N/A'

  return (
    <Layout className="project-layout">
      <Spin spinning={loading} tip="Loading..." >
        <Content >
          <h3 className="text-blue" >Overview</h3>
          <h3>{project?.name}</h3>
          <Layout className="project-inner-layout" >
            <Content className="project-contents">
              <div className="card-container">
                <div className="description" >
                  <h4 className="text-blue">Project Development Objective</h4>
                  <p>{project ? project?.description : 'N/A'}</p>
                </div>
                <OverviewDetails
                    project={project}
                    commitmentAmount={commitmentAmount}
                    totalProjectCost={totalProjectCost}
                    approval_date={approval_date}
                    closing_date={closing_date}
                />
                <section className="Progress-overview container">
                {project?.components.length > 0 ?  <DetailsSection components={project?.components} /> : ''}

                </section>
                <section className="project_components">
                  <h4 style={{ textAlign: 'center', fontSize: '1.5em', margin: 0}}>Project Menu</h4>
                  <ProjectHome match={match} />
                </section>
                
              </div>
            </Content>
          </Layout>
        </Content>
      </Spin>
    </Layout>
  )
}

const mapStateToProps = (state) => {
  return {
    project: projectSelectors.getProjectSelector(state),
    projects: projectSelectors.getProjectsSelector(state),
    loading: projectSelectors.getProjectLoadingSelector(state),
  };
};

const mapDispatchToProps = {
  getProject: projectActions.getProjectStart,
};

ProjectDetails.propTypes = {
  project: PropTypes.object
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
