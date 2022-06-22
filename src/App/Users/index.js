import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from "../../API";
import CustomList from "../components/List";
import ListItem from "../components/ListItem";
import ListItemActions from "../components/ListItemActions";
import UsersForm from "./usersForm";
import { Col, Modal, Button } from "antd";
import { API_BASE_URL } from "../../API/config";

import { isoDateToHumanReadableDate } from "../../Util";
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
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const getReports = async (id) => {
    setIsLoading(true);
    const payload = `filter[procuring_entity_id]=${id}`;
    const response = await API.getProcuringEntitiesProgressReports(payload);
    setReports(response.data);
    setIsLoading(false);
    let res = await API.get("users");
    console.log(res.data);
    setUsers(res.data);
  };

  useEffect(() => {
    const { procuringEntityId } = match.params;
    getReports(procuringEntityId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
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
            title: "Users",
            arrActions: [
              {
                btnName: "Add New User ",
                btnAction: showModal,
              },
            ],
          }}
          items={users}
          page={1}
          itemCount={users.length}
          loading={isLoading}
          onRefresh={() => getReports()}
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

        <Modal
          className="custom-modal"
          title="Add New User Role"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
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
        </Modal>
      </div>
    </>
  );
};

export default UsersList;
