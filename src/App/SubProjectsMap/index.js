import React, { useEffect } from 'react';
import { Spin } from 'antd';
import BaseMap from "./components/BaseMap";
import { useDispatch, useSelector } from 'react-redux';
import SideNav from './components/SideNav'
import { mapSubProjectActions, mapSubProjectSelectors } from "../../redux/modules/map/subProjects";
import "./styles.css";
import SubProjectPoints from './components/SubProjectPoints';

function SubProjectsMap() {
    const dispatch = useDispatch();
    const subProjects = useSelector(mapSubProjectSelectors.getSubProjectsSelector);

    useEffect(() => {
        dispatch(mapSubProjectActions.getSubProjectsStart())

    }, []);

    return (
        <div className="MapDashboard">
            <Spin spinning={subProjects.length === 0} tip="Loading data...">
                <BaseMap position={[-5.856, 34.074]}>
                    <SideNav />
                    <SubProjectPoints subProjects={subProjects}/>
                </BaseMap>
            </Spin>
        </div>
    );
}

export default SubProjectsMap;




