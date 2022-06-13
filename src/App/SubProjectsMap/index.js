import React, { useEffect } from 'react';
import { Spin } from 'antd';
import BaseMap from "./components/BaseMap";
import { useDispatch, useSelector } from 'react-redux';
import SideNav from './components/SideNav'
import { mapSubProjectActions, mapSubProjectSelectors } from "../../redux/modules/map/subProjects";
import "./styles.css";
import SubProjectPoints from './components/SubProjectPoints';

function SubProjectsMap(props) {
    const dispatch = useDispatch();
    
    const subProjects = useSelector(mapSubProjectSelectors.getSubProjectsSelector);

    useEffect(() => {
        dispatch(mapSubProjectActions.getSubProjectsStart())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        // <div className="MapDashboard">
        //     <Spin spinning={subProjects.length === 0} tip="Loading data...">
        //         <BaseMap position={[-5.856, 34.074]}>
        //             <SideNav 
        //             procuringEntity={subProjects.length > 0 ? subProjects[0].procuring_entity: null}
        //             project={subProjects.length > 0 ? subProjects[0].project: null}
        //             history={props.history}
        //              />
        //             <SubProjectPoints subProjects={subProjects} />
        //         </BaseMap>
        //     </Spin>
        // </div>
        <h1>Work In progress</h1>
    );
}

export default SubProjectsMap;




