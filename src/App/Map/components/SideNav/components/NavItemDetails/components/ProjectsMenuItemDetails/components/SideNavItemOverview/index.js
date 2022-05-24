import React from "react";
import PropTypes from 'prop-types';
import OverviewTable from "../OverviewTable";
import { Spin } from 'antd';
import './styles.css';

/**
 * @function
 * @name SideNavItemOverview
 * @description renders project overview at national level
 */

function SideNavItemOverview({
    overViewData,
    loadingStatistics,
    showRegionalOverviewLoader,
}) {

    return (
        <div className='SideNavItemOverview'>


            { showRegionalOverviewLoader ? <section className='project-over-view-table'>
                {showRegionalOverviewLoader === true ? <Spin spinning={showRegionalOverviewLoader} style={{ paddingLeft: 125 }} /> : <OverviewTable data={overViewData} />}
            </section> : <section className='project-over-view-table'>
                    {loadingStatistics === true ? <Spin spinning={loadingStatistics} style={{ paddingLeft: 125 }} /> : <OverviewTable data={overViewData} />}
                </section>}
        </div>
    );

}

export default SideNavItemOverview;

SideNavItemOverview.propTypes = {
    overViewData: PropTypes.array.isRequired,
    title: PropTypes.string,
    goBack: PropTypes.func,
    handleOnclickFilterItem: PropTypes.func,
    loadingStatistics: PropTypes.bool,
}

SideNavItemOverview.defaultProps = {
    goBack: null,
    title: '',
    handleOnclickFilterItem: () => { },
}
