import { createMemoryHistory } from "history";
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from "../Auth/PrivateRoute";

describe('private route', () => {
  it("redirects unauthenticated users to SignIn", async () => {
    const history = createMemoryHistory({ initialEntries: ["/Private"] });
    const PrivateComponent = () => <>Private!</>
    const PublicComponent = () => <>Redirected!</>
    const MockedRoute = () => {

      return <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/Private" component={PrivateComponent} />
          <Route exact path="/SignIn" component={PublicComponent} />
        </Switch>
      </Router>
    }
    render(<MockedRoute />);

    expect(screen.queryByText("Private!")).not.toBeInTheDocument();
    expect(screen.queryByText("Redirected!")).toBeInTheDocument();
    expect(history.location.pathname).toBe("/signin")
  });
})