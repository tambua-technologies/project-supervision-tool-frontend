import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import SignIn from "./App/Auth/components/SignIn";
import { bindActionCreators } from "redux";
import { appActions } from "./redux/modules/app";
import PrivateRoute from "./App/Auth/PrivateRoute";
import BaseLayout from "./App/layouts/BaseLayout";
import { AppContext } from "./context/AppContext";

/**
 * @object sideMenuKeys
 * @description This object contains the side menu keys. 
 * the idea behid is to provide a single place to change side menu keys.
 */
 const sideMenuKeys = {
  overview: 'overview',
  reports: 'reports',
  fieldNotes: 'field-notes',
  map: 'sub-projects-map',
  contract: 'contracts',
  subProjects: 'sub-projects',
  safeguardConcerns: 'safeguard-concerns',
  packages: 'packages',
}


Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} spin />);
function App(props) {
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      props.reloadPage();
    }
  });

  return (
    <AppContext.Provider value={{sideMenuKeys}}>
      <div className="App">
      <HashRouter hashType="hashbang">
        <Switch>
          <PrivateRoute path="/procuring_entity/:procuringEntityId" component={BaseLayout} />
          <Route path="/signin" component={SignIn} />
          <Redirect to="/signin" />
        </Switch>
      </HashRouter>
    </div>
    </AppContext.Provider>
  );
}

const mapDispatchToProps = (dispatch) => ({
  reloadPage: bindActionCreators(appActions.reloadPage, dispatch),
});

export default connect(null, mapDispatchToProps)(App);
