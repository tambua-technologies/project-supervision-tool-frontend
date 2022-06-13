import React, { useEffect, useState } from "react";
import { Image, Button, Table} from "antd";
import API from "../../API";
import { stringToGeoJson } from "../../Util";
import ViewOnMap from "../components/ViewOnMap";
import Toolbar from "./componets/Toolbar";
import ActionBar from "../components/ActionBar";

import "./styles.css";



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
    <ActionBar
        actionButtonProp={{
          title: "Field Notes",
          arrActions: [
            {
              btnName: "Add Field Notes ",
              btnAction: () => history.push(`${url}/create`),
            }
          ],
        }}
      />
      <Toolbar
        onRefresh={() => getFieldNotes()}
        itemName="Field Notes"
        filterTo="To"
        actions={[]}
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
