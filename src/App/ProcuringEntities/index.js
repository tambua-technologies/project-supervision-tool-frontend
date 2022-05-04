import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from "../Auth/PrivateRoute";
import ProgressReports from './componets/ ProgressReports';
import ProcuringEntitiesList from "./componets/ProcuringEntitiesList";
import ProcuringEntity from "./componets/ProcuringEntity";

const ProcuringEntities = (props) => {

  return (
    <Switch>

      <PrivateRoute
        path={`${props.match.url}/:id/reports`}
        component={props => <ProgressReports {...props} />}
      />

      <PrivateRoute
        path={`${props.match.url}/:id`}
        component={props => <ProcuringEntity {...props} />}
      />
      <PrivateRoute
        exact
        path={`${props.match.url}`}
        component={props => <ProcuringEntitiesList {...props} />}
      />

    </Switch>
  );
}

export default ProcuringEntities;
