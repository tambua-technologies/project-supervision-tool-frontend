import React from "react";
import PropTypes from 'prop-types';
import './styles.css';

/**
 * @function
 * @name PredefinedFilter
 * @description renders filter predefined already with list of options
 */
function PredefinedFilter({data, config, handleOnclickFilterItem, filterTitle }) {

    const renderFilterHeader = (info) => (
        <article className='filter-header'>
            <div>{info?.filterRightTitle}</div>
            {/* <div>{info?.filterLeftTitle}</div> */}
        </article>
    );


    const renderFilterItems = items => items.map(({title, value, id}, i) => (
        <li key={i}>
            <article className='filter-item' onClick={() => handleOnclickFilterItem(id)}>
                <div className='filter-item-title' title={title}>{title}</div>
                <div className='filter-item-value' title={value}>{value}</div>
            </article>
        </li>
    ));

    return (
        <div className='PredefinedFilter'>
            <div className='predefined-filter-title'>{filterTitle}</div>
            <hr/>
            <section>
                {config ? renderFilterHeader(config) : ''}
                <ol className='filter-list'>
                    {renderFilterItems(data)}
                </ol>
            </section>
        </div>
    );

}

export default PredefinedFilter;

PredefinedFilter.propTypes = {
    data: PropTypes.array.isRequired,
    config: PropTypes.shape({filterRightTitle: PropTypes.string, filterLeftTitle: PropTypes.string }),
    filterTitle: PropTypes.string.isRequired,
    handleOnclickFilterItem: PropTypes.func,
}

PredefinedFilter.defaultProps = {
    handleOnclickFilterItem: () => {},
    config: null,
}
