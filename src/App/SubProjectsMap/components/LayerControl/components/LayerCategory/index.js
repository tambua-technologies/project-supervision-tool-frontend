import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {Collapse} from 'antd';
import './styles.css';
import API from "../../../../../../API";
import LayerItem from "./componets/LayerItem";
import DecimalStep from "../../../../../components/DecimalStep";

const { Panel } = Collapse;

function PanelContents ({ layer, changeOpacity}) {

    const handleOnStepChange = (value) =>  changeOpacity(value, layer);

    return <DecimalStep onStepChange={handleOnStepChange}/>
}

function LayerCategory({category, changeOpacity}) {

    const [layers, setLayers] = useState([]);

    useEffect(() => {
        API.getLayers({category: category.id, offset: 0})
            .then(({objects}) => setLayers(objects));
    }, [category.id]);


    return (
            <Collapse bordered={false} expandIconPosition='right' ghost>
                {
                    layers.map(layer => (
                            <Panel
                                key={layer.id}
                                header={<LayerItem layer={layer}/>}
                                className="LayerCategories"
                            >
                                <PanelContents layer={layer} changeOpacity={changeOpacity} />
                            </Panel>
                        )
                    )
                }
            </Collapse>
    )

}


export default LayerCategory;

LayerCategory.propTypes = {
    category: PropTypes.object.isRequired,
    changeOpacity: PropTypes.func.isRequired,
}
