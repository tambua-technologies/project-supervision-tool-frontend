import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from "../../API";
import CustomList from "../components/List";
import ListItem from "../components/ListItem";
import ListItemActions from "../components/ListItemActions";
import { Col } from "antd";
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
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const getReports = async (id) => {
    setIsLoading(true);
    const payload = `filter[procuring_entity_id]=${id}`;
    const response = await API.getProcuringEntitiesProgressReports(payload);
    setReports(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    const { procuringEntityId } = match.params;
    getReports(procuringEntityId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                btnAction: () => history.push(`${match.url}/create`),
              },
            ],
          }}
          items={reports}
          page={1}
          itemCount={reports.length}
          loading={isLoading}
          onRefresh={() => getReports()}
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
                {...name}
                className="contentEllipse"
                title={item?.report_title || "N/A"}
              >
                {item?.report_title || "N/A"}
              </Col>

              <Col {...Description} className="contentEllipse">
                {item?.report_number}
              </Col>

              <Col {...permission} className="contentEllipse">
                {`${isoDateToHumanReadableDate(
                  item.start
                )} - ${isoDateToHumanReadableDate(item?.end)}`}
              </Col>

              {/* eslint-enable react/jsx-props-no-spreading */}
            </ListItem>
          )}
        />
      </div>
    </>
  );
};

export default Roles;
