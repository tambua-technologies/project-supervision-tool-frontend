import React from 'react';
import './styles.css'

function SideNavItem({
    title,
    activeThumbnail
}) {

    const handleClick = () => {}

    return (
        <div className='SideNavItem' onClick={handleClick}   >
            <img src={activeThumbnail } width={50} alt='logo' />
            <div className="side-nav-item-title">{title}</div>
        </div>
    );
}

export default SideNavItem;
