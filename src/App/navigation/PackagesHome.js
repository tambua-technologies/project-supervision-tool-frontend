import React from 'react';
import PropTypes from 'prop-types';
import NavigationMenu from '../components/NavigationMenu';
import subProjectsIcon from '../../assets/icons/sub-projects.svg';
import subProjectsDisabledIcon from '../../assets/icons/sub-projects-grey.svg';
import modules from '../../modules.json';


/* constants */
const routes = [


    {
        name: 'SubProjects',
        path: '/sub_projects',
        icon: subProjectsIcon,
        description: modules.initiatives,
    },

    {
        name: 'Milestones',
        path: '/milestone',
        icon: subProjectsDisabledIcon,
        description: modules.initiatives,
        disabled: true,
    },

    {
        name: 'Human Resources',
        path: '/human_resource',
        icon: subProjectsDisabledIcon,
        description: modules.initiatives,
        disabled: true,
    },

    {
        name: 'Human Equipment Mobilization',
        path: '/equipment',
        icon: subProjectsDisabledIcon,
        description: modules.initiatives,
        disabled: true,
    },
    {
        name: 'Tickets',
        path: '/tickets',
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
const PackageHomeNavMenu = ({ match }) => (
    <NavigationMenu routes={routes} match={match} />
);

PackageHomeNavMenu.propTypes = {
    match: PropTypes.shape({ url: PropTypes.string }).isRequired,
};
export default PackageHomeNavMenu;
