import React from 'react';
import Topbar from "../components/Topbar";
import ProjectsList from "../components/List";
import ListItem from "../components/ListItem";
import ListItemActions from "../components/ListItemActions";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Col, } from "antd";
import { isoDateToHumanReadableDate } from "../../Util";

/* constants */
const userIdSpan = { xxl: 2, xl: 2, lg: 2, md: 3, sm: 2, xs: 3 };
const userNameSpan = { xxl: 4, xl: 6, lg: 6, md: 8, sm: 10, xs: 11 };
const userRoleSpan = { xxl: 3, xl: 4, lg: 5, md: 6, sm: 8, xs: 5 };
const userTitleSpan = { xxl: 5, xl: 4, lg: 4, md: 4, sm: 4, xs: 5 };
const organisationSpan = { xxl: 3, xl: 2, lg: 0, md: 0, sm: 0, xs: 0 };
const phoneSpan = { xxl: 3, xl: 2, lg: 4, md: 0, sm: 0, xs: 0 };
const emailSpan = { xxl: 3, xl: 2, lg: 2, md: 3, sm: 2, xs: 3 };


const headerLayout = [
    // { ...userIdSpan, header: "user ID" },
    { ...userNameSpan, header: "Name" },
    { ...userRoleSpan, header: "Role" },
    { ...userTitleSpan, header: "Tittle" },
    { ...organisationSpan, header: "Organisation" },
    { ...phoneSpan, header: "Phone" },
    { ...emailSpan, header: "Email" },
  ];

const Users = () => {
    return (
        <div>
            {/* Topbar */}
            <Topbar
                search={{
                    size: "large",
                    placeholder: "Search for users here ...",
                    // onChange: this.searchInitiative,
                    // value: searchQuery,
                }}
                actions={[
                    {
                        label: "New personnel",
                        icon: <PlusOutlined />,
                        size: "large",
                        title: "Add New user",
                        // onClick: this.openProjectForm,
                    },
                ]}
            />
            {/* end Topbar */}
            {/* list starts */}
        <ProjectsList
          itemName="Projects"
        //   items={projects}
          // page={page}
        //   loading={loading}
          // itemCount={total}
        //   onFilter={this.openFiltersModal}
        //   onRefresh={this.handleRefreshInitiative}
          onPaginate={(nextPage) => {
            this.paginateInitiative(nextPage);
          }}
          headerLayout={headerLayout}
          renderListItem={({
            item,
            isSelected,
            onSelectItem,
            onDeselectItem,
          }) => (
              <Link
                to={{
                  pathname: `/app/projects/${item.id}`,
                }}
                className="Projects"
              >
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
                        name: "Edit project",
                        title: "Update project details",
                        onClick: () => this.handleEdit(item),
                      }}
                      archive={{
                        name: "Archive project",
                        title:
                          "Remove project from list of active Projects",
                        onClick: () => this.showArchiveConfirm(item),
                      }}
                    />
                  )}
                >
                  {/* eslint-disable react/jsx-props-no-spreading */}
                  <Col {...userIdSpan} className="contentEllipse">
                    {" "}

                    {item.id ? item.id : "All"}
                  </Col>
                  <Col
                    {...userNameSpan}
                    className="contentEllipse"
                    title={item.description}
                  >
                    {item.name}
                  </Col>
                  <Col {...userRoleSpan}>{item.details ? item.details?.funding_organisation?.name : 'N/A'}</Col>
                  <Col {...userTitleSpan}>{item.details ? item.details.borrower.name : 'N/A'}</Col>
                  <Col {...organisationSpan}>{item.details ? item.details.status.toString() : 'N/A'}</Col>
                  <Col {...phoneSpan}>
                    {isoDateToHumanReadableDate(item.details?.approval_fy)}
                  </Col>

                  {/* eslint-enable react/jsx-props-no-spreading */}
                </ListItem>
              </Link>
            )}
        />
        {/* end list */}
        </div>
    )
}

export default Users;