import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import CustomList from "../components/List";
import TopSummary from "../components/TopSummary";
import ListItem from "../components/ListItem";
import ListItemActions from "../components/ListItemActions";
import { Col, Row, Card } from "antd";
import API from "../../API";
const packageSpan = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const concernType = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const issue = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const commitment = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const stepsTaken = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const challenges = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const mitigationMeasures = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };

const headerLayout = [
  { ...packageSpan, header: "Package" },
  { ...concernType, header: "Concern Type" },
  { ...issue, header: "Issue" },
  { ...commitment, header: "Commitment" },
  { ...stepsTaken, header: "Steps Taken" },
  { ...challenges, header: "Challenges" },
  { ...mitigationMeasures, header: "Mitigation Measures" },
];

const dummyData = [
  {
    package: "Package 1",
    concern_type: "Environmental",
    issue: "Noise and vibration",
    commitment: "High Impact noise and vibration",
    steps_taken: "compiled",
    challenges: "none",
    mitigation_measures: " - ",
  },
  {
    package: "Package 2",
    concern_type: "Social",
    issue: "Employment",
    commitment: "About 148 workers have been employed",
    steps_taken: "employees provided with contracts",
    challenges: "none",
    mitigation_measures: " - ",
  },
];

const SafeguardConcerns = ({ packages, loading, handleRefresh, match }) => {
  const history = useHistory();
  const handleViewDetails = (item) => {
    const path = `${match.url}/${item.id}`;
    history.push(path);
  };

  useEffect(() => {
    API.getSafeguardConcerns()
      .then((res) => console.log("safeguard concerns", res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div>
        <CustomList
          itemName="Packages"
          items={dummyData}
          topSummary={
            <TopSummary
              summaries={[
                { label: "iddi", value: "msangi" },
                { label: "iddi", value: "msangi" },
                { label: "iddi", value: "msangi" },
              ]}
            />
          }
          page={1}
          itemCount={dummyData.length}
          loading={loading}
          onRefresh={handleRefresh}
          actionButtonProp={{
            title: "Safeguard Concerns",
            arrActions: [
              {
                btnName: "Add EHS Update ",
                btnAction: () => {},
              }
            ],
          }}
          headerLayout={headerLayout}
          renderListItem={({ item }) => (
            <ListItem
              key={item.id} // eslint-disable-line
              name={item?.package}
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
                {/* {item?.package ? item?.package : "N/A"} */}
                {"package"}
              </Col>
              <Col {...concernType} className="contentEllipse">
                {item?.concern_type ? item?.concern_type : "N/A"}
              </Col>
              <Col {...issue}>{item?.issue ? item?.issue : "N/A"}</Col>
              <Col {...commitment} className="contentEllipse">
                {item?.commitment ? item?.commitment : "N/A"}
              </Col>
              <Col {...stepsTaken} className="contentEllipse">
                {item?.steps_taken ? item?.steps_taken : "N/A"}
              </Col>
              <Col {...challenges} className="contentEllipse">
                {item?.challenges ? item?.challenges : "N/A"}
              </Col>
              <Col {...mitigationMeasures} className="contentEllipse">
                {item?.mitigation_measures ? item?.mitigation_measures : "N/A"}
              </Col>

              {/* eslint-enable react/jsx-props-no-spreading */}
            </ListItem>
          )}
        />
      </div>
    </>
  );
};

export default SafeguardConcerns;
