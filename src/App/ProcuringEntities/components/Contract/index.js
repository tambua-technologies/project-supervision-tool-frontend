import React, { useContext, useEffect } from "react";
import { Card, Row, Col } from "antd";
import { AppContext } from "../../../../context/AppContext";
import { isoDateToHumanReadableDate } from "../../../../Util/index";

const Contract = () => {
  const { procuringEntity } = useContext(AppContext);
  useEffect(() => {
    console.log("its work", procuringEntity);
  }, [procuringEntity]);

  return (<h1> Work In progress</h1>)
};

export default Contract;
