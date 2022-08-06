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
import Gallery from "../components/Gallery";
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



const Routes = () => {
  const {  appRoutes: routes } = useContext(AppContext);

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
