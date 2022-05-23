import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  ProcuringEntityActions,
  ProcuringEntitySelectors,
} from "../../../../redux/modules/ProcuringEntities";
import PropTypes from "prop-types";
import {
  Col,
  Drawer,
  Row,
  Card,
} from "antd";
import CustomList from "../../../components/List";
import ListItem from "../../../components/ListItem";
import ListItemActions from "../../../components/ListItemActions";
import { getIdFromUrlPath } from "../../../../Util";
import PackageForm from "../Form";
import { useHistory } from "react-router-dom";
import "./styles.css";
import { useToggle } from "../../../../hooks/useToggle";

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
  const procuringEntityId = getIdFromUrlPath(match.path, 4);
  const filter = { "filter[procuring_entity_id]": procuringEntityId };


  useEffect(() => {
    getPackages(filter);
    getProcuringEntity(procuringEntityId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
              <Card bordered={true} className="text-blue">
                <span>10</span>
                <h4>In progress</h4>
              </Card>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
              <Card bordered={true} className="text-blue">
                <span>3</span>
                <h4>Completed</h4>
              </Card>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
              <Card bordered={true} className="text-blue">
                <span>2</span>
                <h4>Challenges</h4>
              </Card>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
              <Card bordered={true} className="text-blue">
                <h4>Last report</h4>
                <h4>May 12 2021</h4>
              </Card>
            </Col>
          </Row>
        </div>
        {/* list starts */}
        <CustomList
          itemName="Packages"
          items={packages}
          page={1}
          itemCount={packages.length}
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
              <Col {...subProjects}>[item.sub_projects.length]</Col>
              <Col {...actualPhysicalProgress} className="contentEllipse">
                {"actual"}
              </Col>
              <Col {...plannedPyscalProgress} className="contentEllipse">
                {"actual funiancial"}
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
