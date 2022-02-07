

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  Row,
  Col,
  Typography,

} from "antd";
import { generateDateString, generateYearString } from "../../../../../Util";
import { connect } from "react-redux";
import { projectDetailsActions, projectDetailsSelectors } from "../../../../../redux/modules/projectDetails";
import {projectActions, projectSelectors} from "../../../../../redux/modules/projects";
import CommitmentAmountForm from "./CommitmentAmountForm";
import TotalProjectCostForm from "./TotalProjectCostForm";
import {projectSectorsActions, projectSectorsSelectors} from "../../../../../redux/modules/ProjectsSectors";
import ProjectSectorsForm from "./ProjectSectors";

/* state actions */

/* ui */
const labelCol = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 24 },
  lg: { span: 24 },
  xl: { span: 24 },
  xxl: { span: 24 },
};
const wrapperCol = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 24 },
  lg: { span: 24 },
  xl: { span: 24 },
  xxl: { span: 24 },
};

/**
 * @function
 * @name getCurrencyIsoFromCurrencies
 * @description gets currrency  iso from array of currencies
 */
const getCurrencyIsoFromCurrencies = (currency_id, currencies) => {
  const currency = currencies.find(({id }) => id === currency_id);
  return currency.iso;
};


/**
 * @function
 * @name getSectorNameFromSectors
 * @description get sector name from sectors
 */
const getSectorNameFromSectors = (sectorId, sectors) => {
  const sector = sectors.find(({ id }) => id === sectorId );
  return sector.name;
}


class ProjectDetailsForm extends Component {
  state = {
    showDistrictsSelect: false,
    isEditForm: false,
    visibleTotalProjectCost: false,
    visibleCommitmentAmount: false,
    visibleProjectSectors: false,
    commitment_amount_id: null,
    total_project_cost_id: null,
  }

  componentDidMount() {
    const {
      getCurrency,
      getSectors,
    } = this.props;
    getSectors();
    getCurrency();
  }


  showTotalProjectCostModal = () => {
    this.setState({ visibleTotalProjectCost: true});
  };

  hideTotalProjectCostModal = () => {
    this.setState({ visibleTotalProjectCost: false });
  };


  showCommitmentAmountModal = () => {
    this.setState({ visibleCommitmentAmount: true});
  };

  hideCommitmentAmountModal = () => {
    this.setState({ visibleCommitmentAmount: false });
  };


  showProjectSectorsModal = () => {
    this.setState({ visibleProjectSectors: true});
  };

  hideProjectSectorsModal = () => {
    this.setState({ visibleProjectSectors: false });
  };

  setCommitmentAmountId = (id) => {
    this.setState({ commitment_amount_id: id });
  };

  setTotalProjectCostId = (id) => {
    this.setState({ total_project_cost_id: id });
  };


  // form finish(submit) handler
  onFinish = (values) => {
    const { commitment_amount_id, total_project_cost_id } = this.state;
    const { createProjectDetails, project, handleConfirmButton } = this.props;
    const approval_date = generateDateString(values.approval_date);
    const approval_fy = generateYearString(values.approval_fy);
    const closing_date = generateDateString(values.closing_date);
    const project_id = project.id;
    const detailsPayload = JSON.parse(localStorage.getItem('detailsPayload'))
    const payload = {
      ...values,
      approval_date,
      approval_fy,
      project_id,
      closing_date,
      commitment_amount_id,
      total_project_cost_id,
      detailsPayload
    };

    console.log(payload);
    createProjectDetails(payload);
    handleConfirmButton();
    localStorage.removeItem('detailsPayload');

  };


  render() {
    const {
      selected,
      handleBackButton,
      currency,
      sectors,
      project
    } = this.props;

    const { visibleCommitmentAmount, visibleTotalProjectCost, visibleProjectSectors } = this.state;

    return (
      <Form.Provider
          onFormFinish={(name, { values, forms }) => {

            // handling commitment amount form
            if (name === 'commitmentAmountForm') {
              const { projectDetailsForm } = forms;
              projectDetailsForm.setFieldsValue({
                commitmentAmountValue: values
              });
              this.setState({visibleCommitmentAmount: false});
            }

            // handling total project cost form
            if (name === 'totalProjectCostForm') {
              const { projectDetailsForm } = forms;
              projectDetailsForm.setFieldsValue({
                totalProjectCostValue: values
              });
              this.setState({visibleTotalProjectCost: false});
            }

            // handling project sectors
            if (name === 'projectSectorsForm') {
              const { projectDetailsForm } = forms;
              const sectors = projectDetailsForm.getFieldValue('sectors') || [];
              projectDetailsForm.setFieldsValue({
                sectors: [...sectors, values],
              });
              this.setState({visibleProjectSectors: false});
            }
          }}
      >
        <Form
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            onFinish={this.onFinish}
            projectsValues={{
              projects_id: selected?.projects_id,
              name: selected?.name,
              leaders: selected?.leaders,
              description: selected?.description,
            }}
            autoComplete="off"
            className="ProjectDetailsForm"
            name="projectDetailsForm"
        >
      <h4>Please provide project details</h4>

          <Row justify="space-between">
            <Col span={11}>
              {/* start: commitment amount */}
              <Form.Item
                  label="Total Project Cost"
                  shouldUpdate={(prevValues, curValues) => prevValues.totalProjectCostValue !== curValues.totalProjectCostValue }
              >
                {({ getFieldValue }) => {
                  const totalProjectCostValue = getFieldValue('totalProjectCostValue') || null;
                  return (
                      <div>
                        {totalProjectCostValue ? (
                            <Typography.Text className="ant-form-text" type="success" strong={true}>
                              {`${totalProjectCostValue.amount} ${getCurrencyIsoFromCurrencies(totalProjectCostValue.currency_id, currency)}`}
                            </Typography.Text>
                        ): (
                            <Typography.Text className="ant-form-text" type="secondary">
                              Click Add to fill total project cost
                            </Typography.Text>
                        )}
                        <Button
                            size="small"
                            htmlType="button"
                            style={{
                              fontSize: '0.9em'
                            }}
                            onClick={this.showTotalProjectCostModal}
                        >
                          Add
                        </Button>
                      </div>
                  );
                }}
              </Form.Item>
              {/* end: commitment amount */}
            </Col>
            <Col span={11}>
              {/* start: commitment amount */}
              <Form.Item
                  label="Commitment Amount"
                  shouldUpdate={(prevValues, curValues) => prevValues.commitmentAmountValue !== curValues.commitmentAmountValue }
              >
                {({ getFieldValue }) => {
                  const commitmentAmountValue = getFieldValue('commitmentAmountValue') || null;
                  return (
                      <div>
                        {commitmentAmountValue ? (
                            <Typography.Text className="ant-form-text" type="success" strong={true}>
                              {`${commitmentAmountValue.amount} ${getCurrencyIsoFromCurrencies(commitmentAmountValue.currency_id, currency)}`}
                            </Typography.Text>
                        ): (
                            <Typography.Text className="ant-form-text" type="secondary">
                              Click Add to fill commitment amount
                            </Typography.Text>
                        )}
                        <Button
                            size="small"
                            htmlType="button"
                            style={{
                              fontSize: '0.9em'
                            }}
                            onClick={this.showCommitmentAmountModal}
                        >
                          Add
                        </Button>
                      </div>
                  );
                }}
              </Form.Item>
              {/* end: commitment amount */}
            </Col>
          </Row>


          {/* start: project sectors list */}
          <Form.Item
              label="Project Sectors"
              shouldUpdate={(prevValues, curValues) => prevValues.sectors !== curValues.sectors}
          >
            {({ getFieldValue }) => {
              const sectorsData = getFieldValue('sectors') || [];
              return (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                  }}>
                    {sectorsData.length ? (
                        <ul>
                          {sectorsData.map((sector, index) => (
                              <li key={index} className="user">
                                {`${getSectorNameFromSectors(sector.sector_id, sectors) } - (${sector.percent}%)`}
                              </li>
                          ))}
                        </ul>
                    ): (
                        <div>
                          <Typography.Text className="ant-form-text" type="secondary">
                            No sector(s) yet, please add sector(s)
                          </Typography.Text>
                        </div>
                    )}
                    <Button
                        size="small"
                        htmlType="button"
                        style={{
                          fontSize: '0.9em'
                        }}
                        onClick={this.showProjectSectorsModal}
                    >
                      Add
                    </Button>
                  </div>
              );
            }}
          </Form.Item>
          {/* end: project sectors list */}

          {/* start:form actions */}
          <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "right" }}>
            <Button type="default" onClick={handleBackButton} >
              Back
            </Button>
            <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: 8 }}
            >
              Next
            </Button>
          </Form.Item>
          {/* end:form actions */}

        </Form>
        <CommitmentAmountForm
            visible={visibleCommitmentAmount}
            onCancel={this.hideCommitmentAmountModal}
            setCommitmentAmountId={this.setCommitmentAmountId}
            currency={currency}
        />
        <TotalProjectCostForm
            visible={visibleTotalProjectCost}
            onCancel={this.hideTotalProjectCostModal}
            setTotalProjectCostId={this.setTotalProjectCostId}
            currency={currency}
        />

        <ProjectSectorsForm
            visible={visibleProjectSectors}
            onCancel={this.hideProjectSectorsModal}
            sectors={sectors}
            project={project}
        />

      </Form.Provider>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    regions: projectSelectors.getRegionsSelector(state),
    agencies: projectDetailsSelectors.getAgenciesSelector(state),
    project: projectSelectors.getProjectSelector(state),
    sectors: projectSectorsSelectors.getSectorsSelector(state),
    currency: projectDetailsSelectors.getCurrenciesSelector(state),
    amount_cost: projectDetailsSelectors.getCreatedAmountCostSelector(state),
    commitment_cost: projectDetailsSelectors.getCreatedCommitmentCostSelector(state),
  };
};

const mapDispatchToProps = {
  getSectors: projectSectorsActions.getSectorsStart,
  getFundingOrgs: projectDetailsActions.getFundingOrgStart,
  createProjectDetails: projectDetailsActions.createProjectDetailsStart,
  getCurrency: projectDetailsActions.getCurrenciesStart,
  getRegions: projectActions.getRegionsStart,

}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsForm);


ProjectDetailsForm.defaultProps = {
  project: null,
  sectors: [],
};

ProjectDetailsForm.propTypes = {
  project: PropTypes.object,
  sectors: PropTypes.array.isRequired,
  next: PropTypes.func.isRequired,
  getSectors: PropTypes.func.isRequired,
  handleConfirmButton: PropTypes.func.isRequired,
  currency: PropTypes.array.isRequired,
  getEnvironmentalCategories: PropTypes.func,
  createProjectDetails: PropTypes.func.isRequired,
  environmentalCategories: PropTypes.array.isRequired,
  isEditForm: PropTypes.bool.isRequired,
  posting: PropTypes.bool.isRequired,
  items: PropTypes.array,
  onCancel: PropTypes.func.isRequired,
};

