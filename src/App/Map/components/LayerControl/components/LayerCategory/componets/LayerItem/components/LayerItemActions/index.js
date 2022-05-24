import React, {useState} from "react";
import { connect} from 'react-redux';
import {CloseOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";
import './styles.css';
import {bindActionCreators} from "redux";
import {mapDataSetsActions} from "../../../../../../../../../../redux/modules/map/dataSets";

function LayerItemActions({remove, add, layer}) {
    const [close, setClose] = useState(false);

    return (
        <div className='LayerItemActions'>
            <div
                className='add'
                title='Add layer on map'
                style={{'display': close ? 'none' : 'block'}}
                onClick={() => {
                    setClose(true);
                    add(layer)
                    remove(null)
                }}
            >
                Add
            </div>
            <div
                className='close'
                style={{'display': close ? 'block' : 'none'}}
                onClick={() => {
                    setClose(false);
                    remove(layer)
                    add(null)
                }}
            >
                <CloseOutlined/>
            </div>

        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    add: bindActionCreators(mapDataSetsActions.setSelectedLayer, dispatch),
    remove: bindActionCreators(mapDataSetsActions.removeSelectedLayer, dispatch),
});


export default connect(null, mapDispatchToProps)(LayerItemActions);

LayerItemActions.propTypes = {
    layer: PropTypes.object.isRequired,
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
}
