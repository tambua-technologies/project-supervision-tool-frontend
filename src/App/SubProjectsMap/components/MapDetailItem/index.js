import React from "react";

function MapDetailItem({item}) {
    return (<div><span>{item?.description || item?.title} </span>
        <span>{item.location.level === 'district' ? `${item.location.district.name} district` : `${item.location.region.name} region`}</span>
    </div>)
}

export default MapDetailItem;
