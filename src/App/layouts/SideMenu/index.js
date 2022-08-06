import React, { useContext, useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveMenuItem } from '../../../redux/modules/app/actions';
import { activeMenuItemSelector } from '../../../redux/modules/app/selectors';

import './styles.css';
import { AppContext } from '../../../context/AppContext';




const SideMenu = (props) => {
  const { baseUrl } = props;
  const activeMenuItem = useSelector(activeMenuItemSelector);
  const { sideMenuKeys, menuItems: items } = useContext(AppContext);
  const dispatch = useDispatch();

  const history = useHistory();


  const handleOnMenuItemClick = e => {
    dispatch(setActiveMenuItem(e.key));
    history.push(`${baseUrl}/${e.key}`);
  };

  useEffect(() => {
    // get active menu item from localStorage
    const activeMenuItem = localStorage.getItem('activeMenuItem');
    if (activeMenuItem) {
      dispatch(setActiveMenuItem(activeMenuItem));
    }
    else {
      dispatch(setActiveMenuItem(sideMenuKeys.map));
    }
  }, []);


  useEffect(() => {
    // save active menu item in local storage
    localStorage.setItem('activeMenuItem', activeMenuItem);
  }, [activeMenuItem]);

  

  return (
    <Menu
      mode="inline"
      className="side-menu"
      selectedKeys={[activeMenuItem]}
      style={{
        height: '100%',
        borderRight: 0,
      }}
      onClick={handleOnMenuItemClick}
      items={items.map( item => ({...item, 'data-testid': `${item.key}-menu-item`}))}
    />
  )
}

export default SideMenu;