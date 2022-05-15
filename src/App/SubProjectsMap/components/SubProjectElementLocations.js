import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Marker, Popup, withLeaflet} from "react-leaflet";
import L from "leaflet";
import { Button } from 'antd';
import Spiderfy from "./Spiderfy";

/**
 * @class
 * @name SubProjectLocations
 * @description component that renders sub project element on map
 */
class SubProjectElementLocations extends Component {

    static propTypes = {
        subProjectElement: PropTypes.object,
        getWfsLayerData: PropTypes.func.isRequired
    }

    static defaultProps = {
        subProjectElement: null,
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (((prevProps.subProjectElement !== this.props.subProjectElement) && this.props.subProjectElement)) {
            const {map} = this.props.leaflet;
            map.setView(L.latLng(-6.161184, 35.745426), 6);
        }
    }

    handleShowLayer = layer_name => {
        this.props.getWfsLayerData(layer_name);
    }

    renderSubProjectElements = ({ locations, name }) => {
        return locations.map(({point, id, layer_name }) => (
            <Marker position={[point.coordinates[1], point.coordinates[0]]} key={id}>
                <Popup>
                    <h3>Sub Project Element</h3>
                    <div> { name }</div>
                    <Button type="primary" onClick={() => this.handleShowLayer(layer_name)}>Show Layer</Button>
                </Popup>
            </Marker>
        ));
    }

    render() {
        const {subProjectElement} = this.props;
        return subProjectElement ? (
            <>
                <Spiderfy>
                    {this.renderSubProjectElements(subProjectElement)}
                </Spiderfy>
            </>
        ) : '';
    }
}

export default withLeaflet(SubProjectElementLocations);
