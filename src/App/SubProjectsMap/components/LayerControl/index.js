import React, {useEffect, useRef, useState} from 'react';
import { connect } from 'react-redux';
import WMSCapabilities from 'wms-capabilities';
import LayerControlIcon from '../../../../assets/icons/geo-node-layers.svg';
import {Collapse, Drawer, Spin} from "antd";
import L from 'leaflet';
import {CloseOutlined} from '@ant-design/icons';
import LayerCategory from "./components/LayerCategory";
import API from "../../../../API";
import {useMap} from "react-leaflet";
import PropTypes from "prop-types";
import {mapDataSetsActions, mapDataSetsSelectors} from "../../../../redux/modules/map/dataSets";
import {bindActionCreators} from "redux";
import './styles.css';
import { stringToGeoJson } from '../../../../Util';

const {Panel} = Collapse;


const DataSets = ({layerCategories, changeOpacity}) => {

    return (
       
        <div className='DataSetsMenuItemDetails'>
            {
                layerCategories.length > 0 ?
                    <Collapse defaultActiveKey={[layerCategories[0].id]} style={{ height: '100%', overflowY: 'auto' }}>
                        {
                            layerCategories.map((category) =>
                                <Panel header={`${category.gn_description}`} key={category.id} >
                                    <LayerCategory isNotGeonodeCategory={category.isNotGeonodeCategory} category={category} changeOpacity={changeOpacity} />
                                </Panel>
                            )
                        }
                    </Collapse> : ''
            }
        </div>  
    );
}


const LayerControl = ({ addedDataSet, removedDataSet, removeDataLayer, addDataLayer }) => {
    const [mapLayers, setMapLayers] = useState({});
    const [showSideNav, setShowSideNav] = useState(false);
    const [capabilities, setCapabilities] = useState({});
    const [layerCategories, setLayerCategories] = useState([]);
    const ref = useRef();
    const drawerMuout = useRef();
    const map = useMap();
    useEffect(() => {

        API.getCapabilities()
            .then( res => setCapabilities(new WMSCapabilities().parse(res)));

        API.getLayersCategories()
            .then(({objects}) => {
                const data = objects.filter(({count}) => count > 0);
                const withFieldNotes = [
                    {
                    gn_description: 'Field Notes',
                     id: 'field_notes',
                     isNotGeonodeCategory: true,
                     layers: [{name: 'Kinondoni Field Notes',typename: 'kinondoni_field_notes', id:'kinondoni_field_notes', isNotGeonodeLayer: true}]
                    },
                      ...data
                    ];
                setLayerCategories(withFieldNotes);
            });

        return () => {
            removeDataLayer(null);
            addDataLayer(null);
        }

    }, []);  // eslint-disable-line react-hooks/exhaustive-deps


    const changeOpacity = (value, layer) => {
        try {
            return mapLayers[layer.typename]?.setOpacity(value);
        }
        catch(e) {
            
            return mapLayers[layer.typename]?.setStyle({opacity: value, fillOpacity: value});

        }
       
    };

    const getPoints = async () => {
        return API.getAssetData('aLD6RspTPyijYdA63icUZ4')
        .then(({results}) => {
            return results.map(({package: pkg, subProject, notes}) => 
        notes.map(note => ({packageName: pkg, subProject, ...note, geoJSON: stringToGeoJson(note['notes/location'], 'geopoint')})))
        .flat().map(({geoJSON}) => geoJSON);
        })

        
    }
            

    const addDataSet = async (dataSet) => {

        let dataSetLayer;
        if (dataSet.isNotGeonodeLayer) {
            const points =  await getPoints(dataSet.id);
            dataSetLayer = L.geoJSON(points, {
                pointToLayer: (feature, latlng) => L.circleMarker(latlng, {
                    radius: 5,
                    fillColor: '#ff0000',
                    color: '#000',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                }),
                onEachFeature: (feature, layer) => {
                    layer.bindPopup(`<div>Field note</div>`);
                }
            });

        }
        else {
            dataSetLayer = L.tileLayer.wms(`${process.env.REACT_APP_GEONODE_URL}/geoserver/ows`, {
                layers: dataSet.typename,
                format: 'image/png',
                transparent: true,
            });
        }

        mapLayers[dataSet.typename] = dataSetLayer;
        setMapLayers(mapLayers);
        map.addLayer(dataSetLayer);
    }


    const removeDataSet = (dataSet) => {
        map.removeLayer(mapLayers[dataSet.typename]);
        delete mapLayers[dataSet.typename] // delete property of removed layer
        setMapLayers(mapLayers);
    }


    useEffect(() => {
        if(addedDataSet) addDataSet(addedDataSet);
    }, [addedDataSet]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(removedDataSet) removeDataSet(removedDataSet);
    }, [removedDataSet]); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div ref={ref} onMouseOver={() => map.dragging.disable()} onMouseOut={() => map.dragging.enable()}>
            <div ref={drawerMuout}/>
            <img
                src={LayerControlIcon}
                alt='layers control'
                className='geonode-layers-control leaflet-touch leaflet-bar'
                onClick={() => setShowSideNav(true)}
            />
            <Drawer
                title='Data Sets'
                mask={false}
                onClose={() => setShowSideNav(false)}
                visible={showSideNav}
                className="map-drawer"
                getContainer={drawerMuout.current}
                width={450}
                closeIcon={<CloseOutlined/>}
                style={{position: 'absolute', zIndex: '1200'}}
            >
                <DataSets layerCategories={layerCategories} changeOpacity={changeOpacity}/>
            </Drawer>
        </div>
    );
}


const mapStateToProps = (state) => ({
    addedDataSet: mapDataSetsSelectors.getAddedDataSetSelector(state),
    removedDataSet: mapDataSetsSelectors.getRemovedDataSetSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
    removeDataLayer: bindActionCreators(mapDataSetsActions.removeSelectedLayer, dispatch),
    addDataLayer: bindActionCreators(mapDataSetsActions.setSelectedLayer, dispatch),
});



export default connect(mapStateToProps, mapDispatchToProps)(LayerControl);

LayerControl.propTypes = {
    addedDataSet: PropTypes.object,
    removedDataSet: PropTypes.object,
    addDataLayer: PropTypes.func.isRequired,
    removeDataLayer: PropTypes.func.isRequired,
}

LayerControl.defaultProps = {
    addedDataSet: null,
    removedDataSet: null,
}
