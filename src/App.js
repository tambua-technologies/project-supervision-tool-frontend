import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import SignIn from './App/Auth/components/SignIn';
import BaseLayout from './App/layouts/BaseLayout';
import { bindActionCreators } from "redux";
import { appActions } from './redux/modules/app';
import PrivateRoute from "./App/Auth/PrivateRoute";
import MapDashboard from "./App/Map";
import Projects from './App/Projects';

Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} spin />);
function App(props) {

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            props.reloadPage();
        }

    });

    return (
        <div className="App">
            <HashRouter hashType="hashbang">
                <Switch>
                    <Route path="/app" component={BaseLayout} />
                    <PrivateRoute path="/map" component={props => <MapDashboard {...props} />} />
                    <PrivateRoute path="/projects" component={props => <Projects {...props} />} />
                    <Route path="/signin" component={SignIn} />
                    <Redirect to="/signin" />
                </Switch>
            </HashRouter>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    reloadPage: bindActionCreators(appActions.reloadPage, dispatch)
});

export default connect(null, mapDispatchToProps)(App);

