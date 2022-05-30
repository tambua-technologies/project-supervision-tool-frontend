import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Col } from "antd";
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

const reportTitle = { xxl: 5, xl: 5, lg: 5, md: 5, sm: 10, xs: 20 };
const reportNumber = { xxl: 5, xl: 5, lg: 5, md: 5, sm: 10, xs: 0 };
const reportingPeriod = { xxl: 5, xl: 5, lg: 5, md: 5, sm: 0, xs: 0 };
const submitReport = { xxl: 5, xl: 5, lg: 5, md: 5, sm: 0, xs: 0 };

const headerLayout = [
  { ...reportTitle, header: "Titlte" },
  { ...reportNumber, header: "Report Number" },
  { ...reportingPeriod, header: "Reporting Period" },
  { ...submitReport, header: "Submitted On" },
];

function Reports({ match }) {
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


  useEffect(() => {
    const {procuringEntityId} = match.params;
    getReports(procuringEntityId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div style={{padding: '30px 10px 20px 20px'}}>
        {/* list starts */}
        <CustomList
          itemName="Progress Reports"
          title={"Report"}
          project={app?.project?.code}
          entity={"Procuring Entities"}
          location={"Ilala"}
          actionButtonProp={{
            title: "Reports",
            arrActions: [
              {
                btnName: "New Monthly Report ",
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
                {...reportTitle}
                className="contentEllipse"
                title={item?.report_title || "N/A"}
              >
                {item?.report_title || "N/A"}
              </Col>

              <Col {...reportNumber} className="contentEllipse">
                {item?.report_number}
              </Col>

              <Col {...reportingPeriod} className="contentEllipse">
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

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
