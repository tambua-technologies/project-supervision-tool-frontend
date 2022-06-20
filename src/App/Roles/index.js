import React from "react";
import ActionBar from "../components/ActionBar";
const Roles = () => (
  <>
    <ActionBar
      actionButtonProp={{
        title: "User Roles",
        arrActions: [
          {
            btnName: "Add New User Role ",
            btnAction: () => {},
          },
        ],
      }}
    />
  </>
);

export default Roles;
