import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import BaseMap from "./components/BaseMap";
import "./styles.css";
import SubProjectPoints from './components/SubProjectPoints';
import API from '../../API';

function SubProjectsMap() {
    const [subProjects, setSubProjects] = useState([]);
    

    useEffect(() => {
        API.get('sub_projects_locations')
                .then(res => {
                    setSubProjects(res);
                })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="MapDashboard">
            <Spin spinning={subProjects.length === 0} tip="Loading data...">
                <BaseMap position={[-6.8716, 39.2655]} zoom={13}>
                    <SubProjectPoints subProjects={subProjects} />
                </BaseMap>
            </Spin>
        </div>
   
    );
}

export default SubProjectsMap;




