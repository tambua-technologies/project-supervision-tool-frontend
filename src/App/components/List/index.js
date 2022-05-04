import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import map from 'lodash/map';
import remove from 'lodash/remove';
import Toolbar from '../Toolbar';
import ListHeader from '../ListHeader';
import './styles.css';

/**
 * @function
 * @name CustomList
 * @description List UI with tool bar , list header and list items
 * @param {object} props CustomList props
 * @param {string} props.itemName item name
 * @param {object[]} props.items list of items
 * @param {number} props.page list page
 * @param {boolean} props.loading list loading flag
 * @param {number} props.itemCount list item count
 * @param {object} props.headerLayout list header layout
 * @param {Function} props.onPaginate list paginate callback
 * @param {Function} props.onRefresh list refresh callback
 * @param {Function} props.generateExportUrl list export url callback
 * @param {Function} props.renderListItem list item render callback
 * @returns {object} CustomList component
 * @version 0.1.0
 * @since 0.1.0
 */
const CustomList = ({
  itemName,
  items,
  page,
  loading,
  itemCount,
  headerLayout,
  onPaginate,
  onRefresh,
  onMapView,
  generateExportUrl,
  renderListItem,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  /**
   * @function
   * @name handleSelectItem
   * @description Handle select a single row in a list action
   *
   * @param {object} item selected item object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  const handleSelectItem = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const handleDeselectItem = (item) => {
    const selectedList = [...selectedItems];

    // eslint-disable-next-line
    remove(selectedList, (listItem) => listItem._id === item._id);
    setSelectedItems(selectedList);
  };

  /**
   * @function
   * @name isSelected
   * @description Check if item is among selected items
   *
   * @param {object} item item to check if it is selected
   * @returns {boolean} boolean value is item is selected
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  const isSelected = (item) => map(selectedItems, '_id').includes(item._id); // eslint-disable-line

  return (
    <div className="List">
      <Toolbar
        itemName={itemName}
        page={page}
        total={itemCount}
        selectedItemsCount={selectedItems.length}
        onPaginate={(nextPage) => onPaginate(nextPage)}
        onRefresh={onRefresh}
        onMapView={onMapView}
        exportUrl={
          generateExportUrl
            ? generateExportUrl({
              filter: { _id: map(selectedItems, '_id') },
              // token: getJwtToken(),
            })
            : null
        }
      />

      <ListHeader
        headerLayout={headerLayout}
      />

      <List
        loading={loading}
        dataSource={items}
        renderItem={(item) =>
          renderListItem({
            item,
            isSelected: isSelected(item),
            onSelectItem: () => handleSelectItem(item),
            onDeselectItem: () => handleDeselectItem(item),
          })
        }
      />
    </div>
  );
};

CustomList.propTypes = {
  loading: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.string }))
    .isRequired,
  headerLayout: PropTypes.arrayOf(PropTypes.shape({ header: PropTypes.string }))
    .isRequired,
  itemName: PropTypes.string.isRequired,
  onPaginate: PropTypes.func,
  onRefresh: PropTypes.func.isRequired,
  onMapView: PropTypes.func.isRequired,
  generateExportUrl: PropTypes.func,
  renderListItem: PropTypes.func.isRequired,
};

CustomList.defaultProps = {
  generateExportUrl: null,
  onPaginate: null,
  onMapView: null,
};

export default CustomList;
