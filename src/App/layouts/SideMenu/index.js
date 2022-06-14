import React from 'react';
import { Menu } from 'antd';
import { useHistory } from 'react-router-dom';

import './styles.css';


const CustomIcon = () => (<span className="CustomIcon" />)

const items = [
  {
    key: 'sub-projects-map',
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

  const history = useHistory();

  const handleOnMenuItemClick = e =>   history.push(`${baseUrl}/${e.key}`);

    return (
    <Menu
        mode="inline"
        defaultSelectedKeys={['sub-projects-map']}
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