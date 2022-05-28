import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CustomList from "../components/List";
import TopSummary from "../components/TopSummary";
import ListItem from "../components/ListItem";
import ListItemActions from "../components/ListItemActions";
import {isoDateToHumanReadableDate} from "../../Util"
import { Col } from "antd";
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


const SafeguardConcerns = ({ packages, loading, handleRefresh, match }) => {
  const [safeguardStatData, setSafeguardStatData] = useState([]);
  const [safeguardData, setSafeguardData] = useState([]);
  const history = useHistory();
  const handleViewDetails = (item) => {
    const path = `${match.url}/${item.id}`;
    history.push(path);
  };

  useEffect(() => {
    API.getSafeguardConcerns()
      .then((res) => {
        setSafeguardStatData(res.data.data);
        console.log("safeguard concerns", res.data.data);
       
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    API.getProcuringEntitiesStatistics(1).then((res) => {
      console.log(res.data);
      const safeguardStats = [
        { label: "Environmental Concerns", value: res.data.environmental_concerns_count },
        { label: "Social Concerns", value: res.data.social_concerns_count },
        { label: "Safety and Health Concern", value: res.data.health_and_safety_concerns_count },
        { label: "Latest Report", value: isoDateToHumanReadableDate(res.data.latestReport.created_at )},
      ]
      setSafeguardData(safeguardStats)
    }
    );

  }, []);
  console.log(safeguardData);
  return (
    <>
      <div>
        <CustomList
          itemName="Packages"
          items={safeguardStatData}
          topSummary={
            <TopSummary
              summaries={safeguardData}
            />
          }
          page={1}
          itemCount={safeguardStatData.length}
          loading={safeguardStatData.length === 0}
          onRefresh={handleRefresh}
          actionButtonProp={{
            title: "Safeguard Concerns",
            arrActions: [
              {
                btnName: "Add EHS Update ",
                btnAction: () => {},
              },
            ],
          }}
          headerLayout={headerLayout}
          renderListItem={({ item }) => (
            <ListItem
              key={item.id} // eslint-disable-line
              name={"iddi"}
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
                {item?.package?.name ? item?.package?.name : "N/A"}
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
