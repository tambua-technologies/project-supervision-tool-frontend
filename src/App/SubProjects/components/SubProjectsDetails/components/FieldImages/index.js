
import React from "react";
import ManageFieldImages from "./components/ManageFieldImages";
import ViewFieldImages from "./components/ViewFieldImages";
import {checkForPermission} from "../../../../../../Util";

function FieldImages ({subProject, getSubProject, permissions, permission}) {

    return checkForPermission(permissions, permission) ? <ManageFieldImages
            subProject={subProject}
            getSubProject={getSubProject}
        />
        : <ViewFieldImages subProject={subProject} />;
}

export default FieldImages;
