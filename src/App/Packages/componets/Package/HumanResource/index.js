import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../../../context/AppContext";
import { Col, Button } from "antd";
import API from "../../../../../API";
import CustomList from "../../../../components/List";
import ListItem from "../../../../components/ListItem";
import ListItemActions from "../../../../components/ListItemActions";
import { API_BASE_URL } from "../../../../../API/config";
const Position = { xxl: 5, xl: 5, lg: 5, md: 5, sm: 10, xs: 20 };
const Quantity = { xxl: 4, xl: 4, lg: 4, md: 4, sm: 0, xs: 0 };
const Gender_M = { xxl: 4, xl: 4, lg: 4, md: 4, sm: 0, xs: 0 };
const Gender_F = { xxl: 5, xl: 5, lg: 5, md: 5, sm: 0, xs: 0 };
const Name_s = { xxl: 4, xl: 4, lg: 4, md: 4, sm: 0, xs: 0 };

const headerLayout = [
  { ...Position, header: "Position" },
  { ...Quantity, header: "Quantity" },
  { ...Gender_M, header: "Gender(M)" },
  { ...Gender_F, header: "Gender(F)" },
  { ...Name_s, header: "Name(s)" },
];
const HumanResources = ({ match }) => {
  const [reports, setReports] = useState([]);
  const app = React.useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const getReports = async (id) => {
    setIsLoading(true);
    const payload = `filter[procuring_entity_id]=${id}`;
    const response = await API.getProcuringEntitiesProgressReports(payload);
    setReports(response.data);
    setIsLoading(false);
  };
  const HumanResource_reports = [
    {
      report_title: "Project Manager",
      report_number: 1,
      Gender_M: 0,
      Gender_F: 1,
      Name_s: "Sanjay Partush",
    },
    {
      report_title: "Project Manager",
      report_number: 1,
      Gender_M: 40,
      Gender_F: 1,
      Name_s: "Sanjay Partush",
    },
    {
      report_title: "Project Manager",
      report_number: 12,
      Gender_M: 0,
      Gender_F: 1,
      Name_s: "Sanjay Partush",
    },
    {
      report_title: "Project Manager",
      report_number: 1,
      Gender_M: 0,
      Gender_F: 15,
      Name_s: "Sanjay Partush",
    },
    {
      report_title: "Project Manager",
      report_number: 1,
      Gender_M: 0,
      Gender_F: 1,
      Name_s: "Sanjay Partush",
    },
  ];
  useEffect(() => {
    // const { procuringEntityId } = match.params;
    // getReports(procuringEntityId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div>
        <Button onClick={() => history.goBack()} type="primary">
          Back
        </Button>
        {/* list starts */}
        <CustomList
          itemName="Progress Reports"
          title={"Report"}
          project={app?.project?.code}
          entity={"Procuring Entities"}
          location={"Ilala"}
          actionButtonProp={{}}
          items={HumanResource_reports}
          page={1}
          itemCount={HumanResource_reports.length}
          loading={isLoading}
          headerLayout={headerLayout}
          renderListItem={({ item }) => (
            <ListItem
              key={item.id} // eslint-disable-line
              name={item?.report_title}
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
                {...Position}
                className="contentEllipse"
                title={item?.report_title || "N/A"}
              >
                {item?.report_title || "N/A"}
              </Col>

              <Col {...Quantity} className="contentEllipse">
                {item?.report_number}
              </Col>

              <Col {...Gender_M} className="contentEllipse">
                {item.Gender_M}
              </Col>

              <Col {...Gender_F} className="contentEllipse">
                {item.Gender_F}
              </Col>
              <Col {...Name_s} className="contentEllipse">
                {item.Name_s}
              </Col>

              {/* eslint-enable react/jsx-props-no-spreading */}
            </ListItem>
          )}
        />
      </div>
    </>
  );
};

export default HumanResources;
