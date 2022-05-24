import React from 'react';
import './styles.css'

const styles = {
    color: '#fff',
    backgroundColor: '#324850',
    borderRight: '1px solid #dcd9d954',

}

function SideNavItem({
    title,
    activeThumbnail,
    inactiveThumbnail,
    itemId,
    activeItem,
    setActiveItem,
}) {

    const handleClick = () => {
        return setActiveItem(itemId);
    }
    const isActive = itemId === activeItem

    return (
        <div className='SideNavItem' style={isActive ? styles : {}} onClick={handleClick}   >
            <img src={isActive ? activeThumbnail : inactiveThumbnail} width={50} alt='logo' />
            <div className="side-nav-item-title">{title}</div>
        </div>
    );
}

export default SideNavItem;
