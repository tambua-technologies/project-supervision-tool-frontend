import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from "../Auth/PrivateRoute";
import SubProjectsList from "./components/SubProjectsList";
import SubProjectDetails from "./components/SubProjectsDetails";

const SubProjects = (props) => {
    return (
        <Switch>
            <PrivateRoute
                path={`${props.match.url}/:id`}
                component={props => <SubProjectDetails {...props} />}
            />
        </Switch>
    );
}

export default SubProjects;
