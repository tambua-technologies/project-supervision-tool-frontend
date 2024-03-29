import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import WMSCapabilities from 'wms-capabilities';
import LayerControlIcon from '../../../../assets/icons/geo-node-layers.svg';
import { Collapse, Drawer, Spin } from "antd";
import L from 'leaflet';
import { CloseOutlined } from '@ant-design/icons';
import LayerCategory from "./components/LayerCategory";
import API from "../../../../API";
import { useMap } from "react-leaflet";
import PropTypes from "prop-types";
import { mapDataSetsActions, mapDataSetsSelectors } from "../../../../redux/modules/map/dataSets";
import { bindActionCreators } from "redux";
import './styles.css';
import { stringToGeoJson, getRandomPointFromGeojson } from '../../../../Util';

const { Panel } = Collapse;

// utilities
const getWMSUrl = links => links.find(({link_type}) => link_type === 'OGC:WMS').url;
const getGeonodeLayerId = layer => layer.typename || layer.alternate;
const fieldNotesKobotoolboxFormId = process.env.REACT_APP_FIELD_NOTES_FORM_ID;


const DataSets = ({ layerCategories, changeOpacity }) => {

    return (

        <div className='DataSetsMenuItemDetails'>
            {
                layerCategories.length > 0 ?
                    <Collapse defaultActiveKey={[layerCategories[0].id, layerCategories[1].id]} style={{ height: '100%', overflowY: 'auto' }}>
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
    const [layerCategories, setLayerCategories] = useState([]);
    const ref = useRef();
    const drawerMuout = useRef();
    const map = useMap();
    useEffect(() => {
        API.getLayersCategories()
            .then(({ objects }) => {
                const data = objects.filter(({ count }) => count > 0);
                const withFieldNotes = [
                    {
                        gn_description: 'Field Notes',
                        id: 'field_notes',
                        isNotGeonodeCategory: true,
                        layers: [{ name: 'Field Notes', typename: 'temeke_field_notes', id: 'temeke_field_notes', isNotGeonodeLayer: true }]
                    },
                    {
                        gn_description: 'OHS and Safeguards',
                        id: 'safeguard_concerns',
                        isNotGeonodeCategory: true,
                        layers: [{ name: 'OHS and Safeguards', typename: 'temeke_safeguard_concerns', id: 'temeke_safeguard_concerns', isNotGeonodeLayer: true }]
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
        const layerId = getGeonodeLayerId(layer);
        try {
            return mapLayers[layerId]?.setOpacity(value);
        }
        catch (e) {

            return mapLayers[layerId]?.setStyle({ opacity: value, fillOpacity: value });

        }

    };

    const getFieldNoteImageUrl = (attachments, name) => {
        const nameWithRemovedSpaces = name.replace(/\s/g, "_");
        const {download_small_url = ''} = attachments.find((attachment) => attachment.filename.includes(nameWithRemovedSpaces)) || {};
      
        return download_small_url.replace('?format=json', '');
      
      };

    const getPoints = async (id) => {
        if(id === 'temeke_field_notes'){
        return API.getAssetData(fieldNotesKobotoolboxFormId)
            .then(({ results }) => {
                return results.map(({ package: pkg, subProject, notes, _attachments }) =>
                    notes.map(note => ({ packageName: pkg, subProject,imageUrl: getFieldNoteImageUrl(_attachments, note['notes/photo']), ...note, geoJSON: stringToGeoJson(note['notes/location'], 'geopoint') })))
                    .flat().map((data) => {
                        const { geoJSON, ...rest } = data;
                        geoJSON.properties = {...rest, dataType: 'field_note'};
                        return geoJSON;
                    });
            })
        }
        if(id === 'temeke_safeguard_concerns') {
            return API.get('safeguard_concerns')
            .then(({data}) => {
                return data.map((safeguard_concern) => {
                    const {sub_project, ...restOfSafeguardConcern} = safeguard_concern;
                    const {geo_json, ...rest} = sub_project;
                    const geoJSON =getRandomPointFromGeojson(geo_json);
            
                    geoJSON.properties = {sub_project: {...rest}, ...restOfSafeguardConcern, dataType: 'safeguard_concern'};
                    return geoJSON;
                });
            })
        }


    }

    

    const addDataSet = async (dataSet) => {

        let dataSetLayer;
        const layerId = getGeonodeLayerId(dataSet);
        if (dataSet.isNotGeonodeLayer) {
            const points = await getPoints(dataSet.id);
            dataSetLayer = L.geoJSON(points, {
                pointToLayer: (feature, latlng) => {
                    if(feature.properties.dataType === 'field_note') return L.circleMarker(latlng, {
                    radius: 7,
                    fillColor: '#FFD700',
                    color: '#000',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                })

                if(feature.properties.dataType === 'safeguard_concern')
                {
                    const icon = L.icon({
                        iconUrl: '/safeguard-concern-marker-icon.svg',
                        iconSize: [15, 45],
                        iconAnchor: [9, 33],
                    });
                    return L.marker(latlng, {icon});
                } 
                
            
            },
                onEachFeature: (feature, layer) => {
                    if(feature.properties.dataType === 'field_note'){
                        layer.bindPopup(`<div class='popup-content'>
                        <div class='popup-content-header'>
                            <div class='popup-content-header-subtitle'> <b>${feature.properties.subProject} </b></div>
                        </div>
                        <div class='popup-content-body'>
                        <div class='popup-content-body-text'><b>Notes</b>: ${feature.properties['notes/description']}</div>
                        <img src='${feature.properties.imageUrl}' alt='field image' class='popup-content-body-image'/>
                        </div>
                    </div>`);
                    }

                    if(feature.properties.dataType === 'safeguard_concern'){
                        
                        layer.bindPopup(`<div class='popup-content'>
                        <div class='popup-content-header'>
                            <div class='popup-content-header-subtitle'> <b>${feature.properties.sub_project.name} </b> </div>
                        </div>
                        <div class='popup-content-body'>
                        <div class='popup-content-body-text'><b>Concern Type</b>: ${feature.properties.concern_type}</div>
                        <div class='popup-content-body-text'><b>Issue</b>: ${feature.properties.issue}</div>
                        </div>
                    </div>`);
                    }
                }
            });

        }
        else {
            const url = getWMSUrl(dataSet.links);
            const layerId = getGeonodeLayerId(dataSet);
            dataSetLayer = L.tileLayer.wms(url, {
                layers: layerId,
                format: 'image/png',
                transparent: true,
            });
        }

        
        mapLayers[layerId] = dataSetLayer;
        setMapLayers(mapLayers);
        map.addLayer(dataSetLayer);
    }


    const removeDataSet = (dataSet) => {
        const layerId = getGeonodeLayerId(dataSet);
        map.removeLayer(mapLayers[layerId]);
        delete mapLayers[layerId] // delete property of removed layer
        setMapLayers(mapLayers);
    }


    useEffect(() => {
        if (addedDataSet) addDataSet(addedDataSet);
    }, [addedDataSet]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (removedDataSet) removeDataSet(removedDataSet);
    }, [removedDataSet]); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div ref={ref} onMouseOver={() => map.dragging.disable()} onMouseOut={() => map.dragging.enable()}>
            <div ref={drawerMuout} />
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
                closeIcon={<CloseOutlined />}
                style={{ position: 'absolute', zIndex: '1200' }}
            >
                <DataSets layerCategories={layerCategories} changeOpacity={changeOpacity} />
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
