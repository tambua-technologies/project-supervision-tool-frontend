import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import  { toWgs84 } from 'reproject';
import epsg from 'epsg';
import BaseMap from "./components/BaseMap";
import "./styles.css";
import SubProjectPoints from './components/SubProjectPoints';
import API from '../../API';

function SubProjectsMap(props) {
    const [subProjects, setSubProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const {match: { params: {procuringEntityId}}} = props;

    useEffect(() => {
        setLoading(true);
        // const filter = {
        //     'filter[procuring_entity_id]': procuringEntityId
        // };
        // API.get('sub_projects_locations',filter)
        //         .then(res => {
        //             setSubProjects(res);
        //             setLoading(false);
        //         })
        // eslint-disable-next-line react-hooks/exhaustive-deps
        API.getWfsLayerData('geonode:DMDP_Constructed_Roads', 'geonode:DMDP_Constructed_Drains')
            .then(data => {
                const reprojectedFeatures = toWgs84(data, undefined, epsg);
                const subProjects = reprojectedFeatures.features.map(feature => {
                    return {
                        id: feature.id,
                        datasetType: feature.properties.Road_Name ? 'road' : 'drain',
                        name: feature.properties.Road_Name || feature.properties.Name,
                        geo_json: feature,
                    }
                });
                setSubProjects(subProjects);
                setLoading(false);
            }
            )
            .catch(err => {
                console.log(err);
                setLoading(false);
            }
            );
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




