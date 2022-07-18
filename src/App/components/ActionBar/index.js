import React from "react";
import { Layout } from "antd";
import ActionBarButton from "./ActionBarButton";


const { Content } = Layout;



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
                <ActionBarButton
                  key={arrAction.btnName}
                  btnName={arrAction.btnName}
                  btnAction={arrAction.btnAction}
                  btnType={arrAction?.btnType}
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
