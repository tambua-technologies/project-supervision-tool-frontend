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
import "./styles.css";
import ProcuringEntity from "../ProcuringEntities/components/ProcuringEntity";
import CreateReportForm from "../Reports/components/CreateReportForm";
import HumanResources from "../Packages/componets/Package/HumanResource";
import EquipmentMobilization from "../Packages/componets/Package/EquipmentMobilization";
import Package from "../Packages/componets/Package";
import FieldNotes from "../FieldNotes";

const Routes = ({setCurrentMenu}) => (<Switch>
    <PrivateRoute
        path={`/procuring_entity/:procuringEntityId/overview`}
        component={(props) => (
            <ProcuringEntity
                {...props}
                setCurrentMenu={setCurrentMenu}
            />
        )}
    />
    <PrivateRoute
        path={`/procuring_entity/:procuringEntityId/safeguard`}
        component={(props) => <SafeGuard {...props} />}
    />

    {/* Packages routes */}
    <PrivateRoute
        exact
        path={`/procuring_entity/:procuringEntityId/packages`}
        component={(props) => <Packages {...props} />}
    />
    <PrivateRoute
        path={`/procuring_entity/:procuringEntityId/packages/:packageId`}
        component={(props) => <Package {...props} />}
    />
    <PrivateRoute
        path={`/procuring_entity/:procuringEntityId/HumanResources`}
        component={(props) => <HumanResources {...props} />}
    />
    <PrivateRoute
        path={`/procuring_entity/:procuringEntityId/EquipmentMobilization`}
        component={(props) => <EquipmentMobilization {...props} />}
    />

    {/*  Reports routes */}
    <PrivateRoute
        exact
        path={"/procuring_entity/:procuringEntityId/reports"}
        component={(props) => <Reports {...props} />}
    />
    <PrivateRoute
        path={`/procuring_entity/:procuringEntityId/reports/create`}
        component={(props) => <CreateReportForm {...props} />}
    />

    {/* Field notes routes */}
    <PrivateRoute
        exact
        path={`/procuring_entity/:procuringEntityId/field-notes`}
        component={(props) => <FieldNotes {...props} />}
    />
    <PrivateRoute
        path={`/procuring_entity/:procuringEntityId/field-notes/create`}
        component={(props) => <CreateFieldNoteForm {...props} />}
    />

    <PrivateRoute
        exact
        path={`/procuring_entity/:procuringEntityId/sub-projects`}
        component={(props) => <SubProjects {...props} />}
    />

    <PrivateRoute
        path={`/procuring_entity/:procuringEntityId/sub-projects/:subProjectId`}
        component={(props) => <Subproject {...props} />}
    />

    <PrivateRoute
        path={`/procuring_entity/:procuringEntityId/contractors`}
        component={(props) => <Contract />}
    />
</Switch>);

export default Routes;