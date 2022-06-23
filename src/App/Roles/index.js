import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from "../../API";
import CustomList from "../components/List";
import ListItem from "../components/ListItem";
import ListItemActions from "../components/ListItemActions";
// import { Col, Modal } from "antd";
import { Button, Drawer, Col } from "antd";
import UsersForm from "../Users/usersForm";
import { API_BASE_URL } from "../../API/config";
import { isoDateToHumanReadableDate } from "../../Util";
const name = { xxl: 6, xl: 6, lg: 6, md: 6, sm: 10, xs: 20 };
const Description = { xxl: 7, xl: 7, lg: 7, md: 7, sm: 10, xs: 0 };
const permission = { xxl: 7, xl: 7, lg: 7, md: 7, sm: 0, xs: 0 };

const headerLayout = [
  { ...name, header: "Name" },
  { ...Description, header: "Description" },
  { ...permission, header: "Permission" },
];
const Roles = ({ match }) => {
  const [reports, setReports] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const getReports = async (id) => {
    setIsLoading(true);
    const payload = `filter[procuring_entity_id]=${id}`;
    const response = await API.getProcuringEntitiesProgressReports(payload);
    setReports(response.data);
    setIsLoading(false);
    const res = await API.get("roles");
    console.log(res);
    setRoles(res);
  };

  useEffect(() => {
    const { procuringEntityId } = match.params;
    getReports(procuringEntityId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // const [visible, setVisible] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState("Content of the modal");

  // const showModal = () => {
  //   setVisible(true);
  // };

  // const handleOk = () => {
  //   setModalText("The modal will be closed after two seconds");
  //   setConfirmLoading(true);
  //   setTimeout(() => {
  //     setVisible(false);
  //     setConfirmLoading(false);
  //   }, 2000);
  // };

  // const handleCancel = () => {
  //   console.log("Clicked cancel button");
  //   setVisible(false);
  // };
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
          itemName="Progress Reports"
          title={"Report"}
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
          onRefresh={() => getReports()}
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
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          onClose={onClose}
          visible={visible}
          width={500}
        >
          <UsersForm
            roleNameInp={true}
            descriptionInpt={true}
            permissionInp={true}
          />
        </Drawer>
        {/* <Modal
          className="custom-modal"
          title="Add New User Role"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <UsersForm
            roleNameInp={true}
            descriptionInpt={true}
            permissionInp={true}
          />
        </Modal> */}
      </div>
    </>
  );
};

export default Roles;
