import React, { useState } from "react";
import { Modal } from "antd";
import UsersForm from "../../Users/usersForm";
import "./style.css";
const CustomModal = ({
  title,
  roleNameInp,
  descriptionInpt,
  permissionInp,
  isVisible
}) => {
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
      <Modal
        className="custom-modal"
        title={title}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <UsersForm
          roleNameInp={roleNameInp}
          descriptionInpt={descriptionInpt}
          permissionInp={permissionInp}
        />
      </Modal>
    </>
  );
};

export default CustomModal;
