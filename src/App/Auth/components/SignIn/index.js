import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import {Input, Button, Form} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {authActions, authSelectors} from "../../../../redux/modules/auth";
import { useHistory } from "react-router-dom";
import "./styles.css";
import API from "../../../../API";
import {AppContext} from "../../../../context/AppContext";


/**
 * @class
 * @name SignIn
 * @description Sign In form  component
 * @version 0.1.0
 * @since 0.1.0
 */
const SignIn = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const {setCurrentUser} = useContext(AppContext);
    const history = useHistory();


     /**
     * @function
     * @name onFinish
     * @description collects values submitted in form
     * and dispatches login start action
     * @param {Object} values
     */
     const onFinish = (values) => {
        
        setLoading(true);
        API.login(values)
        .then(res => {
            // save access token to local storage
            localStorage.setItem("accessToken", res.data.access_token);
            setCurrentUser(res.data.user);
            const {procuringEntity} = res.data.user;
            setLoading(false);
           history.push(`/procuring_entity/${procuringEntity.id}/overview`);
            
        })
        .catch( err => {
            setErrorMessage(err.message);
            setLoading(false);
        })
    }

    useEffect(() => {
        // remove active menu item from local storage
        localStorage.removeItem('activeMenuItem');
    }, []);
    

        return (
            <div className="SignIn">
                    <div className="SignInForm">
                        <div className="Logo">
                            <h2>Projects Supervison tool</h2>
                            <h5>Please Login to your account</h5>
                        </div>
                        <div style={{color: 'red'}}>{errorMessage}</div>
                        <Form autoComplete="off" onFinish={onFinish}>
                            {/* username field */}
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        email: true,
                                        message: "Please input your username!",
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                                    placeholder="Email"
                                    data-testid="email"

                                />
                            </Form.Item>
                            {/* end username field */}

                            {/* password field */}
                            <Form.Item
                                name="password"
                                rules={[
                                    {required: true, message: "Please input your Password!"},
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                                    placeholder="Password"
                                    data-testid="password"

                                />
                            </Form.Item>
                            {/* end password field */}

                            {/* submit button */}
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="signIn-form-button"
                                    loading={loading}
                                >
                                    Log In
                                </Button>
                            </Form.Item>
                            {/* end submit button */}
                        </Form>
                        </div>
            </div>
        );
}

SignIn.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func,
    }).isRequired,
    loading: PropTypes.bool,
    errorMsg:PropTypes.string
};


SignIn.defaultProps = {
    history: {}
}

const mapStateToProps = (state) => {
    return {
        loading: authSelectors.isLoginSelector(state),
        accessToken: authSelectors.accessTokenSelector(state),
        errorMsg: authSelectors.loginErrorMessageSelector(state),
        permissions: authSelectors.authUserPermissionsSelector(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    login: bindActionCreators(authActions.loginStart, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);


