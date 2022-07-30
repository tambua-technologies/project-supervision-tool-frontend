import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import BaseMap from "./components/BaseMap";
import "./styles.css";
import SubProjectPoints from './components/SubProjectPoints';
import API from '../../API';

function SubProjectsMap(props) {
    const [subProjects, setSubProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const {match: { params: {procuringEntityId}}} = props;

    console.log("SubProjectsMap props: ", props);
    

    useEffect(() => {
        console.log("useEffect");
        setLoading(true);
        const filter = {
            'filter[procuring_entity_id]': procuringEntityId
        };
        API.get('sub_projects_locations',filter)
                .then(res => {
                    setSubProjects(res);
                    setLoading(false);
                })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="MapDashboard">
            <Spin spinning={loading} tip="Loading data...">
                <BaseMap position={[-6.8153, 39.2796]} zoom={12}>
                    <SubProjectPoints subProjects={subProjects} />
                </BaseMap>
            </Spin>
        </div>
   
    );
}

export default SubProjectsMap;




