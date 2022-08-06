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
import AppContextProvider from "./context/AppContext";




Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} spin />);
function App() {
  

  return (
    <AppContextProvider>
      <div className="App">
      <HashRouter hashType="hashbang">
        <Switch>
          <PrivateRoute path="/procuring_entity/:procuringEntityId" component={BaseLayout} />
          <Route path="/signin" component={SignIn} />
          <Redirect to="/signin" />
        </Switch>
      </HashRouter>
    </div>
    </AppContextProvider>
  );
}

const mapDispatchToProps = (dispatch) => ({
  reloadPage: bindActionCreators(appActions.reloadPage, dispatch),
});

export default connect(null, mapDispatchToProps)(App);
