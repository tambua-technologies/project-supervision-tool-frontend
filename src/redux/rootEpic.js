import { combineEpics } from "redux-observable";
import { mapRootEpic } from "./modules/map/epics";
import { projectsRootEpic } from "./modules/projects/epics";
import { restoreAccessTokenEpic } from './modules/app/epics';
import { authRootEpic } from "./modules/auth/epics";
import { sectorsEpic } from './modules/ProjectsSectors/epics';
import { projectDetailsEpic } from './modules/projectDetails/epics';
import {subProjectsEpic} from './modules/subProjects/epics';
import { getUsersEpic, createUserEPic, editUserEpic, deleteUserEpic } from "./modules/users/epics";
import { getContractsEpic, createContractEPic, editContractEpic, deleteContractEpic } from "./modules/contracts/epics";
import { ticketsEpic } from './modules/Tickets/epics';
import { procuringEntitiesEpic } from './modules/ProcuringEntities/epics';

export const rootEpic = combineEpics(
    authRootEpic,
    restoreAccessTokenEpic,
    restoreAccessTokenEpic,
    mapRootEpic,
    projectsRootEpic,
    sectorsEpic,
    projectDetailsEpic,
    subProjectsEpic,
    getUsersEpic,
    createUserEPic,
    editUserEpic,
    deleteUserEpic,
    getContractsEpic,
    createContractEPic,
    editContractEpic,
    deleteContractEpic,
    ticketsEpic,
    procuringEntitiesEpic,
)
