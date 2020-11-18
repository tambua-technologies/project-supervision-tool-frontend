import React from 'react';
import './styles.css'

const styles = {
    color: '#2d98d4',
    backgroundColor: '#ffffff'
}

function SideNavItem({title, activeThumbnail, inactiveThumbnail, itemId, activeItem, setActiveItem}) {
    const handleClick = () => setActiveItem(itemId);
    const isActive = itemId === activeItem

    return (
        <div className='SideNavItem' style={isActive ? styles : {}} onClick={handleClick}>
            <img src={isActive ? activeThumbnail : inactiveThumbnail } width={50}/>
            <div className="side-nav-item-title">{title}</div>
        </div>
    );
}

export default SideNavItem;
