import React, {useEffect, useRef, useState} from 'react';
import { connect } from 'react-redux';
import WMSCapabilities from 'wms-capabilities';
import LayerControlIcon from '../../../../assets/icons/geo-node-layers.svg';
import {Collapse, Drawer, Spin} from "antd";
import L from 'leaflet';
import {CloseOutlined} from '@ant-design/icons';
import TopSection from "../SideNav/components/NavItemDetails/components/TopSection";
import CustomSearch from "../SideNav/components/NavItemDetails/components/CustomSearch";
import LayerCategory from "./components/LayerCategory";
import API from "../../../../API";
import {useMap} from "react-leaflet";
import PropTypes from "prop-types";
import {mapDataSetsActions, mapDataSetsSelectors} from "../../../../redux/modules/map/dataSets";
import {bindActionCreators} from "redux";
import './styles.css';

const {Panel} = Collapse;


const LayerControl = ({ addedDataSet, removedDataSet, removeDataLayer, addDataLayer }) => {
    const [mapLayers, setMapLayers] = useState({});
    const [showSideNav, setShowSideNav] = useState(false);
    const [capabilities, setCapabilities] = useState({});
    const [layerCategories, setLayerCategories] = useState([]);
    const ref = useRef();
    const map = useMap();
    useEffect(() => {

        API.getCapabilities()
            .then( res => setCapabilities(new WMSCapabilities().parse(res)));

        API.getLayersCategories()
            .then(({objects}) => {
                const data = objects.filter(({count}) => count > 0);
                setLayerCategories(data);
            });

        return () => {
            removeDataLayer(null);
            addDataLayer(null);
        }

    }, []);  // eslint-disable-line react-hooks/exhaustive-deps


    const changeOpacity = (value, layer) => mapLayers[layer.typename]?.setOpacity(value);

    const addDataSet = (dataSet) => {
        const myLayer = capabilities.Capability.Layer.Layer.find(l => l.Name === dataSet.typename );
        const {LatLonBoundingBox} = myLayer;
        console.log(myLayer);

        const geonodeLayer = L.tileLayer.wms("https://geonode.project-supervision-tool.ga/geoserver/ows", {
            layers: dataSet.typename,
            format: 'image/png',
            transparent: true,
        });

        mapLayers[dataSet.typename] = geonodeLayer;
        setMapLayers(mapLayers);
        map.addLayer(geonodeLayer);
        const corner1 = L.latLng(LatLonBoundingBox[1],LatLonBoundingBox[0]);
        const corner2 = L.latLng(LatLonBoundingBox[3],LatLonBoundingBox[2]);
        const bounds = L.latLngBounds(corner1, corner2);
        map.fitBounds(bounds);
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
            <img
                src={LayerControlIcon}
                alt='layers control'
                className='geonode-layers-control leaflet-touch leaflet-bar'
                onClick={() => setShowSideNav(true)}
            />
            <Drawer
                mask={false}
                onClose={() => setShowSideNav(false)}
                visible={showSideNav}
                className="mapSideNav"
                getContainer={false}
                width={450}
                closeIcon={<CloseOutlined/>}
                style={{position: 'absolute'}}
            >
                <Spin spinning={false}>
                    <div className='DataSetsMenuItemDetails'>
                        <TopSection searchPlaceHolder="Search Data " title={`MAP LAYERS`}/>
                        <hr/>
                        <div className="data-set-search">
                            <CustomSearch placeholder='Search map layers'/>
                        </div>
                        {
                            layerCategories.length > 0 ?
                                <Collapse defaultActiveKey={[layerCategories[0].id]} style={{height: '100%', overflowY: 'auto'}}>
                                    {
                                        layerCategories.map((category) =>
                                            <Panel header={`${category.gn_description} (${category.count})`} key={category.id} >
                                                <LayerCategory category={category} changeOpacity={changeOpacity}/>
                                            </Panel>
                                        )
                                    }
                                </Collapse> : ''
                        }
                        <div className="dataset-load_more">
                            <p>Load More</p>
                            <a href='https://geonode.project-supervision-tool.ga/' target="_blank"
                               rel='noopener noreferrer'>
                                <p>Open Geonode</p>
                            </a>
                        </div>
                    </div>
                </Spin>
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
