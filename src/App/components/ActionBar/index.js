import React from "react";
import { Button, Layout } from "antd";
const { Content } = Layout;

const ButtonRender = (props) => {
  const { btnName, btnAction } = props;
  return (
    <Button
      style={{
        border: "1.5px solid  #1890ff",
        color: "#1890ff",
        marginRight: "10px",
      }}
      onClick={btnAction}
    >
      {btnName}
    </Button>
  );
};
const ActionBar = ({ actionButtonProp }) => {
  const { title, arrActions } = actionButtonProp;
  return (
    <div style={{ padding: "0 0 15px 0" }}>
      <Content
        style={{
          margin: 0,
        }}
        className="BaseLayoutContent"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>{title}</h3>
          <div style={{ display: "flex" }}>
            {arrActions
              ? arrActions.map((arrAction) => (
                  <ButtonRender
                    btnName={arrAction.btnName}
                    btnAction={arrAction.btnAction}
                  />
                ))
              : " "}
          </div>
        </div>
      </Content>
    </div>
  );
};

export default ActionBar;
