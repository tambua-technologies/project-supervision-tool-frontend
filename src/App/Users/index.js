import React, { useState, useEffect } from "react";
import API from "../../API";
import CustomList from "../components/List";
import ListItem from "../components/ListItem";
import ListItemActions from "../components/ListItemActions";
import UsersForm from "./UsersForm";
import { Drawer, Col, Modal } from "antd";
import { notifyError, notifySuccess } from "../../Util";

const name = { xxl: 4, xl: 4, lg: 4, md: 4, sm: 10, xs: 20 };
const title = { xxl: 6, xl: 6, lg: 6, md: 6, sm: 10, xs: 0 };
const email = { xxl: 5, xl: 5, lg: 5, md: 5, sm: 0, xs: 0 };
const role = { xxl: 6, xl: 6, lg: 6, md: 6, sm: 0, xs: 0 };


const headerLayout = [
  { ...name, header: "Name" },
  { ...title, header: "Title" },
  { ...email, header: "Email" },
  { ...role, header: "Role" },
];
const { confirm } = Modal;

const UsersList = ({ match }) => {
  const [users, setUsers] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(false);

const createUser = (user) => {
  // get current user from local storage
  const currentUser = JSON.parse(localStorage.getItem("user"));
  API.post(`users`, {...user, procuring_entity_id: currentUser.procuringEntity.id})
    .then((res) => {
      onClose();
      getUsers();
    }
    ).catch(err => console.log(err));
}
  const getUsers = () => {
    setIsLoading(true);
    API.get("users")
    .then(({data}) => {
      setIsLoading(false);
      const filteredUsers = data.filter(({id}) => id !== currentUser.id).filter(
        ({procuringEntity: { agency}}) => agency.id === currentUser.procuringEntity.agency.id )
      setUsers(filteredUsers);
    })
    .catch(err => {
      setIsLoading(false);
    })
  }
  useEffect(() => {
    getUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const deleteUser = (id) => {
    API.deleteData(`users/${id}`)
    .then(res => {
      getUsers();
      notifySuccess("User deleted successfully");
    }
    ).catch(err => {
      console.log(err);
      notifyError("Error deleting User");
    });
  }

  /**
   * @function
   * @name showArchiveConfirm
   * @description show confirm modal before archiving a focal person
   * @param {object} item Resource item to be archived
   *
   * @version 0.1.0
   * @since 0.1.0
   */
   const showArchiveConfirm = item => {
    confirm({
      title: `Are you sure you want to archive user ${item.first_name} ?`,
      okButtonProps: {
        'data-testid': 'archive-confirm-user-ok-button',
      },
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteUser(item.id);
      },
    });
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
                  archive={
                    {
                      name: "Archive User",
                      datatestid: `archive-user-${item.id}`,
                      title: "Archieve User",
                      onClick: () => showArchiveConfirm(item),
                    }
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
                {item?.title || "N/A"}
              </Col>

              <Col {...email} className="contentEllipse">
                {item.email}
              </Col>

              <Col {...role} className="contentEllipse">
                {item?.roles.map(({name}) => name).join(',') || "N/A"}
              </Col>

              {/* eslint-enable react/jsx-props-no-spreading */}
            </ListItem>
          )}
        />
        <Drawer
          title="Add New User"
          placement="right"
          onClose={onClose}
          visible={visible}
          width={500}
        >
          <UsersForm
            onFinish={createUser}
            onCancel={onClose}
          />
        </Drawer>
      </div>
    </>
  );
};

export default UsersList;
