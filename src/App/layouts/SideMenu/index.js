import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useHistory } from 'react-router-dom';

import './styles.css';


const CustomIcon = () => (<span className="CustomIcon" />)

const defaultActiveMenuItem = 'sub-projects-map';

const items = [
  {
    key: defaultActiveMenuItem,
    icon: React.createElement(CustomIcon),
    label: 'Map',
  },
  {
    key: 'overview',
    icon: React.createElement(CustomIcon),
    label: 'Overview',
  },
  {
    key: 'packages',
    icon: React.createElement(CustomIcon),
    label: 'Packages',
  },
  {
    key: 'sub-projects',
    icon: React.createElement(CustomIcon),
    label: 'Subprojects',
  },

  {
    key: 'reports',
    icon: React.createElement(CustomIcon),
    label: 'Reports',
  },
  {
    key: 'field-notes',
    icon: React.createElement(CustomIcon),
    label: 'Field Notes',
  },
  {
    key: 'safeguard',
    icon: React.createElement(CustomIcon),
    label: 'Safeguard Concerns',
  },
  {
    key: 'contracts',
    icon: React.createElement(CustomIcon),
    label: 'Contracts'
  },


];

const SideMenu = (props) => {
  const { baseUrl } = props;
  const [activeMenuItem, setActiveMenuItem] = useState(defaultActiveMenuItem);

  const history = useHistory();

  const handleOnMenuItemClick = e => {
    setActiveMenuItem(e.key);
    history.push(`${baseUrl}/${e.key}`);
  };

  useEffect(() => {
    // get active menu item from localStorage
    const activeMenuItem = localStorage.getItem('activeMenuItem');
    if (activeMenuItem) {
      setActiveMenuItem(activeMenuItem);
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