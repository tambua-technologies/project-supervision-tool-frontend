import React, { useState, useEffect } from "react";
import API from "../../API";
import CustomList from "../components/List";
import ListItem from "../components/ListItem";
import ListItemActions from "../components/ListItemActions";
import UsersForm from "./usersForm";
import { Drawer, Col } from "antd";
import { API_BASE_URL } from "../../API/config";

const name = { xxl: 4, xl: 4, lg: 4, md: 4, sm: 10, xs: 20 };
const title = { xxl: 4, xl: 4, lg: 4, md: 4, sm: 10, xs: 0 };
const organization = { xxl: 4, xl: 4, lg: 4, md: 4, sm: 0, xs: 0 };
const email = { xxl: 5, xl: 5, lg: 5, md: 5, sm: 0, xs: 0 };
const role = { xxl: 4, xl: 4, lg: 4, md: 4, sm: 0, xs: 0 };

const headerLayout = [
  { ...name, header: "Name" },
  { ...title, header: "Title" },
  { ...organization, header: "Organization" },
  { ...email, header: "Email" },
  { ...role, header: "Role" },
];

const UsersList = ({ match }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const getUsers = () => {
    setIsLoading(true);
    API.get("users")
    .then(res => {
      setIsLoading(false);
      setUsers(res.data);
    })
    .catch(err => {
      setIsLoading(false);
      console.log('error fetching users', err);
    })
  }
  useEffect(() => {
    getUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [visible, setVisible] = useState(false);

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
          datatestid="users-list"
          itemName="User"
          title={"Report"}
          actionButtonProp={{
            title: "Users",
            arrActions: [
              {
                btnName: "Add New User ",
                btnAction: showDrawer,
              },
            ],
          }}
          items={users}
          page={1}
          itemCount={users.length}
          loading={isLoading}
          onRefresh={() => getUsers()}
          headerLayout={headerLayout}
          renderListItem={({ item }) => (
            <ListItem
              key={item.id} // eslint-disable-line
              name={item?.first_name}
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
                title={item?.first_name || "N/A"}
              >
                {item?.first_name || "N/A"}
              </Col>

              <Col {...title} className="contentEllipse">
                {"Supervisor"}
              </Col>

              <Col {...organization} className="contentEllipse">
                {`WB ORG`}
              </Col>

              <Col {...email} className="contentEllipse">
                {item.email}
              </Col>

              <Col {...role} className="contentEllipse">
                {"Role"}
              </Col>

              {/* eslint-enable react/jsx-props-no-spreading */}
            </ListItem>
          )}
        />
        <Drawer
          title="Add New User Role"
          placement="right"
          onClose={onClose}
          visible={visible}
          width={500}
        >
          <UsersForm
            firstNameInp={true}
            lastNameInp={true}
            titleInp={true}
            organizationInp={true}
            emailInp={true}
            roleInp={true}
            phoneNumberInp={true}
          />
        </Drawer>
      </div>
    </>
  );
};

export default UsersList;
