import React, { useState, useEffect } from "react";
import API from "../../API";
import CustomList from "../components/List";
import ListItem from "../components/ListItem";
import ListItemActions from "../components/ListItemActions";
import { Drawer, Col, Modal } from "antd";
import NewRoleForm from "./NewRoleForm";
import { notifyError, notifySuccess } from "../../Util";
import './styles.css';
const name = { xxl: 8, xl: 8, lg: 8, md: 8, sm: 10, xs: 20 };
const permission = { xxl: 12, xl: 12, lg: 12, md: 12, sm: 10, xs: 0 };

const headerLayout = [
  { ...name, header: "Name" },
  { ...permission, header: "Permissions" },
];

const { confirm } = Modal;

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editableRole, setEditableRole] = useState(null);


  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const editRole = (roleToEdit) => {
    setEditableRole(roleToEdit);
    setIsEdit(true);
    showDrawer();
  }

  const deleteRole = (item) => {
    API.deleteData(`roles/${item.id}`)
      .then((res) => {
        notifySuccess(`Role ${item.name} deleted successfully`);
        getRoles();
      }
      ).catch(err => notifyError(`Error deleting role ${item.name}`));
  }

  const showArchiveConfirm = item => {
    confirm({
      title: `Are you sure you want to archive role ${item.name}?`,
      okButtonProps: {
        'data-testid': 'archive-confirm-role-ok-button',
      },
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteRole(item);
      },
    });
  };

  const getRoles = (id) => {
    setIsLoading(true);
    API.get("roles")
      .then(res => {
        setIsLoading(false);
        setRoles(res.data);
      })
      .catch(err => {
        setIsLoading(false);
      }
      )
  };

  const createRole = payload => {
    setIsLoading(true);
    if (isEdit) {
      API.put(`roles/${editableRole.id}`, payload)
        .then(res => {
          onClose();
          setIsEdit(false);
          notifySuccess("Role updated successfully");
          getRoles();
        })
        .catch(err => {
          setIsLoading(false);
          notifyError("Error updating role");
        }
        )
      return;
    }


    API.post("roles", payload)
      .then(res => {
        onClose();
        notifySuccess("Role created successfully");
        setIsLoading(false);
        getRoles();
      })
      .catch(err => {
        setIsLoading(false);
        notifyError("Error creating role");
      }
      )
  }

  useEffect(() => {
    getRoles()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps




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
                datatestid: "add-role-button",
                btnName: "Add New User Role",
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
                  edit={
                    {
                      name: "Edit Role",
                      datatestid: `edit-role-${item.id}`,
                      title: "Edit Role",
                      onClick: () => editRole(item),
                    }
                  }
                  archive={
                    {
                      name: "Archive Role",
                      datatestid: `archive-role-${item.id}`,
                      title: "Archieve Role",
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
                title={item?.name || "N/A"}
              >
                {item?.name || "N/A"}
              </Col>

              <Col {...permission} className="contentEllipse" title={item?.permissions.map(({ name }) => name).join(',') || "N/A"}>
                {item?.permissions.map(({ name }) => name).join(',') || "N/A"}
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
          <NewRoleForm
            onFinish={createRole}
            onCancel={onClose}
            editableRole={editableRole}
            key={`new_role_form_${editableRole?.id}`}
          />
        </Drawer>
      </div>
    </>
  );
};

export default Roles;
