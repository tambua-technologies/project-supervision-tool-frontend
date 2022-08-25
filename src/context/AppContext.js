import React, { useState, createContext, useEffect } from "react";
import Icon from '@ant-design/icons';
import Roles from '../App/Roles';
import Packages from "../App/Packages";
import SubProjects from "../App/SubProjects";
import SafeGuard from "../App/SafeguardConcerns";
import Users from "../App/Users";
import CreateFieldNoteForm from "../App/FieldNotes/componets/CreateFieldNoteForm";
import Subproject from "../App/SubProjects/components/SubProject";
import Reports from "../App/Reports";
import Gallery from "../App/components/Gallery";
import ProcuringEntity from "../App/ProcuringEntities/components/ProcuringEntity";
import CreateReportForm from "../App/Reports/components/CreateReportForm";
import HumanResources from "../App/Packages/componets/Package/HumanResource";
import EquipmentMobilization from "../App/Packages/componets/Package/EquipmentMobilization";
import Package from "../App/Packages/componets/Package";
import FieldNotes from "../App/FieldNotes";
import SubProjectsMap from "../App/SubProjectsMap";
import * as AppPermissions from '../Util/permissions';
import { ReactComponent as OverviewSvg } from '../assets/icons/overview.svg';
import { ReactComponent as MapSvg } from '../assets/icons/map.svg';
import { ReactComponent as GeonodeSvg } from '../assets/icons/geo-node-layers.svg';
import { ReactComponent as ContractSvg } from '../assets/icons/contract-management.svg';
import { ReactComponent as PackagesSvg } from '../assets/icons/packages.svg';
import { ReactComponent as ProjectsSvg } from '../assets/icons/projects.svg';
import { ReactComponent as SubprojectsSvg } from '../assets/icons/sub-projects.svg';
import { ReactComponent as ReportsSvg } from '../assets/icons/reports.svg';
import { ReactComponent as FieldNotesSvg } from '../assets/icons/field-notes.svg';
import { ReactComponent as EHSSafeguardsSvg } from '../assets/icons/m-and-e.svg';
import { ReactComponent as UsersSvg } from '../assets/icons/users.svg';
import { ReactComponent as PermissionsSvg } from '../assets/icons/action-items.svg';
import "./AppContext.css";

const baseUrl = "/procuring_entity/:procuringEntityId";
const sideMenuKeys = {
    overview: "overview",
    reports: "reports",
    fieldNotes: "field-notes",
    map: "sub-projects-map",
    contracts: "contracts",
    subProjects: "sub-projects",
    safeguardConcerns: "safeguard-concerns",
    packages: "packages",
    users: "users",
    roles: "roles",
};

const getRoutes = (menuKeys) => {
    const {
        map,
        overview,
        packages,
        subProjects,
        reports,
        fieldNotes,
        safeguardConcerns,
        users,
        roles,
    } = menuKeys;
    return [
        {
            path: `${baseUrl}/${overview}`,
            component: ProcuringEntity,
            exact: true,
        },

        {
            path: `${baseUrl}/${safeguardConcerns}`,
            component: SafeGuard,
            exact: true,
        },
        {
            path: `${baseUrl}/${packages}`,
            component: Packages,
            exact: true,
        },
        {
            path: `${baseUrl}/${packages}/:packageId`,
            component: Package,
            exact: true,
        },
        {
            path: `${baseUrl}/${packages}/:packageId/Gallery`,
            component: Gallery,
            exact: true,
        },
        {
            path: `${baseUrl}/${packages}/:packageId/human-resources`,
            component: HumanResources,
            exact: true,
        },
        {
            path: `${baseUrl}/${packages}/:packageId/equipment-mobilization`,
            component: EquipmentMobilization,
            exact: true,
        },
        {
            path: `${baseUrl}/${reports}`,
            component: Reports,
            exact: true,
        },
        {
            path: `${baseUrl}/${fieldNotes}`,
            component: FieldNotes,
            exact: true,
        },
        {
            path: `${baseUrl}/${subProjects}`,
            component: SubProjects,
            exact: true,
        },
        {
            path: `${baseUrl}/${subProjects}/:subProjectId`,
            component: Subproject,
            exact: false,
        },
        {
            path: `${baseUrl}/${reports}/create`,
            component: CreateReportForm,
            exact: true,
        },
        {
            path: `${baseUrl}/${fieldNotes}/create`,
            component: CreateFieldNoteForm,
            exact: true,
        },

        {
            path: `${baseUrl}/${map}`,
            component: SubProjectsMap,
            exact: true,
        },
        {
            path: `${baseUrl}/${users}`,
            component: Users,
            exact: true,
        },
        {
            path: `${baseUrl}/${roles}`,
            component: Roles,
            exact: true,
        },
    ];
};

const iconStyle =  { fontSize: '36px', };
const CustomIcon = () => (<Icon style={{...iconStyle}} component={OverviewSvg} />) ;
const OverviewIcon = () => (<Icon style={{...iconStyle}} component={OverviewSvg} /> )
const MapIcon = () => (<Icon style={{...iconStyle}} component={MapSvg} /> )
const PackagesIcon = () => (<Icon style={{...iconStyle}} component={PackagesSvg} /> )
const ProjectsIcon = () => (<Icon style={{...iconStyle}} component={ProjectsSvg} /> )
const SubprojectsIcon = () => (<Icon style={{...iconStyle}} component={SubprojectsSvg} /> )
const ReportsIcon = () => (<Icon style={{...iconStyle}} component={ReportsSvg} /> )
const FieldNotesIcon = () => (<Icon style={{...iconStyle}} component={FieldNotesSvg} /> )
const EHSSafeguardsIcon = () => (<Icon style={{...iconStyle}} component={EHSSafeguardsSvg} /> )
const UsersIcon = () => (<Icon style={{...iconStyle}} component={UsersSvg} /> )
const PermissionsIcon = () => (<Icon style={{...iconStyle}} component={PermissionsSvg} /> )

const getMenuItems = (menuKeys, permissions) => {
    const { map, overview, packages, subProjects, reports, fieldNotes, safeguardConcerns, users, roles } = menuKeys;

    return [
       
        {
            key: overview,
            icon: <OverviewIcon />,
            label: 'Overview',
        },
        {
            key: map,
            icon: <MapIcon />,
            label: 'Map',
            disabled: !permissions.includes(AppPermissions.CAN_READ_SUB_PROJECT),
        },
        {
            key: packages,
            icon: <PackagesIcon />,
            label: 'Packages',
            disabled: !permissions.includes(AppPermissions.CAN_READ_PACKAGE),

        },
        {
            key: subProjects,
            icon: <SubprojectsIcon />,
            label: 'Subprojects',
            disabled: !permissions.includes(AppPermissions.CAN_READ_SUB_PROJECT),
        },

        {
            key: reports,
            icon: <ReportsIcon />,
            label: 'Reports',
            disabled: !permissions.includes(AppPermissions.CAN_READ_REPORT),
        },
        {
            key: fieldNotes,
            icon: <FieldNotesIcon />,
            label: 'Field Notes',
            disabled: !permissions.includes(AppPermissions.CAN_READ_FIELD_NOTE),
        },
        {
            key: safeguardConcerns,
            icon: <EHSSafeguardsIcon />,
            label: 'OHS and Safeguards',
            disabled: !permissions.includes(AppPermissions.CAN_READ_SAFEGUARD_CONCERN),
        },
        {
            key: users,
            icon: <UsersIcon />,
            label: 'Users',
            disabled: !permissions.includes(AppPermissions.CAN_READ_USER),
        }
        ,
        {
            key: roles,
            icon: <PermissionsIcon />,
            label: 'Roles & Permissions',
            disabled: !permissions.includes(AppPermissions.CAN_READ_ROLE),
        }
    ];
}

const appRoutes = getRoutes(sideMenuKeys);

export const AppContext = createContext({});


const AppContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    const roles = currentUser?.roles || [];
    const permissions = roles.map(({permissions}) => permissions.map(({name}) => name)).flat();
    const removeDisabledMenuItems = () => {
        const menuItems = getMenuItems(sideMenuKeys, permissions);
        return menuItems.filter(({disabled}) => !disabled);
    };
    const menuItems = removeDisabledMenuItems();

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('user', JSON.stringify(currentUser));
        }
    } , [currentUser]);

    return (
        <AppContext.Provider value={{
            appRoutes,
            menuItems,
            sideMenuKeys,
            permissions,
            setCurrentUser,
        }}>
            {children}
        </AppContext.Provider>
    );
}
export default AppContextProvider;
