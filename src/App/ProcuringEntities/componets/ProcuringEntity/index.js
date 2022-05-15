import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from "../../../Auth/PrivateRoute";
import ProcuringEntityDetails from "../Details";
import Packages from "../../../Packages";
import SubProjectsList from '../../../Sub-projects/components/SubProjectsList';

const ProcuringEntity = (props) => {
    return (
        <Switch>
            <PrivateRoute
                exact
                path={`${props.match.url}`}
                component={props => <ProcuringEntityDetails {...props}/>}
            />
            <PrivateRoute
                path={`${props.match.url}/packages`}
                component={props => <Packages {...props} />}
            />
            <PrivateRoute
                exact
                path="/projects/:projectId/procuring_entities/:procuringEntityId/sub_projects"
                component={props => <SubProjectsList {...props}/>}
            />
        </Switch>
    );
}

export default ProcuringEntity;
