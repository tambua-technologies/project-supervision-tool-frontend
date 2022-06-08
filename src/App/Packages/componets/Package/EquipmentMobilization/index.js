import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../../../context/AppContext";
import { Col } from "antd";
import API from "../../../../../API";
import CustomList from "../../../../components/List";
import ListItem from "../../../../components/ListItem";
import ListItemActions from "../../../../components/ListItemActions";
import { isoDateToHumanReadableDate } from "../../../../../Util";
import { API_BASE_URL } from "../../../../../API/config";
const Name = { xxl: 4, xl: 4, lg: 4, md: 4, sm: 0, xs: 0 };
const Capacity = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const ContractAmount = { xxl: 4, xl: 4, lg: 4, md: 4, sm: 0, xs: 0 };
const MobilizedAmount ={ xxl: 4, xl: 4, lg: 4, md: 4, sm: 0, xs: 0 };
const MobilizedDate = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const Remarks ={ xxl: 4, xl: 4, lg: 4, md: 4, sm: 0, xs: 0 };
const headerLayout = [
  { ...Name, header: "Name" },
  { ...Capacity, header: "Capacity" },
  { ...ContractAmount, header: "ContractAmount" },
  { ...MobilizedAmount, header: "MobilizedAmount" },
  { ...MobilizedDate, header: "MobilizedDate" },
  { ...Remarks, header: "Remarks" },
];
const EquipmentMobilization = ({ match }) => {
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
        report_title:"Project Manager",
        report_number:1,
        ContractAmount:0,
        MobilizedAmount:1,
        MobilizedDate:"Sanjay Partush",
        Remarks:"completed"
    },
    {
        report_title:"Project Manager",
        report_number:1,
        ContractAmount:40,
        MobilizedAmount:1,
        MobilizedDate:"Sanjay Partush",
        Remarks:"completed"

    },
    {
        report_title:"Project Manager",
        report_number:12,
        ContractAmount:0,
        MobilizedAmount:1,
        MobilizedDate:"Sanjay Partush",
        Remarks:"completed"

    },
    {
        report_title:"Project Manager",
        report_number:1,
        ContractAmount:0,
        MobilizedAmount:15,
        MobilizedDate:"Sanjay Partush",
        Remarks:"completed"

    },
    {
        report_title:"Project Manager",
        report_number:1,
        ContractAmount:0,
        MobilizedAmount:1,
        MobilizedDate:"Sanjay Partush",
        Remarks:"completed"

    }
]
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
                {...Name}
                className="contentEllipse"
                title={item?.report_title || "N/A"}
              >
                {item?.report_title || "N/A"}
              </Col>

              <Col {...Capacity} className="contentEllipse">
                {item?.report_number}
              </Col>

              <Col {...ContractAmount} className="contentEllipse">
                {item.ContractAmount}
              </Col>

              <Col {...MobilizedAmount} className="contentEllipse">
                {item.MobilizedAmount}
              </Col>
              <Col {...MobilizedDate} className="contentEllipse">
                {item.MobilizedDate}
              </Col>
              <Col {...MobilizedDate} className="contentEllipse">
                {item.Remarks}
              </Col>

              {/* eslint-enable react/jsx-props-no-spreading */}
            </ListItem>
          )}
        />
      </div>
    </>
  );
};

export default EquipmentMobilization;


// 