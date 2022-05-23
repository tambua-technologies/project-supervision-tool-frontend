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
import AppLayout from "./App/layouts/appLayout";
import CscLayout from "./App/layouts/cscLayout";

Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} spin />);
function App(props) {
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      props.reloadPage();
    }
  });

  return (
    <div className="App">
      <HashRouter hashType="hashbang">
        <Switch>
          <Route path="/app/:procuringEntityId" component={CscLayout} />

          <Route path="/signin" component={SignIn} />
          <Redirect to="/signin" />
        </Switch>
      </HashRouter>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  reloadPage: bindActionCreators(appActions.reloadPage, dispatch),
});

export default connect(null, mapDispatchToProps)(App);
