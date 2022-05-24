import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Drawer } from "antd";

import { AppContext } from "../../context/AppContext";
import CustomList from "../components/List";
import ListItem from "../components/ListItem";
import ListItemActions from "../components/ListItemActions";
import API from "../../API";
import { API_BASE_URL } from "../../API/config";
import {
  ProcuringEntityActions,
  ProcuringEntitySelectors,
} from "../../redux/modules/ProcuringEntities";
import { isoDateToHumanReadableDate } from "../../Util";
import DisplaySurveyForm from "../components/DisplaySurveyForm";

const reportTitle = { xxl: 5, xl: 5, lg: 5, md: 5, sm: 10, xs: 20 };
const generatedOn = { xxl: 5, xl: 5, lg: 5, md: 5, sm: 10, xs: 0 };
const generatedBy = { xxl: 5, xl: 5, lg: 5, md: 5, sm: 0, xs: 0 };
const submitReport = { xxl: 5, xl: 5, lg: 5, md: 5, sm: 0, xs: 0 };

const headerLayout = [
  { ...reportTitle, header: "Name" },
  { ...generatedOn, header: "Generated on" },
  { ...generatedBy, header: "Generated by" },
  { ...submitReport, header: "submitted on" },
];

function ProgressReports({ match, getProcuringEntity }) {
  const [progressReports, setProgressReports] = useState([]);
  const app = React.useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleOnOpenForm = () => setShowForm(true);
  const handleOnCloseForm = () => setShowForm(false);

  const getReports = async () => {
    setIsLoading(true);
    const payload = `filter[procuring_entity_id]=${1}`;
    const response = await API.getProcuringEntitiesProgressReports(payload);
    setProgressReports(response.data);
    setIsLoading(false);
  };

  const breadcrumb = [
    {
      title: "Ilala",
      path: "",
    },
  ];

  useEffect(() => {
    console.log(match.params);
    // getProcuringEntity(1);
    getReports();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div>
        {/* list starts */}
        <CustomList
          itemName="Progress Reports"
          title={"Report"}
          breadcrumb={breadcrumb}
          project={app?.project?.code}
          entity={"Procuring Entities"}
          location={"Ilala"}
          actionButtonProp={{ title: "Reports", arrActions: [ {
            btnName: "New Monthly Report ",
            btnAction: () => {},
          }] }}
          items={progressReports}
          page={1}
          itemCount={progressReports.length}
          loading={isLoading}
          onRefresh={() => {}}
          onMapView={() => {}}
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
                {...reportTitle}
                className="contentEllipse"
                title={item?.report_title || "N/A"}
              >
                {item?.report_title || "N/A"}
              </Col>

              <Col {...generatedOn} className="contentEllipse">
                {item?.report_number}
              </Col>

              <Col {...generatedBy} className="contentEllipse">
                {`${isoDateToHumanReadableDate(
                  item.start
                )} - ${isoDateToHumanReadableDate(item?.end)}`}
              </Col>

              <Col {...submitReport} className="contentEllipse">
                {isoDateToHumanReadableDate(item.created_at)}
              </Col>

              {/* eslint-enable react/jsx-props-no-spreading */}
            </ListItem>
          )}
        />
        {/* end list */}

        <Drawer
          width={"100%"}
          onClose={handleOnCloseForm}
          footer={null}
          visible={showForm}
          bodyStyle={{ padding: 0 }}
          destroyOnClose
          maskClosable={false}
          className="projectForm"
        >
          <DisplaySurveyForm survey_id="apQUo4bqoEHmKNoPgaPq6F" />
        </Drawer>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  procuringEntity: ProcuringEntitySelectors.getProcuringEntitySelector(state),
});

const mapDispatchToProps = {
  getProcuringEntity: ProcuringEntityActions.getProcuringEntityStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressReports);
