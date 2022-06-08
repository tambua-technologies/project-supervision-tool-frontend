import React from "react";
import "./style.css";
const TopContent = ({ title, description }) => {
  return (
    <h3>
      {title} <span>{description}</span>
    </h3>
  );
};

export default TopContent;
