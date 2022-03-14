import React from "react";
import { Switch } from 'react-router-dom';
import PrivateRoute from "../../../Auth/PrivateRoute";
import ProjectDetails from "./ProjectDetails";
import ProcuringEntities from '../../../ProcuringEntities';

const Project = (props) => {

  return (
    <Switch>
      <PrivateRoute
        exact
        path={`${props.match.url}`}
        component={props => <ProjectDetails {...props} />}
      />

     <PrivateRoute
        path={`${props.match.url}/procuring_entities`}
        component={props => <ProcuringEntities {...props} />}
      />
     
  </Switch>
  )
}

export default Project;
