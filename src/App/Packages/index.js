import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  ProcuringEntityActions,
  ProcuringEntitySelectors,
} from "../../redux/modules/ProcuringEntities";
import PropTypes from "prop-types";
import { Col, Drawer } from "antd";
import CustomList from "../components/List";
import ListItem from "../components/ListItem";
import ListItemActions from "../components/ListItemActions";
import { isoDateToHumanReadableDate } from "../../Util";
import API from "../../API";
import { UPLOAD_PACKAGES_ENDPOINT } from "../../API/endpoints";
import PackageForm from "./componets/Form";
import { useHistory, Link } from "react-router-dom";
import "./styles.css";
import { useToggle } from "../../hooks/useToggle";
import TopSummary from "../components/TopSummary";
/* constants */
const packageSpan = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const subProjects = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const actualPhysicalProgress = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const plannedPyscalProgress = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const timeElapsed = { xxl: 2, xl: 2, lg: 2, md: 2, sm: 0, xs: 0 };
const financialProgress = { xxl: 2, xl: 2, lg: 2, md: 2, sm: 0, xs: 0 };
const Contractor = { xxl: 5, xl: 5, lg: 5, md: 5, sm: 0, xs: 0 };
const headerLayout = [
  { ...packageSpan, header: "Package" },
  { ...subProjects, header: "Sub-projects" },
  { ...actualPhysicalProgress, header: "Actual Physical Progress(%)" },
  { ...plannedPyscalProgress, header: "Planned Physical Progress(%)" },
  { ...financialProgress, header: "Financial Progress(%)" },
  { ...timeElapsed, header: "Time elapsed(%)" },
  { ...Contractor, header: "Contractor" },
];

const PackagesList = ({
  loading,
  showForm,
  createPackage,
  updatePackage,
  procuringEntity,
  closePackageForm,
  selectPackage,
  selected,
  match,
}) => {
  const history = useHistory();
  const { isEditForm, setIsEditForm, setVisible } = useToggle(false);
  const [packageStatisticsValues, setPackageStatisticsValues] = useState([]);
  const [packData, setPackData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {procuringEntityId} = match.params;
  const filter = { "filter[procuring_entity_id]": procuringEntityId };

  // calculate time elapsed in months
  const getTimeElapsed = (startDate, endDate) => {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      end.getMonth() -
      start.getMonth();
    return months;  // returns the number of months

  }

  // calculate percentage of time elapsed
  const getTimeElapsedPercentage = (startDate, endDate) => {
    const totalTime = getTimeElapsed(startDate, endDate);
    const today = new Date();
    const timeElapsed = getTimeElapsed(startDate, today);

    if(timeElapsed >= totalTime) return 100;
    const percentTime = (timeElapsed / totalTime) * 100;

    return Math.round(percentTime);

  }

  const getPackagesStats = (data) => ([
    {
      label: "In progress",
      value: data.in_progress
    },
    {
      label: "Complete",
      value: data.completed
    },
    {
      label: "Challenges",
      value: data.challenges
    },
    {
      label: "Latest Report",
      value: isoDateToHumanReadableDate(data?.latestReport?.created_at),
      cardType: "date",
    },
  ]);

  const getPackagesData = () => {
    setIsLoading(true);
    Promise.all([API.getPackageStatistics(procuringEntityId), API.getPackages(filter)])
    .then((res) => {
      setIsLoading(false);
      const packageStats = getPackagesStats(res[0].data);
      setPackageStatisticsValues(packageStats);
      setPackData(res[1].data);
    });

  }

 
  useEffect(() => {
    getPackagesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handlePackagesUpload = (e) => {
    const file = e.target.files[0];
    setIsLoading(true);
    API.upload(UPLOAD_PACKAGES_ENDPOINT, file).then((res) => {
      setIsLoading(false);
      getPackagesData();
    });
  }



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
    getPackagesData();
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
                btnName: "Import Packages",
                btnAction: handlePackagesUpload,
                btnType: "upload",
              },
            ],
          }}
          loading={isLoading}
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

              <Col {...packageSpan}>
                <Link to={{ pathname: `${match.url}/${item.id}` }}>
                  {item?.name ? item?.name : "N/A"}
                </Link>
              </Col>
              <Col {...subProjects}>
                {item.sub_projects_count ? item.sub_projects_count : 0}
              </Col>
              <Col {...actualPhysicalProgress} className="contentEllipse">
                {item?.progress?.actual_physical_progress || 'N/A'}
              </Col>
              <Col {...plannedPyscalProgress} className="contentEllipse">
                {item?.progress?.planned_physical_progress || 'N/A'}
              </Col>
              <Col {...timeElapsed} className="contentEllipse">
                {item?.progress?.actual_financial_progress || 'N/A'}
              </Col>
              <Col {...timeElapsed} className="contentEllipse">
                {getTimeElapsedPercentage(item?.contract?.date_of_commencement_of_works, item?.contract?.date_of_contract_completion)}
              </Col>
              <Col {...Contractor} className="contentEllipse">
                {item?.contract?.contractor?.name || 'N/A'}
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
  getPackage: () => { },
};

export default connect(mapStateToProps, mapDispatchToProps)(PackagesList);
