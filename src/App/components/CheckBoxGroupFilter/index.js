import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import './styles.css';


/**
 * @function
 * @name CheckBoxGroupFilter
 * @description renders checkbox filters
 */
function CheckBoxGroupFilter({ handleFilter, itemsPerPage, items, filterClass, handleOnClickFilterValue }) {
    const [itemsToShow, setItemsToShow] = useState([]);
    const [next, setNext] = useState(itemsPerPage);

    const loopWithSlice = (start, end) => {
        const slicedItems = items.slice(start, end);
        setItemsToShow(slicedItems);
    };


    const renderFilterItems = items => items.map(({ title, value, id, total_count }, i) => {
        return (
            <div className={filterClass}>
                <div><Checkbox onClick={() => handleFilter(id)} title={title} key={i} /> <span onClick={() => handleOnClickFilterValue(id)} className="checkboxItem" title={value}>{value}</span> </div>
                <span>{total_count}</span>
            </div>
        )
    });

    const showLoadMore = (slicedItems, totalItems) => slicedItems.length === totalItems.length;

    useEffect(() => {
        loopWithSlice(0, itemsPerPage);
    }, [items]);  // eslint-disable-line react-hooks/exhaustive-deps

    const handleShowMoreItems = () => {
        loopWithSlice(0, next + itemsPerPage);
        setNext(next + itemsPerPage);
    };

    return items.length > 0 ? (
        <div className='CheckBoxGroupFilter'>
            <section className="CheckBoxFilter">
                {renderFilterItems(itemsToShow)}
                {showLoadMore(itemsToShow, items) ? '' :
                 <span className="LoadMore" onClick={handleShowMoreItems}>Load more</span>}
            </section>
        </div>
    ) : '';

}

export default CheckBoxGroupFilter;

CheckBoxGroupFilter.propTypes = {
    config: PropTypes.shape({ filterRightTitle: PropTypes.string, filterLeftTitle: PropTypes.string }),
    items: PropTypes.array.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    filterTitle: PropTypes.string.isRequired,
    filterClass: PropTypes.string,
    handleFilter: PropTypes.func.isRequired,
    handleOnClickFilterValue: PropTypes.func,
}

CheckBoxGroupFilter.defaultProps = {
    handleFilter: () => {
    },
    config: null,
    filterClass: '',
    handleOnClickFilterValue: () => { },
}
