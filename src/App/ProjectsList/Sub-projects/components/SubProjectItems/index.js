import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import Topbar from "../../../../components/Topbar";
import SubProjectItemsList from "../../../../components/List";
import ListItem from "../../../../components/ListItem";
import ListItemActions from "../../../../components/ListItemActions";
import { subProjectsOperator, subProjectsSelectors } from "../../duck";


/* constants */
const subProjectItemNameSpan = { xxl: 6, xl: 6, lg: 5, md: 5, sm: 10, xs: 11 };
const descriptionSpan = { xxl: 6, xl: 6, lg: 6, md: 7, sm: 0, xs: 0 };
const quantitySpan = { xxl: 4, xl: 4, lg: 4, md: 5, sm: 5, xs: 10 };
const capacitySpan = { xxl: 5, xl: 5, lg: 5, md: 4, sm: 6, xs: 0 };

const { confirm } = Modal;

const headerLayout = [
  { ...subProjectItemNameSpan, header: "Name" },
  { ...descriptionSpan, header: "Description" },
  { ...capacitySpan, header: "Capacity" },
  { ...quantitySpan, header: "Quantity" },
];


/**
 * @class
 * @name SubProjectItems
 * @description Render actions list which have search box, actions and Sub subProjectItems list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class SubProjectItems extends Component {

  componentDidMount() {
    const { getSubProjectItems } = this.props;
    getSubProjectItems()
  }

  render() {
    const {
      subProjectItems,
      loading,
    } = this.props;

    return (
      <div>
        {/* Topbar */}
        <Topbar
          search={{
            size: "large",
            placeholder: "Search for Sub project items here ...",
            onChange: this.searchInitiative,
          }}
          actions={[
            {
              label: "New Sub Project Item",
              icon: <PlusOutlined />,
              size: "large",
              title: "Add New Sub-project",
              onClick: this.openSubProjectForm,
            },
          ]}
        />
        {/* end Topbar */}

        {/* list starts */}
        <SubProjectItemsList
          itemName="Sub-project-item"
          items={subProjectItems}
          loading={loading}
          headerLayout={headerLayout}
          renderListItem={({
            item,
            isSelected,
            onSelectItem,
            onDeselectItem,
          }) => (
              <ListItem
                key={item.id} // eslint-disable-line
                name={item.name}
                item={item}
                isSelected={isSelected}
                onSelectItem={onSelectItem}
                onDeselectItem={onDeselectItem}
                renderActions={() => (
                  <ListItemActions
                    edit={{
                      name: "Edit Sub Project",
                      title: "Update Sub Project Details",
                      onClick: () => this.handleEdit(item),
                    }}
                    archive={{
                      name: "Archive Sub Project Item",
                      title:
                        "Remove Sub project item from list of active sub project items",
                      onClick: () => this.showArchiveConfirm(item),
                    }}
                  />
                )}
              >
                {/* eslint-disable react/jsx-props-no-spreading */}
                <Col
                  {...subProjectItemNameSpan}
                  className="humanResourceEllipse"
                >
                  {item.name}
                </Col>
                <Col {...descriptionSpan}>{item ? item.description : "N/A"}</Col>
                <Col {...quantitySpan}>{item ? item.quantity : "N/A"}</Col>
                <Col {...capacitySpan}>{item.item ? item.item.capacity : "N/A"}</Col>


                {/* eslint-enable react/jsx-props-no-spreading */}
              </ListItem>
            )}
        />
        {/* end list */}
      </div>
    );
  }
}

SubProjectItems.propTypes = {
  loading: PropTypes.bool.isRequired,
  subProjectItems: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
};

SubProjectItems.defaultProps = {
  subProjectItems: null,
};

const mapStateToProps = (state) => {
  return {
    subProjectItems: subProjectsSelectors.getSubProjectItemsSelector(state),
    loading: subProjectsSelectors.getSubProjectItemLoadingSelector(state)
  };
};

const mapDispatchToProps = {
  getSubProjectItems: subProjectsOperator.getSubProjectItemsStart
};

export default connect(mapStateToProps, mapDispatchToProps)(SubProjectItems);

