
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Form, Input, Button, Row, Col, Select,
    DatePicker,
} from 'antd';
import { projectActions, projectSelectors } from "../../../../../redux/modules/projects";
import { bindActionCreators } from "redux";
import { projectDetailsActions, projectDetailsSelectors } from '../../../../../redux/modules/projectDetails';
import { createDateFromString, generateDateString, generateYearString } from "../../../../../Util";
import CommitmentAmountForm from "./CommitmentAmountForm";
import TotalProjectCostForm from "./TotalProjectCostForm";
import { usersActions, usersSelectors } from '../../../../../redux/modules/users';
import TypographyComponent from '../../../../components/Typography';
import { useToggle } from '../../../../../hooks/useToggle';
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
 * @name ProjectForm
 * @description renders form for creating project
 */
function ProjectForm({
    selected,
    getRegions,
    regions,
    createProject,
    handleConfirmButton,
    getProjectStatus,
    statuses,
    getAgencies,
    getBorrowers,
    getEnvironmentalCategories,
    getFundingOrgs,
    borrowers,
    partiners,
    agencies,
    environmentalCategories,
    getLayers,
    layers,
    getCurrency,
    currency,
    users,
    getUsers,
    isEditForm,
    updateProject,
}) {
    const { setVisible }= useToggle(false);
    const [visibleTotalProjectCost, setVisibleTotalProjectCost] = useState(false);
    const [VisibleCommitmentAmount, setVisibleCommitmentAmount] = useState(false);
    const [commitment_amount_id, setCommitmentAmount] = useState(null);
    const [total_project_cost_id, setTotalProjetCost] = useState(false);

    useEffect(() => {
           // eslint-disable-next-line react-hooks/exhaustive-deps

        getProjectStatus();
        getBorrowers();
        getFundingOrgs();
        getAgencies();
        getRegions()
        getEnvironmentalCategories();
        getLayers();
        getCurrency();
        getUsers();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps


    const showTotalProjectCostModal = () => {
        setVisibleTotalProjectCost(true);
    };

    const hideTotalProjectCostModal = () => {
        setVisibleTotalProjectCost(false);
    };


    const showCommitmentAmountModal = () => {
        setVisibleCommitmentAmount(true)
    };

    const hideCommitmentAmountModal = () => {
        setVisibleCommitmentAmount(false)
    };

    const setCommitmentAmountId = (id) => {
        setCommitmentAmount(id);
    };

    const setTotalProjectCostId = (id) => {
        setTotalProjetCost(id)
    };


    const onFinish = (values) => {
        const approval_date = generateDateString(values.approval_date);
        const approval_fy = generateYearString(values.approval_fy);
        const closing_date = generateDateString(values.closing_date);
        const shapefiles = layers.filter(({ id }) => values.layers.includes(id));
        const payload = {
            ...values,
            approval_date,
            approval_fy,
            closing_date,
            shapefiles,
            commitment_amount_id: commitment_amount_id ? commitment_amount_id : selected?.commitment_amount.id,
            total_project_cost_id: total_project_cost_id ? total_project_cost_id : selected?.total_project_cost.id
        };

        if (isEditForm) {
            updateProject(payload, selected.id);
        }
        else {
            createProject(payload);
        }
        handleConfirmButton();

    };
    
    const selectedCommitmentAmount = { amount: selected?.commitment_amount?.amount, currency_id: selected?.commitment_amount.currency.id };
    const selectedTotalProjectCost = { amount: selected?.total_project_cost.amount, currency_id: selected?.total_project_cost.currency.id }

    return (
        <>
            <Form.Provider
                onFormFinish={(name, { values, forms }) => {
                    if (name === 'userForm') {
                        const { basicForm } = forms;
                        const users = basicForm.getFieldValue('users') || [];
                        basicForm.setFieldsValue({
                            users: [...users, values],
                        });
                        setVisible(false);
                    }
                    // handling commitment amount form
                    if (name === 'commitmentAmountForm') {
                        const { basicForm } = forms;
                        basicForm.setFieldsValue({
                            commitmentAmountValue: values
                        });
                        setVisibleCommitmentAmount(false);
                    }

                    // handling total project cost form
                    if (name === 'totalProjectCostForm') {
                        const { basicForm } = forms;
                        basicForm.setFieldsValue({
                            totalProjectCostValue: values
                        });
                        setVisibleTotalProjectCost(false);
                    }


                }}
            >

                <Form
                    labelCol={labelCol}
                    wrapperCol={wrapperCol}
                    name="basicForm"
                    onFinish={onFinish}
                    initialValues={{
                        wb_project_id: selected?.wb_project_id,
                        code: selected?.code,
                        name: selected?.name,
                        leaders: selected?.leaders.map(leader => leader.id),
                        regions: selected?.regions.map(region => region.id),
                        description: selected?.description,
                        layers: selected?.shapefiles?.map(({ title}) => title),
                        funding_organisation_id: selected?.funding_organisation?.id,
                        implementing_agency_id: selected?.implementing_agency?.id,
                        project_status_id: selected?.status?.id,
                        approval_date: createDateFromString(selected?.approval_date),
                        closing_date: createDateFromString(selected?.closing_date,),
                        approval_fy: createDateFromString(selected?.approval_fy,),
                        borrower_id: selected?.borrower?.id,
                        color: selected?.color,
                        environmental_category_id: selected?.environmental_category?.id
                    }}
                    autoComplete="off"
                    className="ProjectForm"
                >
                    <h4>Please Fill the form correctly</h4>

                    {/* start:project name */}
                    <Form.Item
                        label="Project Name"
                        name="name"
                        title="Project name e.g DMDP"
                        rules={[
                            {
                                required: true,
                                message: "Project name is required",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {/* end:project name */}

                    {/* start:Description */}
                    <Form.Item
                        label="Description"
                        name="description"
                        title="Project Description e.g water recyle project"
                        rules={[
                            {
                                required: true,
                                message: "Project description is required",
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    {/* end:Description */}

                    {/* start:type */}
                    <Row type="flex" justify="space-between">
                        <Col xxl={11} xl={11} lg={11} md={11} sm={24} xs={24}>
                            <Form.Item
                                label="Project Id"
                                name="wb_project_id"
                                title="Project id e.g 1236567"
                                rules={[
                                    {
                                        required: true,
                                        message: "Project identity is required",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24} span={12}>
                            {/* start:code */}
                            <Form.Item
                                label="Project Code"
                                name="code"
                                rules={[
                                    {
                                        required: true,
                                        message: "Project code is required",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            {/* end:code */}
                        </Col>
                    </Row>
                    {/* end:project id */}

                    <Row type="flex" justify="space-between">
                        <Col xxl={11} xl={11} lg={11} md={11} sm={24} xs={24}>
                            {/* start:shapefile */}
                            <Form.Item
                                label="Projects ShapeFIle"
                                name="layers"
                                title="Shapefile"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Select mode="multiple">
                                    {layers.map(({ title, id }) => (
                                        <Select.Option key={id} value={id}>{title}</Select.Option>
                                    ))}
                                </Select>

                            </Form.Item>
                            {/* end:Shapefile */}
                        </Col>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24} span={12}>
                            {/* start:Leaders */}
                            <Form.Item
                                label="WB Leaders"
                                name="leaders"
                                title="WB team Leaders e.g Elis Adam"
                            >
                                <Select mode="multiple"  >
                                    {users.map((user) => (
                                        <Select.Option key={user.id} value={user.id}>{user.first_name} {user.last_name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            {/* end:leaders */}
                        </Col>
                    </Row>

                    <Row type="flex" justify="space-between">
                        <Col xxl={11} xl={11} lg={11} md={11} sm={24} xs={24}>
                            {/* start:funding organisation  */}
                            <Form.Item
                                label="Funding Organizations"
                                name="funding_organisation_id"
                                title="funding organisation i.e The World Bank"
                            >
                                <Select showSearch optionFilterProp="children">
                                    {partiners.map((partiner) => (
                                        <Select.Option key={partiner.id} value={partiner.id}>{partiner.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            {/* end:funding organisation */}
                        </Col>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24} span={12}>
                            {/* start:Leaders */}

                            {/* start:Implementing Agency */}
                            <Form.Item
                                label="Implementing Agency"
                                name="implementing_agency_id"
                                title="implementing agency e.g PO-LARG"
                            >
                                <Select
                                    showSearch
                                    optionFilterProp="children"

                                >
                                    {agencies.map((agency) => (
                                        <Select.Option key={agency.id} value={agency.id}>{agency.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            {/* end:Implementing Agency */}

                        </Col>
                    </Row>

                    <Row type="flex" justify="space-between">
                        <Col xxl={11} xl={11} lg={11} md={11} sm={24} xs={24}>
                            {/* start:Project Status */}
                            <Form.Item
                                label="Project Status"
                                name="project_status_id"
                                title="Project status e.g Active"
                                type="boolean"
                                rules={[
                                    {
                                        required: true,
                                        message: "Project status is required",
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    optionFilterProp="children"

                                >
                                    {statuses.map(({ name, id }) => (
                                        <Select.Option key={id} value={id} style={{ textTransform: 'Capitalize' }}>{name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            {/* end:Project Status */}
                        </Col>

                        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24} span={12}>
                            {/* start:Project Regions */}
                            <Form.Item
                                label="Region"
                                name="regions"
                                rules={[
                                    {
                                        required: true,
                                        message: "Region is required",
                                    },
                                ]}
                            >
                                <Select mode="multiple">
                                    {regions.map(({ id, name }) => (
                                        <Select.Option key={id} value={id}>{name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            {/* end:Project Regions */}

                        </Col>
                    </Row>

                    <Row justify="space-between">
                        <Col xxl={11} xl={11} lg={11} md={11} sm={24} xs={24}>
                            {/* start: total projects cost */}
                            <Form.Item
                                label="Total Project Cost"
                                shouldUpdate={(prevValues, curValues) => prevValues.totalProjectCostValue !== curValues.totalProjectCostValue}
                            >
                                {({ getFieldValue }) => {
                                    const totalProjectCostValue = getFieldValue('totalProjectCostValue');
                                    const totalProjectCostValueEdited = totalProjectCostValue || selectedTotalProjectCost;
                                    return (
                                        <TypographyComponent
                                            isEditForm={isEditForm}
                                            amountValue={totalProjectCostValue}
                                            editedAmountValue={totalProjectCostValueEdited}
                                            showModal={showTotalProjectCostModal}
                                            currency={currency}
                                        />
                                    )
                                }}
                            </Form.Item>
                            {/* end: total projects cost */}
                        </Col>

                        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24} span={12}>
                            {/* start: commitment amount */}
                            <Form.Item
                                label="Commitment Amount"
                                shouldUpdate={(prevValues, curValues) => prevValues.commitmentAmountValue !== curValues.commitmentAmountValue}
                            >
                                {({ getFieldValue }) => {
                                    const commitmentAmountValue = getFieldValue('commitmentAmountValue');
                                    const commitmentAmountValueEdited = commitmentAmountValue || selectedCommitmentAmount;

                                    return (
                                        <TypographyComponent
                                            isEditForm={isEditForm}
                                            amountValue={commitmentAmountValue}
                                            editedAmountValue={commitmentAmountValueEdited}
                                            showModal={showCommitmentAmountModal}
                                            currency={currency}
                                        />
                                    )
                                }}
                            </Form.Item>
                            {/* end: commitment amount */}
                        </Col>
                    </Row>

                    <Row type="flex" justify="space-between">
                        <Col xxl={11} xl={11} lg={11} md={11} sm={24} xs={24}>
                            {/* start:borrower */}
                            <Form.Item
                                label="Borrowers"
                                name="borrower_id"
                                title="Borrower e.g Ministry of Finance"
                            >
                                <Select>
                                    {borrowers.map((borrower) => (
                                        <Select.Option key={borrower.id} value={borrower.id}>{borrower.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            {/* end:borrower */}
                        </Col>

                        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24} span={12}>
                            {/* start:environmental category  */}
                            <Form.Item
                                label="Environmental Category"
                                name="environmental_category_id"
                                title="Environmental category i.e A"
                            >
                                <Select showSearch optionFilterProp="children" >
                                    {environmentalCategories.map((environmentalCategory) => (
                                        <Select.Option key={environmentalCategory.id}value={environmentalCategory.id}>{environmentalCategory.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            {/* end:environmental category */}
                        </Col>
                    </Row>

                    <Row justify="space-between">
                        <Col xxl={5} xl={5} lg={5} md={5} sm={24} xs={24}>
                            {/* start:project approval fiscal year */}
                            <Form.Item
                                label="Approval FY"
                                name="approval_fy"
                                title="project approval fiscal year date e.g 06-20-2020"
                                rules={[
                                    {
                                        required: true,
                                        message: "project approval fiscal year date is required",
                                    },
                                ]}
                            >
                                <DatePicker picker="year" />
                            </Form.Item>
                            {/* end:project approval fiscal year */}
                        </Col>

                        <Col xxl={5} xl={5} lg={5} md={5} sm={24} xs={24}>
                            {/* start:project approval date */}
                            <Form.Item
                                label="Approval Date"
                                name="approval_date"
                                title="project approval date e.g 06-20-2020"
                                rules={[
                                    {
                                        required: true,
                                        message: "project approval  date is required",
                                    },
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>
                            {/* end:project approval date */}
                        </Col>

                        <Col xxl={5} xl={5} lg={5} md={5} sm={24} xs={24}>
                            {/* start:closing date */}
                            <Form.Item
                                label="Closing Date"
                                title="project closing end date e.g 07-30-2020"
                                name="closing_date"
                                rules={[
                                    {
                                        required: true,
                                        message: "projects end date is required",
                                    },
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>
                            {/* end:closing date */}

                        </Col>
                        <Col xxl={5} xl={5} lg={5} md={5} sm={24} xs={24}>

                            {/* start:color */}
                            <Form.Item
                                label="Color"
                                title="Project Color"
                                name="color"
                                rules={[
                                    {
                                        required: true,
                                        message: "projects color is required",
                                    },
                                ]}
                            >
                                <input type="color" value="#000000" />
                            </Form.Item>
                            {/* end:color */}
                        </Col>
                    </Row>

                    {/* start:form actions */}
                    <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "right", marginTop: "15px" }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginLeft: 8 }}
                        >
                            Submit
                    </Button>
                    </Form.Item>
                    {/* end:form actions */}
                </Form>

                <CommitmentAmountForm
                    visible={VisibleCommitmentAmount}
                    onCancel={hideCommitmentAmountModal}
                    setCommitmentAmountId={setCommitmentAmountId}
                    currency={currency}
                    isEditForm={isEditForm}
                    selected={selected}

                />
                <TotalProjectCostForm
                    visible={visibleTotalProjectCost}
                    onCancel={hideTotalProjectCostModal}
                    setTotalProjectCostId={setTotalProjectCostId}
                    currency={currency}
                    isEditForm={isEditForm}
                    selected={selected}

                />
            </Form.Provider>
        </>
    );
}

const mapStateToProps = state => ({
    regions: projectSelectors.getRegionsSelector(state),
    statuses: projectSelectors.getProjectStatusSelector(state),
    borrowers: projectDetailsSelectors.getBorrowersSelector(state),
    environmentalCategories: projectSelectors.getEnvironmentalCategoriesSelector(state),
    partiners: projectDetailsSelectors.getFundingOrgsSelector(state),
    agencies: projectDetailsSelectors.getAgenciesSelector(state),
    layers: projectSelectors.getLayers(state),
    currency: projectDetailsSelectors.getCurrenciesSelector(state),
    users: usersSelectors.getUsersSelector(state),

});

const mapDispatchToProps = (dispatch) => ({
    getRegions: bindActionCreators(projectActions.getRegionsStart, dispatch),
    createLocation: bindActionCreators(projectActions.createProjectLocationStart, dispatch),
    createProject: bindActionCreators(projectActions.createProjectStart, dispatch),
    getProjectStatus: bindActionCreators(projectActions.getProjectStatusStart, dispatch),
    getBorrowers: bindActionCreators(projectDetailsActions.getBorrowersStart, dispatch),
    getFundingOrgs: bindActionCreators(projectDetailsActions.getFundingOrgStart, dispatch),
    getAgencies: bindActionCreators(projectDetailsActions.getAgenciesStart, dispatch),
    getEnvironmentalCategories: bindActionCreators(projectActions.getEnvironmentalCategoriesStart, dispatch),
    getLayers: bindActionCreators(projectActions.getLayersStart, dispatch),
    getCurrency: bindActionCreators(projectDetailsActions.getCurrenciesStart, dispatch),
    getUsers: bindActionCreators(usersActions.getUsersStart, dispatch),
    updateProject: bindActionCreators(projectActions.updateProjectStart, dispatch),

});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);

ProjectForm.propTypes = {
    regions: PropTypes.array,
    getRegions: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    getProjectStatus: PropTypes.func.isRequired,
    statuses: PropTypes.array,
    getEnvironmentalCategories: PropTypes.func.isRequired,
    environmentalCategories: PropTypes.array,
    getBorrowers: PropTypes.func.isRequired,
    borrowers: PropTypes.array,
    getFundingOrgs: PropTypes.func.isRequired,
    partiners: PropTypes.array,
    getAgencies: PropTypes.func.isRequired,
    agencies: PropTypes.array
}

ProjectForm.defaultProps = {
    regions: [],
    statuses: [],
    borrowers: [],
    partiners: [],
    agencies: [],
    environmentalCategories: []


}

