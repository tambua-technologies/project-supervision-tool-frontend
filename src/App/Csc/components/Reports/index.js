import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Col,
  Drawer,
  Layout,
  Button,
  Menu,
  Breadcrumb,
  Row,
  Input,
} from "antd";
import CustomList from "../../../components/List";
import ListItem from "../../../components/ListItem";
import ListItemActions from "../../../components/ListItemActions";
import API from "../../../../API";
import { API_BASE_URL } from "../../../../API/config";
import {
  ProcuringEntityActions,
  ProcuringEntitySelectors,
} from "../../../../redux/modules/ProcuringEntities";
import { isoDateToHumanReadableDate } from "../../../../Util";
import ProgressReportForm from "./components/Form";

const reportTitle = { xxl: 5, xl: 5, lg: 5, md: 5, sm: 10, xs: 20 };
const reportNumber = { xxl: 5, xl: 5, lg: 5, md: 5, sm: 10, xs: 0 };
const reportingPeriod = { xxl: 11, xl: 11, lg: 11, md: 11, sm: 0, xs: 0 };

const { Content } = Layout;

const headerLayout = [
  { ...reportTitle, header: "Title" },
  { ...reportNumber, header: "Report Number" },
  { ...reportingPeriod, header: "Reporting Period" },
];

function ProgressReports({ match, procuringEntity, getProcuringEntity }) {
  const [progressReports, setProgressReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleOnOpenForm = () => setShowForm(true);
  const handleOnCloseForm = () => setShowForm(false);

  const createReport = async (payload) => {
    setIsLoading(true);
    handleOnCloseForm();
    const response = await API.createProcuringEntitiesProgressReports(payload);
    setProgressReports([response.data, ...progressReports]);
    setIsLoading(false);
  };

  const getReports = async () => {
    setIsLoading(true);
    const payload = `filter[procuring_entity_id]=${1}`;
    const response = await API.getProcuringEntitiesProgressReports(payload);
    setProgressReports(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getProcuringEntity(1);
    getReports();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const breadcrumbs = procuringEntity
    ? [
        {
          title: "Projects",
          url: "/projects",
          name: "Projects",
        },
        {
          title: procuringEntity.project.code,
          url: `/projects/${procuringEntity.project.id}/`,
          name: procuringEntity.project.name,
        },
        {
          title: `Procuring Entities`,
          url: `/projects/${procuringEntity.project.id}/procuring_entities`,
          name: `Procuring Entities under ${procuringEntity.project.name}(${procuringEntity.project.code})`,
        },
        {
          title: `${procuringEntity.agency.name}`,
          url: `/projects/${procuringEntity.project.id}/procuring_entities/${procuringEntity.id}`,
          name: `${procuringEntity.agency.name}`,
        },
        {
          title: `Progress Reports`,
          url: "",
          name: `Progress Reports`,
        },
      ]
    : [];

  return (
    <>
      <div style={{ padding: "0 15px 15px" }}>
        <Breadcrumb separator=">" style={{ margin: "5px" }}>
          <Breadcrumb.Item>Project</Breadcrumb.Item>
          <Breadcrumb.Item>DMDP</Breadcrumb.Item>
          <Breadcrumb.Item>Procuring Entities</Breadcrumb.Item>
          <Breadcrumb.Item>Ilala</Breadcrumb.Item>
        </Breadcrumb>
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
            <h3>Reports</h3>
            <Button
              style={{ border: "1.5px solid  #1890ff", color: "#1890ff" }}
            >
              Add EHS Update
            </Button>
          </div>
        </Content>
      </div>

      <div>
        {/* Topbar */}

        {/* end Topbar */}

        {/* list starts */}
        <CustomList
          itemName="Progress Reports"
          items={progressReports}
          page={1}
          itemCount={0}
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

              <Col {...reportNumber} className="contentEllipse">
                {item?.report_number}
              </Col>

              <Col {...reportingPeriod} className="contentEllipse">
                {`${isoDateToHumanReadableDate(
                  item.start
                )} - ${isoDateToHumanReadableDate(item?.end)}`}
              </Col>

              {/* eslint-enable react/jsx-props-no-spreading */}
            </ListItem>
          )}
        />
        {/* end list */}

        <Drawer
          title={"Add New Procuring Entity Progress Report"}
          width={550}
          onClose={handleOnCloseForm}
          footer={null}
          visible={showForm}
          bodyStyle={{ paddingBottom: 80 }}
          destroyOnClose
          maskClosable={false}
          className="projectForm"
        >
          <ProgressReportForm
            closeForm={handleOnCloseForm}
            procuringEntity={procuringEntity}
            createReport={createReport}
          />
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
