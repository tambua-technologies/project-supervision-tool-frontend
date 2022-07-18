import React from "react";
import { Button } from "antd";

const ActionBarButton = (props) => {
    const { btnName, btnAction, btnType } = props;
  
    const triggerFileUpload = (e) => {
      e.preventDefault();
      document.getElementById("file-upload-input").click();
    }
  
  
    return (
      <>
        <input
          type="file"
          name="file"
          id="file-upload-input"
          className="visuallyhidden"
          onChange={btnAction}
        />
  
        <Button
          style={{
            border: "1.5px solid  #1890ff",
            color: "#1890ff",
            marginRight: "10px",
          }}
          onClick={btnType === "upload" ? triggerFileUpload : btnAction}
        >
          {btnName}
        </Button>
      </>
    );
  };

  export default ActionBarButton;