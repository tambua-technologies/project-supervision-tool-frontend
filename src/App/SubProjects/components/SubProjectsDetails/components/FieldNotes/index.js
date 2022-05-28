
import React from "react";
import ManageFieldNotes from "./components/ManageFieldNotes";
import ViewFieldNotes from "./components/ViewFieldNotes";
import {checkForPermission} from "../../../../../../Util";

function FieldNotes ({subProject, getSubProject, permissions, permission}) {

    return checkForPermission(permissions, permission) ? <ManageFieldNotes
        subProject={subProject}
        getSubProject={getSubProject}
    />
    : <ViewFieldNotes subProject={subProject} />;
}

export default FieldNotes;
