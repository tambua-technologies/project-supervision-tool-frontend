import React, { useContext, useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveMenuItem } from '../../../redux/modules/app/actions';
import { activeMenuItemSelector } from '../../../redux/modules/app/selectors';

import './styles.css';
import { AppContext } from '../../../context/AppContext';


const CustomIcon = () => (<span className="CustomIcon" />)

const getMenuItems = (menuKeys) => {
  const { map, overview, packages, subProjects, reports, fieldNotes, safeguardConcerns, contracts } = menuKeys;

  return  [
    {
      key: map,
      icon: React.createElement(CustomIcon),
      label: 'Map',
    },
    {
      key: overview,
      icon: React.createElement(CustomIcon),
      label: 'Overview',
    },
    {
      key: packages,
      icon: React.createElement(CustomIcon),
      label: 'Packages',
    },
    {
      key: subProjects,
      icon: React.createElement(CustomIcon),
      label: 'Subprojects',
    },
  
    {
      key: reports,
      icon: React.createElement(CustomIcon),
      label: 'Reports',
    },
    {
      key: fieldNotes,
      icon: React.createElement(CustomIcon),
      label: 'Field Notes',
    },
    {
      key: safeguardConcerns,
      icon: React.createElement(CustomIcon),
      label: 'EHS and Safeguards',
    },
    {
      key: contracts,
      icon: React.createElement(CustomIcon),
      label: 'Contracts'
    },
  
  
  ];
}

const SideMenu = (props) => {
  const { baseUrl } = props;
  const activeMenuItem = useSelector(activeMenuItemSelector);
  const { sideMenuKeys } = useContext(AppContext);
  const dispatch = useDispatch();

  const history = useHistory();

  const items = getMenuItems(sideMenuKeys);

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
      items={items}
    />
  )
}

export default SideMenu;