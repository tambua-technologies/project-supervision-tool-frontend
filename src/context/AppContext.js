import React from "react";

/**
 * @object sideMenuKeys
 * @description This object contains the side menu keys. 
 * the idea behid is to provide a single place to change side menu keys.
 */
const sideMenuKeys = {
    overview: 'overview',
    reports: 'reports',
    fieldNotes: 'field-notes',
    map: 'sub-projects-map',
    contract: 'contracts',
    subProjects: 'sub-projects',
    safeguardConcerns: 'safeguard-concerns',
    packages: 'packages',
}



export  const AppContext = React.createContext({sideMenuKeys});