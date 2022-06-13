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


const columns = [
  {
    title: 'Package',
    dataIndex: 'package',
    key: 'package',
  },
  {
    title: 'SubProject',
    dataIndex: 'subProject',
    key: 'subProject',
  },
];

const childTableColumns = [
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Photo',
    dataIndex: 'photo',
    key: 'photo',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location'
  },
];




const getAttachMentUrl = (attachments, name) => {
  const {download_small_url = ''} = attachments.find((attachment) => attachment.filename.includes(name));

  const src= download_small_url.replace('?format=json', '');

  return <Image width={200} src={src} />
};


/**
 * @function FieldNotes
 * @description Render the FieldNotes component
 * @returns {JSX.Element}
 */
const FieldNotes = (props) => {
  const [fieldNotes, setFieldNotes] = useState([]);
  const [showMapModal, setShowMapModal] = useState(false);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);

  const fieldNotesFormId = process.env.REACT_APP_FIELD_NOTES_FORM_ID;
  const {match:{url}, history } = props;



  const handleOnPreviewSubmissionOnMap = (spatialData) => {
    setFeatures([...features, spatialData]);
    setShowMapModal(true);
  };

  const handleOnMapCancel = () => {
    setShowMapModal(false);
    setFeatures([]);
  };

  const prepareLocationValue = (location) => {
    const geoJson = stringToGeoJson(location, "geopoint");
    
    return (
    <Button 
    onClick={() => {handleOnPreviewSubmissionOnMap(geoJson)}}
    >
      View on Map
    </Button>
    );
  
  
  }
  
  const prepareFieldNotes = (fieldNotes) => {
    return fieldNotes.map((fieldNote) => {
      const {notes} = fieldNote;
      const children = notes.map((note) => {
        const photo = getAttachMentUrl(fieldNote._attachments, note['notes/photo']);
        const location = prepareLocationValue(note['notes/location']);
  
        return ({
          description: note['notes/description'],
           location,
            photo
          })
      });
  
      return {
        package: fieldNote?.package || 'N/A',
        subProject: fieldNote?.subProject || 'N/A',
        children
      };
    })
  }


 const getFieldNotes = () => {
  setLoading(true);
  API.getAssetData(fieldNotesFormId)
  .then(res => {
    const results = prepareFieldNotes(res.results);
    setFieldNotes(results);
    setLoading(false);
  })
 }

  useEffect(() => {
    getFieldNotes();
    
  }, []);
  

  return (
    <>
      <Toolbar
        onRefresh={() => getFieldNotes()}
        itemName="Field Notes"
        filterTo="To"
        actions={[
          {
            label: "Fill Field Notes",
            size: "large",
            title: "Fill Field Notes",
            onClick: () => history.push(`${url}/create`),
          },
        ]}
      />
      <Table
        columns={columns}
        loading={loading}
        expandable={{
          expandedRowRender: (record) => (<Table columns={childTableColumns} dataSource={record?.children || []} />),
        }}
        dataSource={fieldNotes}
      />
      <ViewOnMap
        data={features}
        showMApModal={showMapModal}
        handleOnCancel={handleOnMapCancel}
      />
    </>

  );
};

export default FieldNotes;
