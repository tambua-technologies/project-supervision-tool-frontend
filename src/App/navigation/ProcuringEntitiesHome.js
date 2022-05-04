import React from 'react';
import PropTypes from 'prop-types';
import NavigationMenu from '../components/NavigationMenu';
import subProjectsIcon from '../../assets/icons/sub-projects.svg';
import subProjectsDisabledIcon from '../../assets/icons/sub-projects-grey.svg';
import modules from '../../modules.json';


/* constants */
const routes = [

    {
        name: 'Packages',
        path: '/packages',
        icon: subProjectsIcon,
        description: modules.initiatives,
    },

    {
        name: 'Progress Reports',
        path: '/reports',
        icon: subProjectsIcon,
        description: modules.initiatives,
        disabled: false,
    },

    {
        name: "Consultant's Staff",
        path: '/monitoring-and-evaluation',
        icon: subProjectsDisabledIcon,
        description: modules.initiatives,
        disabled: true,
    },

    {
        name: 'SubProjects',
        path: '/sub_projects',
        icon: subProjectsDisabledIcon,
        description: modules.initiatives,
        disabled: true,
    },
    
    {
        name: 'Contractors',
        path: '/agreed-actions',
        icon: subProjectsDisabledIcon,
        description: modules.initiatives,
        disabled: true,
    },
    
   
];

/**
 * @function
 * @name HomeNavMenu
 * @description Home component which shows to base navigation menu
 * @param {object} props Component Props
 * @param {object} props.match Match prop from react router
 * @returns {object} Navigation Menu
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const ProcuringEntityHomeNavMenu = ({ match }) => (
    <NavigationMenu routes={routes} match={match} />
);

ProcuringEntityHomeNavMenu.propTypes = {
    match: PropTypes.shape({ url: PropTypes.string }).isRequired,
};
export default ProcuringEntityHomeNavMenu;
