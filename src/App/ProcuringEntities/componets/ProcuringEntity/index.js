import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from "../../../Auth/PrivateRoute";
import ProcuringEntityDetails from "../Details";
import Packages from "../../../Packages";
import SubProjectsList from '../../../Sub-projects/components/SubProjectsList';
import FieldNotes from '../../../FieldNotes';
import SubProjectsMap from '../../../SubProjectsMap';
import SubProjectsDetails from '../../../Sub-projects/components/SubProjectsDetails';

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

            <PrivateRoute
                exact
                path="/projects/:projectId/procuring_entities/:procuringEntityId/sub_projects/:id"
                component={props => <SubProjectsDetails {...props} />}
            />

            <PrivateRoute
                exact
                path="/projects/:projectId/procuring_entities/:procuringEntityId/field_notes"
                component={props => <FieldNotes {...props} />}
            />

            <PrivateRoute
                exact
                path="/projects/:projectId/procuring_entities/:procuringEntityId/sub_projects_map"
                component={props => <SubProjectsMap {...props} />}
            />

        </Switch>
    );
}

export default ProcuringEntity;
