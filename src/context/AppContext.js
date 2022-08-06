import React, { useState, createContext, useEffect } from "react";
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
import * as AppPermissions from '../Util/permissions'


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


const CustomIcon = () => (<span className="CustomIcon" />)

const getMenuItems = (menuKeys, permissions) => {
    const { map, overview, packages, subProjects, reports, fieldNotes, safeguardConcerns, users, roles } = menuKeys;

    return [
       
        {
            key: overview,
            icon: <CustomIcon />,
            label: 'Overview',
        },
        {
            key: map,
            icon: <CustomIcon />,
            label: 'Map',
            disabled: !permissions.includes(AppPermissions.CAN_READ_SUB_PROJECT),
        },
        {
            key: packages,
            icon: <CustomIcon />,
            label: 'Packages',
            disabled: !permissions.includes(AppPermissions.CAN_READ_PACKAGE),

        },
        {
            key: subProjects,
            icon: <CustomIcon />,
            label: 'Subprojects',
            disabled: !permissions.includes(AppPermissions.CAN_READ_SUB_PROJECT),
        },

        {
            key: reports,
            icon: <CustomIcon />,
            label: 'Reports',
            disabled: !permissions.includes(AppPermissions.CAN_READ_REPORT),
        },
        {
            key: fieldNotes,
            icon: <CustomIcon />,
            label: 'Field Notes',
            disabled: !permissions.includes(AppPermissions.CAN_READ_FIELD_NOTE),
        },
        {
            key: safeguardConcerns,
            icon: <CustomIcon />,
            label: 'OHS and Safeguards',
            disabled: !permissions.includes(AppPermissions.CAN_READ_SAFEGUARD_CONCERN),
        },
        {
            key: users,
            icon: <CustomIcon />,
            label: 'Users',
            disabled: !permissions.includes(AppPermissions.CAN_READ_USER),
        }
        ,
        {
            key: roles,
            icon: <CustomIcon />,
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
