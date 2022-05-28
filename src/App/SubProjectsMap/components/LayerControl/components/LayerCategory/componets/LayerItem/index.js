import {Popover} from "antd";
import { InfoCircleTwoTone} from "@ant-design/icons";
import React, {useRef} from "react";
import LayerItemActions from "./components/LayerItemActions";
import LayerItemDetails from "./LayerItemDetails";

function LayerItem ({ layer}) {

    const ref = useRef();
    return (
        <div className='DataSet' ref={ref}>
            <Popover
                className='data-set-info'
                content={<LayerItemDetails layer={layer}/>}
                title={<b>Data Set Details</b>}
                getPopupContainer={() => ref.current}
                placement="top"
            >
                <InfoCircleTwoTone twoToneColor="#0f6788"/>
            </Popover>
            <div className='data-set-name-source'>
                <div title={layer.name}>{layer.name}</div>
            </div>
            <LayerItemActions layer={layer} />
        </div>
    );
}

export default LayerItem;
