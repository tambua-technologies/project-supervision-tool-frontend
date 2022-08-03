import React, { useState, useEffect } from "react";
import API from "../../API";
import CustomList from "../components/List";
import ListItem from "../components/ListItem";
import ListItemActions from "../components/ListItemActions";
import { Drawer, Col } from "antd";
import { API_BASE_URL } from "../../API/config";
const name = { xxl: 6, xl: 6, lg: 6, md: 6, sm: 10, xs: 20 };
const Description = { xxl: 7, xl: 7, lg: 7, md: 7, sm: 10, xs: 0 };
const permission = { xxl: 7, xl: 7, lg: 7, md: 7, sm: 0, xs: 0 };

const headerLayout = [
  { ...name, header: "Name" },
  { ...Description, header: "Description" },
  { ...permission, header: "Permission" },
];
const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const getRoles = (id) => {
    setIsLoading(true);
    API.get("roles")
      .then(res => {
        setIsLoading(false);
        setRoles(res);
      })
      .catch(err => {
        setIsLoading(false);
      }
      )
  };

  useEffect(() => {
    getRoles()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <div>
        {/* list starts */}
        <CustomList
          itemName="Role"
          datatestid="roles-list"
          title={"User Roles"}
          actionButtonProp={{
            title: "User Roles",
            arrActions: [
              {
                btnName: "Add New User Role ",
                btnAction: showDrawer,
              },
            ],
          }}
          items={roles}
          page={1}
          itemCount={roles.length}
          loading={isLoading}
          onRefresh={() => getRoles()}
          headerLayout={headerLayout}
          renderListItem={({ item }) => (
            <ListItem
              key={item.id} // eslint-disable-line
              name={item?.name}
              item={item}
              renderActions={() => (
                <ListItemActions
                  downloadReport={
                    item?.media
                      ? {
                        name: "Download Report",
                        title: "Click to download the report",
                        url: `${API_BASE_URL}/api/v1/procuring_entity_reports/${item?.media?.id}`,
                      }
                      : undefined
                  }
                />
              )}
            >
              {/* eslint-disable react/jsx-props-no-spreading */}

              <Col
                {...name}
                className="contentEllipse"
                title={item?.name || "N/A"}
              >
                {item?.name || "N/A"}
              </Col>

              <Col {...Description} className="contentEllipse">
                {"Descriptions"}
              </Col>

              <Col {...permission} className="contentEllipse">
                {`Permision`}
              </Col>

              {/* eslint-enable react/jsx-props-no-spreading */}
            </ListItem>
          )}
        />
        <Drawer
          title="Add New Role"
          placement="right"
          onClose={onClose}
          visible={visible}
          width={500}
        >
         
        </Drawer>
      </div>
    </>
  );
};

export default Roles;
