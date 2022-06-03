import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CustomList from "../components/List";
import TopSummary from "../components/TopSummary";
import ListItem from "../components/ListItem";
import ListItemActions from "../components/ListItemActions";
import {isoDateToHumanReadableDate} from "../../Util"
import { Col } from "antd";
import API from "../../API";
import { UPLOAD_SAFEGUARD_CONCERNS_ENDPOINT} from '../../API/endpoints';
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


const SafeguardConcerns = ({ match }) => {
  const [safeguardStatData, setSafeguardStatData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {procuringEntityId} = match.params;
  const [safeguardData, setSafeguardData] = useState([]);
  const history = useHistory();
  const handleViewDetails = (item) => {
    const path = `${match.url}/${item.id}`;
    history.push(path);
  };

  const getData = (id) => {
    setIsLoading(true);
    Promise.all([API.getSafeguardConcernsStatistics(id), API.getSafeguardConcerns(id)])
    .then(values => {
      setIsLoading(false);
      const [safeguardStats, safeguardConcerns] = values;
      const stats = [
        { label: "Environmental Concerns", value: safeguardStats.data.environmental_concerns_count },
        { label: "Social Concerns", value: safeguardStats.data.social_concerns_count },
        { label: "Safety and Health Concern", value: safeguardStats.data.health_and_safety_concerns_count },
        { label: "Latest Report", value: isoDateToHumanReadableDate(safeguardStats.data?.latestReport?.created_at ), cardType: 'date' },
      ];
      setSafeguardStatData(stats);
      setSafeguardData(safeguardConcerns.data);
  
    })
  }

  useEffect(() => {
    getData(procuringEntityId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleOnUploadSafeguardConcerns = (e) =>  {
    const file = e.target.files[0];
    API.upload(UPLOAD_SAFEGUARD_CONCERNS_ENDPOINT, file);
  }



  return (
    <>
      <div style={{padding: '30px 10px 20px 20px'}}>
        <CustomList
          itemName="Safeguard Concerns"
          items={safeguardData}
          topSummary={
            <TopSummary
              summaries={safeguardStatData}
            />
          }
          page={1}
          itemCount={safeguardData.length}
          loading={isLoading}
          onRefresh={() => getData(procuringEntityId)}
          actionButtonProp={{
            title: "Safeguard Concerns",
            arrActions: [
              {btnName: 'Import Safeguard Concerns', btnAction: handleOnUploadSafeguardConcerns, btnType: 'upload'}
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
