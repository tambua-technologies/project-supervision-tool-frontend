import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../Auth/PrivateRoute";
import Contract from "../ProcuringEntities/components/Contract";
import Packages from "../Packages";
import SubProjects from "../SubProjects";
import SafeGuard from "../SafeguardConcerns";
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

const baseUrl = "/procuring_entity/:procuringEntityId";

const routes = [
  {
    path: `${baseUrl}/overview`,
    component: ProcuringEntity,
    exact: true,
  },

  {
    path: `${baseUrl}/safeguard`,
    component: SafeGuard,
    exact: true,
  },
  {
    path: `${baseUrl}/packages`,
    component: Packages,
    exact: true,
  },

  {
    path: `${baseUrl}/packages/:packageId`,
    component: Package,
    exact: true,
  },
  {
    path: `${baseUrl}/packages/:packageId/Gallary`,
    component: Gallary,
    exact: true,
  },
  {
    path: `${baseUrl}/packages/:packageId/human-resources`,
    component: HumanResources,
    exact: true,
  },
  {
    path: `${baseUrl}/packages/:packageId/equipment-mobilization`,
    component: EquipmentMobilization,
    exact: true,
  },
  {
    path: `${baseUrl}/reports`,
    component: Reports,
    exact: true,
  },
  {
    path: `${baseUrl}/field-notes`,
    component: FieldNotes,
    exact: true,
  },
  {
    path: `${baseUrl}/sub-projects`,
    component: SubProjects,
    exact: true,
  },
  {
    path: `${baseUrl}/sub-projects/:subProjectId`,
    component: Subproject,
    exact: false,
  },
  {
    path: `${baseUrl}/contractors`,
    component: Contract,
    exact: true,
  },
  {
    path: `${baseUrl}/reports/create`,
    component: CreateReportForm,
    exact: true,
  },
  {
    path: `${baseUrl}/field-notes/create`,
    component: CreateFieldNoteForm,
    exact: true,
  },
];

const Routes = () => {
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
