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
    key: 'field-notes',
    icon: React.createElement(CustomIcon),
    label: 'Field Notes',
  },

  {
    key: 'csc-contracts',
    icon: React.createElement(CustomIcon),
    label: 'CSC Contracts'
  },
  {
    key: 'sub-projects-map',
    icon: React.createElement(CustomIcon),
    label: 'Map',
  },

];

const SideMenu = (props) => {
  const { baseUrl } = props;

  const history = useHistory();

  const handleOnMenuItemClick = e =>   history.push(`${baseUrl}/${e.key}`);

    return (
    <Menu
        mode="inline"
        defaultSelectedKeys={['overview']}
        className="side-menu"
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