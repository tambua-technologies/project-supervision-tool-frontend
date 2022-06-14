import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import BaseMap from "./components/BaseMap";
import { useDispatch } from 'react-redux';
import SideNav from './components/SideNav'
import "./styles.css";
import SubProjectPoints from './components/SubProjectPoints';
import API from '../../API';

function SubProjectsMap(props) {
    const [subProjects, setSubProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState(null);
    

    useEffect(() => {
        Promise.all([
            API.get('sub_projects_locations')
                .then(res => {
                    setSubProjects(res);
                }),
            API.get('projects/1')
                .then(res => {
                    setProject(res);
                })
        ])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="MapDashboard">
            <Spin spinning={subProjects.length === 0} tip="Loading data...">
                <BaseMap position={[-5.856, 34.074]}>
                    <SubProjectPoints subProjects={subProjects} />
                </BaseMap>
            </Spin>
        </div>
   
    );
}

export default SubProjectsMap;




