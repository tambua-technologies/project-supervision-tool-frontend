import { LockOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { Button, Dropdown, Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {authActions} from '../../redux/modules/auth';
import './styles.css';

/**
 * @class
 * @name SignOut
 * @description carries  sing out component
 */
class SignOut extends Component{
    handleOnClick = () => {
        console.log('inse click');
        localStorage.removeItem('accessToken');
        return this.props.logout();
    }
   render() {
       return <div onClick={this.handleOnClick}> <LogoutOutlined /><span style={{padding: 10}}>Sign Out</span></div>
   }
}

const mapDispatchToProps = (dispatch) => ({
    logout: bindActionCreators(authActions.logout, dispatch)

});

const SignOutWrapper = connect(null, mapDispatchToProps)(SignOut);

/**
 * @function
 * @param {object} props User menu props
 * @param {object} props.history history object
 * @param {Function} props.history.push push handler
 * @name UserMenu
 * @description Menu for shown when user click user icon at the top bar
 * @returns {object} User Menu component
 * @version 0.1.0
 * @since 0.1.0
 */
const UserMenu = ({ history: { push } }) => {

  const onClickMenu = ({ key }) => {
    if (key === 'changePassword') {
      // setShowChangePassword(true);
    } else {
      push('/')
    }
  };

  const menu = (
    <Menu className="UserProfileMenu" onClick={onClickMenu}>
      <Menu.Item key="changePassword">
        <LockOutlined />
        Change Password
      </Menu.Item>
      <Menu.Item key="signOut">
        <SignOutWrapper/>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='UserMenu'>
      <Dropdown overlay={menu}>
        <Button className="UserButton" icon={<UserOutlined />} />
      </Dropdown>
    </div>
  );
};

UserMenu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(UserMenu);


