import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  ProcuringEntityActions,
  ProcuringEntitySelectors,
} from "../../../../redux/modules/ProcuringEntities";
import PropTypes from "prop-types";
import { Col, Drawer, Row, Card } from "antd";
import CustomList from "../../../components/List";
import ListItem from "../../../components/ListItem";
import ListItemActions from "../../../components/ListItemActions";
import { getIdFromUrlPath } from "../../../../Util";
import API from "../../../../API";
import PackageForm from "../Form";
import { isoDateToHumanReadableDate } from "../../../../Util";
import { useHistory } from "react-router-dom";
import "./styles.css";
import { useToggle } from "../../../../hooks/useToggle";
import TopSummary from "../../../components/TopSummary";
/* constants */
const packageSpan = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const status = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const subProjects = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const actualPhysicalProgress = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const plannedPyscalProgress = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const timeElapsed = { xxl: 2, xl: 2, lg: 2, md: 2, sm: 0, xs: 0 };
const financialProgress = { xxl: 2, xl: 2, lg: 2, md: 2, sm: 0, xs: 0 };
const Contractor = { xxl: 2, xl: 2, lg: 2, md: 2, sm: 0, xs: 0 };
const headerLayout = [
  { ...packageSpan, header: "Package" },
  { ...status, header: "Status" },
  { ...subProjects, header: "Sub-projects" },
  { ...actualPhysicalProgress, header: "Actial Physical Progress(%)" },
  { ...plannedPyscalProgress, header: "Planned Physical Progress(%)" },
  { ...timeElapsed, header: "Time elapsed(%)" },
  { ...financialProgress, header: "financial Progress(%)" },
  { ...Contractor, header: "Contractor" },
];

const PackagesList = ({
  getPackages,
  packages,
  loading,
  showForm,
  deletePackage,
  createPackage,
  updatePackage,
  procuringEntity,
  openPackageForm,
  closePackageForm,
  selectPackage,
  selected,
  match,
  getProcuringEntity,
}) => {
  const history = useHistory();
  const { isEditForm, setIsEditForm, setVisible } = useToggle(false);
  const [packageStatisticsValues, setPackageStatisticsValues] = useState([]);
  const [packData, setPackData] = useState([]);
  const procuringEntityId = getIdFromUrlPath(match.path, 4);
  const filter = { "filter[procuring_entity_id]": procuringEntityId };

  useEffect(() => {
    getPackages(filter);
    getProcuringEntity(procuringEntityId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    API.getPackageStatistics(1).then(
      (response) => {
        console.log(response);
        const packageStats = [
          { label: "In progress", value: response.data.in_progress },
          { label: "Complete", value: response.data.completed },
          { label: "Challenges", value: response.data.challenges },
          {
            label: "Latest Report",
            value: isoDateToHumanReadableDate(
              response.data.latestReport.created_at
            ),
          },
        ];
        setPackageStatisticsValues(packageStats);
      },
      API.getPackageStatisticsData(1).then((res) => {
        console.log(res.data);
        setPackData(res.data);
      })
    );
  }, []);
  /**
   * @function
   * @name handleViewDetails
   * @description Handle handleViewDetails action
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  const handleViewDetails = (item) => {
    const path = `${match.url}/${item.id}`;
    history.push(path);
  };

  /**
   * @function
   * @name handleClosePackageForm
   * @description close form
   * @version 0.1.0
   * @since 0.1.0
   */
  const handleClosePackageForm = () => {
    setIsEditForm(false);
    setVisible(false);
    selectPackage(null);
    closePackageForm();
  };

  /**
   * @function
   * @name handleRefresh
   * @description Handle refresh action
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  const handleRefresh = () => {
    getPackages(filter);
  };

  return (
    <>
      <div>
        {/* list starts */}
        <CustomList
          itemName="Packages"
          items={packData}
          page={1}
          itemCount={packData.length}
          topSummary={<TopSummary summaries={packageStatisticsValues} />}
          actionButtonProp={{
            title: "Packages",
            arrActions: [
              {
                btnName: "Add EHS Update ",
                btnAction: () => {},
              },
            ],
          }}
          loading={loading}
          onRefresh={handleRefresh}
          headerLayout={headerLayout}
          renderListItem={({ item }) => (
            <ListItem
              key={item.id} // eslint-disable-line
              name={item?.name}
              item={item}
              renderActions={() => (
                <ListItemActions
                  view={{
                    name: "View Details",
                    title: "View more detail of selected Package",
                    onClick: () => handleViewDetails(item),
                  }}
                />
              )}
            >
              {/* eslint-disable react/jsx-props-no-spreading */}

              <Col {...packageSpan}>{item?.name ? item?.name : "N/A"}</Col>
              <Col {...status} className="contentEllipse">
                Under Implemetation
              </Col>
              <Col {...subProjects}>
                {item.sub_projects_count ? item.sub_projects_count : "N/A"}
              </Col>
              <Col {...actualPhysicalProgress} className="contentEllipse">
                {item.progress.actual_physical_progress}
              </Col>
              <Col {...plannedPyscalProgress} className="contentEllipse">
                {item.progress.planned_physical_progress}
              </Col>
              <Col {...timeElapsed} className="contentEllipse">
                {"time"}
              </Col>
              <Col {...timeElapsed} className="contentEllipse">
                {"time"}
              </Col>
              <Col {...Contractor} className="contentEllipse">
                {"constructor"}
              </Col>

              {/* eslint-enable react/jsx-props-no-spreading */}
            </ListItem>
          )}
        />
        {/* end list */}

        <Drawer
          title={isEditForm ? "Edit Package" : "Add New Package"}
          width={550}
          onClose={handleClosePackageForm}
          footer={null}
          visible={showForm}
          bodyStyle={{ paddingBottom: 80 }}
          destroyOnClose
          maskClosable={false}
          className="projectForm"
        >
          <PackageForm
            isEditForm={isEditForm}
            selected={selected}
            createPackage={createPackage}
            loading={loading}
            updatePackage={updatePackage}
            procuringEntity={procuringEntity}
          />
        </Drawer>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    packages: ProcuringEntitySelectors.getPackagesSelector(state),
    loading: ProcuringEntitySelectors.loadingPackages(state),
    procuringEntity: ProcuringEntitySelectors.getProcuringEntitySelector(state),
    showForm: ProcuringEntitySelectors.showPackageFormSelector(state),
    selected: ProcuringEntitySelectors.selectedPackageSelector(state),
  };
};

const mapDispatchToProps = {
  getPackages: ProcuringEntityActions.getPackagesStart,
  deletePackage: ProcuringEntityActions.deletePackageStart,
  createPackage: ProcuringEntityActions.createPackageStart,
  updatePackage: ProcuringEntityActions.updatePackageStart,
  openPackageForm: ProcuringEntityActions.openPackageForm,
  closePackageForm: ProcuringEntityActions.closePackageForm,
  selectPackage: ProcuringEntityActions.selectPackage,
  getProcuringEntity: ProcuringEntityActions.getProcuringEntityStart,
};

PackagesList.propTypes = {
  getPackage: PropTypes.func.isRequired,
  packages: PropTypes.array.isRequired,
  procuringEntity: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  openPackageForm: PropTypes.func.isRequired,
  closePackageForm: PropTypes.func.isRequired,
  selectPackage: PropTypes.func.isRequired,
  showForm: PropTypes.bool,
  getProcuringEntity: PropTypes.func,
};

PackagesList.defaultProps = {
  packages: null,
  loading: null,
  isEditForm: null,
  showForm: null,
  getPackage: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(PackagesList);
