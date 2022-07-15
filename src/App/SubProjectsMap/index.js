import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import BaseMap from "./components/BaseMap";
import "./styles.css";
import SubProjectPoints from './components/SubProjectPoints';
import API from '../../API';

function SubProjectsMap() {
    const [subProjects, setSubProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        setLoading(true);
        API.get('sub_projects_locations')
                .then(res => {
                    setSubProjects(res);
                    setLoading(false);
                })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="MapDashboard">
            <Spin spinning={loading} tip="Loading data...">
                <BaseMap position={[-6.8764, 39.3022]} zoom={13}>
                    <SubProjectPoints subProjects={subProjects} />
                </BaseMap>
            </Spin>
        </div>
   
    );
}

export default SubProjectsMap;




