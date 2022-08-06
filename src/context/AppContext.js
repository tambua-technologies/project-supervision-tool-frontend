import React, {useState} from "react";
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

const getMenuItems = (menuKeys) => {
  const { map, overview, packages, subProjects, reports, fieldNotes, safeguardConcerns, users, roles } = menuKeys;

  return  [
    {
      key: map,
      icon: <CustomIcon />,
      label: 'Map',
    },
    {
      key: overview,
      icon: <CustomIcon />,
      label: 'Overview',
    },
    {
      key: packages,
      icon: <CustomIcon />,
      label: 'Packages',
    },
    {
      key: subProjects,
      icon: <CustomIcon />,
      label: 'Subprojects',
    },
  
    {
      key: reports,
      icon: <CustomIcon />,
      label: 'Reports',
    },
    {
      key: fieldNotes,
      icon: <CustomIcon />,
      label: 'Field Notes',
    },
    {
      key: safeguardConcerns,
      icon: <CustomIcon />,
      label: 'OHS and Safeguards',
    },
    {
      key: users,
      icon: <CustomIcon />,
      label: 'Users',
    }
    ,
    {
      key: roles,
      icon: <CustomIcon />,
      label: 'Roles & Permissions',
    }
  ];
}

  const appRoutes = getRoutes(sideMenuKeys);
    const menuItems = getMenuItems(sideMenuKeys);

export const AppContext = React.createContext({});


const AppContextProvider = ({ children }) => {
    return (
        <AppContext.Provider value={{ appRoutes, menuItems, sideMenuKeys }}>
        {children}
        </AppContext.Provider>
    );
    }
export default AppContextProvider;
