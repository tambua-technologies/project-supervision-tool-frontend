import React from "react";
import { Button } from "antd";

const slugfyText = (text) => {
  return text.toLowerCase().replace(/ /g, "-");
}

const ActionBarButton = (props) => {
    const { btnName, btnAction, btnType } = props;
    const fileUploadId = slugfyText(btnName);
    
  
    const triggerFileUpload = (e) => {
      e.preventDefault();
      document.getElementById(fileUploadId).click();
    }
  
  
    return (
      <>
        <input
          type="file"
          name="file"
          id={fileUploadId}

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