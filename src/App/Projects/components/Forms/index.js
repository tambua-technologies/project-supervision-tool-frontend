
import React, { Component } from "react";
import { connect } from "react-redux";
import ProjectForm from './components/projectForm';
import { projectActions, projectSelectors } from '../../../../redux/modules/projects';
import ProjectDetailsForm from "./components/projectDetailsForm";
import { projectDetailsActions } from "../../../../redux/modules/projectDetails";
import { projectSectorsActions } from "../../../../redux/modules/ProjectsSectors";
import { focalPeopleActions, focalPeopleSelectors } from "../../../FocalPeople/duck";


class CommonProjectForm extends Component {

    state = {
        current: 0
    }

    componentDidMount() {
        const { getFocalPeoples } = this.props
        getFocalPeoples();
    }

    onChange = current => {
        this.setState({ current });
        console.log(current)
    };

    next = () => {
        this.setState({ current: this.state.current + 1 })
        this.onChange(this.state.current)
    };

    prev = () => {
        this.setState({ current: this.state.current - 1 });
        this.onChange(this.state.current - 1)

    };

    getProjectFormValue = (values) => {
        localStorage.setItem("project_data", JSON.stringify(values));
        this.next()
    }

    getProjectLocationFormValue = (values) => {
        const { createProjectLocation } = this.props
        createProjectLocation(values)
    }

    handleSubmitProject = () => {
        const { project_location, createProject } = this.props
        const { id: location_id } = project_location;
        const locations = [location_id]
        const project = JSON.parse(localStorage.getItem('project_data'))
        const projectPayload = { ...project, locations };
        createProject(projectPayload)
        localStorage.removeItem('project_data');
        this.setState({ current: this.state.current + 1 })
    }

    getProjectDetailFormValue = (values) => {
        const { createProjectDetail } = this.props;
        createProjectDetail(values)
        this.next()
    }

    handleCreateSector = (values) => {
        const { createProjectSector } = this.props;
        createProjectSector(values);
    }

    handleConfirmButton = () => {
        const { handleAfterSubmit } = this.props;
        handleAfterSubmit();
    }

    render() {
        const { focalPeoples, project, selected, isEditForm } = this.props
        /* eslint-disable no-unused-vars */

        const steps = [
            {
                title: 'Step 1',
                content: <ProjectForm
                    submittedValues={this.getProjectFormValue}
                    focalPeoples={focalPeoples}
                    handleConfirmButton={this.handleConfirmButton}
                    next={this.next}
                />
            },
            {
                title: 'Step 2',
                content: <ProjectDetailsForm
                    handleConfirmButton={this.handleConfirmButton}
                    project={project}
                    handleBackButton={this.prev}
                />

            },

        ];
        return (
            <>
                {/* <Steps current={current} key={steps.map(title => title)} onChange={this.onChange}>
                    {steps.map(item => (
                        <Step title={item.title} />
                    ))}
                </Steps> */}
                {/* <div className="steps-content">{steps[current].content}</div> */}
                <ProjectForm
                    submittedValues={this.getProjectFormValue}
                    focalPeoples={focalPeoples}
                    handleConfirmButton={this.handleConfirmButton}
                    next={this.next}
                    selected={selected}
                    isEditForm={isEditForm}

                />

            </>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        project: projectSelectors.getCreatedProjectSelector(state),
        project_location: projectSelectors.getProjectLocationSelector(state),
        focalPeoples: focalPeopleSelectors.getFocalPeople(state),
    };
};

const mapDispatchToProps = {
    createProjectLocation: projectActions.createProjectLocationStart,
    createProjectSector: projectSectorsActions.createProjectSectorsStart,
    createProjectDetail: projectDetailsActions.createProjectDetailsStart,
    getFocalPeoples: focalPeopleActions.getFocalPeopleStart,
    createProject: projectActions.createProjectStart,

}

export default connect(mapStateToProps, mapDispatchToProps)(CommonProjectForm);
