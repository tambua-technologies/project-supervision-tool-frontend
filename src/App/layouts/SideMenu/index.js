import React from 'react';
import { Menu } from 'antd';
import { useHistory } from 'react-router-dom';

import './styles.css';

const CustomIcon = () => (<span className="CustomIcon" />)

const items = [
  {
    key: 'overview',
    icon: React.createElement(CustomIcon),
    label: 'Overview',
  },
  {
    key: 'reports',
    icon: React.createElement(CustomIcon),
    label: 'Reports',
  },
  {
    key: 'safeguard',
    icon: React.createElement(CustomIcon),
    label: 'Safeguard Concerns',
  },
  {
    key: 'packages',
    icon: React.createElement(CustomIcon),
    label: 'Packages',
  },
  {
    key: 'sub-projects',
    icon: React.createElement(CustomIcon),
    label: 'Sub Projects',
  },
  {
    key: 'csc-contracts',
    icon: React.createElement(CustomIcon),
    label: 'CSC Contracts'
  },
  {
    key: 'map',
    icon: React.createElement(CustomIcon),
    label: 'Map',
  },

];

const SideMenu = (props) => {
  const { baseUrl } = props;

  const history = useHistory();

  const handleOnMenuItemClick = e => {
    if(e.key === 'map') {
      history.push(`/map/${baseUrl}`);
    }
    else {
      history.push(`${baseUrl}/${e.key}`);
    }
  }

    return (<Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        className="side-menu"
        style={{
          height: '100%',
          borderRight: 0,
        }}
        onClick={handleOnMenuItemClick}
        items={items}
      />)
}

export default SideMenu;