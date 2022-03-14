
import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../Auth/PrivateRoute";
import ProjectsList from "./components/ProjectsList";
import Project from "./components/Project";

/**
 * @function
 * @name Projects
 * @description render the projects page
 *
 * @version 0.1.0
 * @since 0.1.0
 */
function Projects(props) {
  return (
    <Switch>
    <PrivateRoute
      exact
      path={`${props.match.url}/`}
      component={props => <ProjectsList {...props}/>}
    />
    <PrivateRoute
      path={`${props.match.url}/:id`}
      component={props => <Project {...props} />}
    />
  </Switch>
  );

}

export default Projects;




