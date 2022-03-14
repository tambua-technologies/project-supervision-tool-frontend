import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import SideNavItem from "./components/SideNavItem";
import NavItemDetails from "./components/NavItemDetails";
import {mapActions, mapSelectors} from "../../../../redux/modules/map";
import {bindActionCreators} from "redux";
import {Link} from 'react-router-dom';
import projectsIcon from '../../../../assets/icons/projects-white.svg';
import homeIcon from '../../../../assets/icons/home-white.svg';
import {Drawer} from 'antd';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import UserMenu from '../../../navigation/UserMenu';
import './styles.css';

function SideNav({setActiveMapSideMenuItem, activeItem}) {

    const [showSideNav, setShowSideNav] = useState(false);
    const ref = React.createRef();

    /**
     * @function
     * @name handleClearCachedValues
     * @description open drawer
     *
     * @version 0.1.0
     * @since 0.1.0
     */
    const handleShowSideNav = () => {
        if (activeItem === null) setActiveMapSideMenuItem('projects');
        setShowSideNav(true);
    };

    /**
     * @function
     * @name handleClearCachedValues
     * @description close drawer
     *
     * @version 0.1.0
     * @since 0.1.0
     */
    const handleCloseSideNav = () => setShowSideNav(false);

    return (
        <section>
            <div className="openDrawer">
                <MenuUnfoldOutlined onClick={handleShowSideNav} style={{fontSize: '150%', padding: '12px 16px'}}/>
            </div>

            <div ref={ref}/>

            <Drawer
                placement="left"
                mask={false}
                onClose={handleCloseSideNav}
                visible={showSideNav}
                className="mapSideNav"
                getContainer={ref.current}
                width={450}
            >
                <div className='SideNav'>
                    <div className='nav-items-list'>
                        <Link to='/app' className="SideNavItem">
                            <SideNavItem
                                activeThumbnail={homeIcon}
                                inactiveThumbnail={homeIcon}
                                itemId='projects'
                                activeItem='home'
                                setActiveItem={setActiveMapSideMenuItem}
                            />
                        </Link>

                        <SideNavItem
                            title="Projects"
                            activeThumbnail={projectsIcon}
                            inactiveThumbnail={projectsIcon}
                            itemId='projects'
                            activeItem={activeItem}
                            setActiveItem={setActiveMapSideMenuItem}
                        />
                        <UserMenu/>
                    </div>
                    <NavItemDetails activeItem={activeItem}/>
                </div>
            </Drawer>
        </section>
    );
}


const mapStateToProps = (state) => ({
    activeItem: mapSelectors.getActiveMapSideMenuItem(state)
});

const mapDispatchToProps = (dispatch) => ({
    setActiveMapSideMenuItem: bindActionCreators(mapActions.setActiveMapSideMenuItem, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);

SideNav.propTypes = {
    setActiveMapSideMenuItem: PropTypes.func,
    activeItem: PropTypes.string.isRequired,
}

SideNav.defaultProps = {
    setActiveMapSideMenuItem: () => {
    },
    regionProjects: [],
}

