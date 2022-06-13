import React, { useEffect, useState } from "react";
import { Drawer, Image, Button, Select, Form, notification, Badge, Dropdown, Menu, Space, Table} from "antd";
import { useDispatch, useSelector } from "react-redux";

import { DownOutlined } from '@ant-design/icons';
import PropTypes from "prop-types";
import API from "../../API";
import {
  ProcuringEntityActions,
  ProcuringEntitySelectors,
} from "../../redux/modules/ProcuringEntities";

import { isoDateToHumanReadableDate, stringToGeoJson } from "../../Util";
import "./styles.css";
import DisplaySurveyForm from "../components/DisplaySurveyForm";
import ViewOnMap from "../components/ViewOnMap";
import Toolbar from "./componets/Toolbar";
import BaseLayout from "../layouts/BaseLayout";
import DynamicBreadcrumbs from "../components/DynamicBreadcrumbs";

const ViewSubmissionOnMap = ({ data, showMApModal, handleOnCancel }) => (
  <ViewOnMap
    showMApModal={showMApModal}
    handleOnCancel={handleOnCancel}
    data={data}
  />
);

const getAttachMentUrl = (attachments, name) => {
  const url = attachments.length > 0 ? attachments[0].download_url : "";
  return url.replace("?format=json", "");
};

// function FieldNotes({ history, match }) {
//   const [columns, setColumns] = useState([]);
//   const [survey_id, setSurveyId] = useState("");
//   const [features, setFeatures] = useState([]);
//   const [feature, setFeature] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [dataSource, setDataSource] = useState([]);
//   const [showMapModel, setShowMapModal] = useState(false);

//   const dispatch = useDispatch();
//   const procuringEntity = useSelector(
//     ProcuringEntitySelectors.getProcuringEntitySelector
//   );

//   /* eslint-disable no-unused-vars */
//   const [dataExportUrl, setExportDataUrl] = useState("");

//   const startDownloadNotification = () => {
//     notification.open({
//       message: "Data Download has Started",
//       duration: 4,
//     });
//   };

//   const endDownloadNotification = () => {
//     notification.open({
//       message: "Data has been downloaded successfully",
//       duration: 4,
//     });
//   };

//   useEffect(() => {
//     const spatialColumn = columns.filter(
//       (c) =>
//         c.type === "geoshape" || c.type === "geotrace" || c.type === "geopoint"
//     )[0];
//     const data = dataSource.map((d) =>
//       stringToGeoJson(d[spatialColumn.key], spatialColumn.type)
//     );
//     setFeatures(data);
//     dispatch(
//       ProcuringEntityActions.getProcuringEntityStart(
//         match.params.procuringEntityId
//       )
//     );
//   }, [dataSource]); // eslint-disable-line react-hooks/exhaustive-deps

//   useEffect(() => {
//     setSurveyId("aLD6RspTPyijYdA63icUZ4");
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   const showModal = () => {
//     history.push(`${match.url}/create`);
//   };

//   const handleCancel = () => {
//     getData(survey_id);
//     setIsModalVisible(false);
//   };

//   const handleOnMapCancel = () => setShowMapModal(false);
//   const handleOnSubmissionMapCancel = () => {
//     setShowMapModal(false);
//     setFeature(null);
//     getData(survey_id);
//   };

//   const handleOnPreviewSubmissionOnMap = (spatialData) => {
//     setFeature(spatialData);
//     setShowMapModal(true);
//   };

//   const downloadSubmissions = () => {
//     startDownloadNotification();
//     API.getAssetData(survey_id, "geojson").then((res) =>
//       downloadObjectAsJson(res, `kobotoolbox_data_${survey_id}`)
//     );
//   };

//   function downloadObjectAsJson(exportObj, exportName) {
//     var dataStr =
//       "data:text/json;charset=utf-8," +
//       encodeURIComponent(JSON.stringify(exportObj));
//     var downloadAnchorNode = document.createElement("a");
//     downloadAnchorNode.setAttribute("href", dataStr);
//     downloadAnchorNode.setAttribute("download", exportName + ".geojson");
//     document.body.appendChild(downloadAnchorNode); // required for firefox
//     downloadAnchorNode.click();
//     downloadAnchorNode.remove();
//     endDownloadNotification();
//   }

//   const getData = (value) =>
//     API.getAsset(value).then((res) => {
//       // kml_legacy
//       setExportDataUrl(
//         `https://kf.survey-project-supervision-tool.ga/api/v2/assets/${res.uid}/data.geojson`
//       );
//       const meta = res.content.survey.map((s) => ({
//         title: s.label ? s.label[0] : s.name,
//         dataIndex: s.$autoname,
//         key: s.$autoname,
//         type: s.type,
//         render: (text) => {
//           if (s.type === "image") return <Image width={200} src={text} />;

//           if (
//             s.type === "geoshape" ||
//             s.type === "geotrace" ||
//             s.type === "geopoint"
//           ) {
//             const geoJson = stringToGeoJson(text, s.type);
//             return text ? (
//               <Button
//                 onClick={() => {
//                   handleOnPreviewSubmissionOnMap(geoJson);
//                 }}
//               >
//                 View on Map
//               </Button>
//             ) : (
//               "N/A"
//             );
//           }

//           return text;
//         },
//       }));
//       setColumns(meta);
//       API.getAssetData(value).then((res) => {
//         const data = res.results.map((r) => {
//           const imageColumns = meta.filter(({ type }) => type === "image");
//           let withFomratedDates = {
//             ...r,
//             end: isoDateToHumanReadableDate(r.end),
//             start: isoDateToHumanReadableDate(r.start),
//             notes:  'to be determined'
//           };

//           for (let imageColumn of imageColumns) {
//             withFomratedDates[imageColumn.key] = getAttachMentUrl(
//               r._attachments,
//               r[imageColumn.key]
//             );
//           }
//           return withFomratedDates;
//         });
//         setDataSource(data);
//       }
       
//       );
//     });

//   useEffect(() => {
//     if (survey_id) getData(survey_id);
//   }, [survey_id]); // eslint-disable-line react-hooks/exhaustive-deps

//   return survey_id ? (
//       <section>
//         <Toolbar
//           total={dataSource.length}
//           changeDataSource={() => console.log("data source changed")}
//           onRefresh={() => getData(survey_id)}
//           showOnMap={() => setShowMapModal(true)}
//           download={() => downloadSubmissions()}
//           itemName="Field Notes"
//           filterTo="To"
//           actions={[
//             {
//               label: "Fill Field Notes",
//               size: "large",
//               title: "Fill Field Notes",
//               onClick: showModal,
//             },
//           ]}
//         />
//         <Table
//           dataSource={dataSource}
//           columns={columns}
//           className="SurveyTable"
//         />
//         <Drawer
//           width={"100%"}
//           footer={null}
//           onClose={handleCancel}
//           visible={isModalVisible}
//           destroyOnClose
//           maskClosable={false}
//           bodyStyle={{ padding: 0 }}
//           className="SurveyFormDrawer"
//         >
//           <DisplaySurveyForm survey_id={survey_id} />
//         </Drawer>
//         <ViewOnMap
//           data={features}
//           showMApModal={showMapModel}
//           handleOnCancel={handleOnMapCancel}
//         />
//         {feature ? (
//           <ViewSubmissionOnMap
//             data={[feature]}
//             showMApModal={showMapModel}
//             handleOnCancel={handleOnSubmissionMapCancel}
//           />
//         ) : (
//           ""
//         )}
//       </section>
//   ) : (
//     ""
//   );
// }

// export default FieldNotes;
// FieldNotes.propTypes = {
//   showBackButton: PropTypes.bool,
//   handleGoBack: PropTypes.func,
// };

// FieldNotes.defaultProps = {
//   showBackButton: false,
//   handleGoBack: () => {},
// };



const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: 'Action 1',
      },
      {
        key: '2',
        label: 'Action 2',
      },
    ]}
  />
);

const FieldNotes = () => {
  const expandedRowRender = (row) => {
    console.log('expandedRowRender',row);
    const columns = [
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Upload Image',
        dataIndex: 'Upload_Image',
        key: 'Upload_Image',
      },
      
      {
        title: 'Location Image was taken',
        dataIndex: 'Location_Image_was_taken',
        key: 'Location_Image_was_taken',
      }
    ];
    const data = [];

    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        Location_Image_was_taken: '2014-12-24 23:12:00',
        description: 'This is production name',
        Upload_Image: 'Upgraded: 56',
      });
    }

    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    {
      title: 'Package',
      dataIndex: 'Package',
      key: 'Package',
    },
    {
      title: 'SubProject',
      dataIndex: 'Sub_Project',
      key: 'Sub_Project',
    },
  ];
  const data = [];

  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      Package: 'Screem',
      Sub_Project: 'iOS',
    });
  }

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandable={{
        expandedRowRender,
      }}
      dataSource={data}
    />
  );
};

export default FieldNotes;
