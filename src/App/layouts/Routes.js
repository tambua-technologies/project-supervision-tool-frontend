import React, { useContext } from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../Auth/PrivateRoute";
import Contract from "../ProcuringEntities/components/Contract";
import Roles from '../Roles';
import Packages from "../Packages";
import SubProjects from "../SubProjects";
import SafeGuard from "../SafeguardConcerns";
import Users from "../Users";
import CreateFieldNoteForm from "../FieldNotes/componets/CreateFieldNoteForm";
import Subproject from "../SubProjects/components/SubProject";
import Reports from "../Reports";
import Gallary from "../components/Gallary";
import "./styles.css";
import ProcuringEntity from "../ProcuringEntities/components/ProcuringEntity";
import CreateReportForm from "../Reports/components/CreateReportForm";
import HumanResources from "../Packages/componets/Package/HumanResource";
import EquipmentMobilization from "../Packages/componets/Package/EquipmentMobilization";
import Package from "../Packages/componets/Package";
import FieldNotes from "../FieldNotes";
import SubProjectsMap from "../SubProjectsMap";
import { AppContext } from "../../context/AppContext";

const baseUrl = "/procuring_entity/:procuringEntityId";

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
      path: `${baseUrl}/${packages}/:packageId/Gallary`,
      component: Gallary,
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

const Routes = () => {
  const { sideMenuKeys } = useContext(AppContext);
  const routes = getRoutes(sideMenuKeys);

  return (
    <Switch>
      {routes.map((route, i) => (
        <PrivateRoute
          key={`route-${i}`}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
};

export default Routes;
