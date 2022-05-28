
import {Button, Drawer, Form, Image, Select} from 'antd';
import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import API from '../../../../../../API';

import Toolbar from '../Toolbar';
import './styles.css';
import DisplaySurveyForm from "../../../../../components/DisplaySurveyForm";

 const ImageGallary = ({ surveys, handleGoBack, showBackButton }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
     const [survey_id, setSurveyId] = useState('');
     const [imgUrls, setImgUrls] = useState([]);

     useEffect(() => {
         setSurveyId(surveys[0].uid);
     }, [surveys]);

    const getData = value => API.getAssetData(value)
        .then(res => {
            const urls = res.results.map((result) => result._attachments.map(({ download_url }) => download_url));
            setImgUrls(urls.flat());
        });

    useEffect(() => {
        getData(survey_id)
    }, [survey_id]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        getData(survey_id)
        setIsModalVisible(false);
    };

  return survey_id ? (
    <section className="ImageGallary container">
        {showBackButton ? <Button onClick={handleGoBack} style={{marginTop: '20px'}} type="primary" >Go Back</Button> :
            <Form initialValues={{survey_id}}
                  style={{paddingTop: '20px'}}
            >
                <Form.Item
                    label="Displaying Submissions From"
                    name="survey_id"
                    rules={[{required: false}]}
                >
                    <Select style={{width: '40%'}} size='medium' onChange={(v) => setSurveyId(v)}>
                        {surveys.map(({name, uid}) => <option value={uid}>{name}</option>)}
                    </Select>
                </Form.Item>
            </Form>}
      <Toolbar
        total={imgUrls.length}
        itemName="PhotoGallary"
        onRefresh={() => getData(survey_id)}
        // exportUrl={true}
        // onFilter={true}
        // filterData="20/2/2020"
        // filterFrom="Showing images from:"
        filterTo="To"
        actions={[
          {
            label: "Upload new photo",
            size: "large",
            title: "Upload New photo",
            onClick: () => showModal(),
          },
        ]}
      />
      <Image.PreviewGroup>
        {
          imgUrls.map(url => {
            return (
              <Image
                width={300}
                src={url}
              />
            )
          })
        }

      </Image.PreviewGroup>
        <Drawer
            width={550}
            footer={null}
            onClose={handleCancel}
            visible={isModalVisible}
            destroyOnClose
            maskClosable={false}
        >
            <DisplaySurveyForm survey_id={survey_id} />
        </Drawer>
    </section>
  ): '';
}

export default ImageGallary;

 ImageGallary.propTypes = {
     surveys: PropTypes.string.isRequired,
     handleGoBack: PropTypes.func,
     showBackButton: PropTypes.bool,
 }

 ImageGallary.defaultProps = {
     showBackButton: false,
     handleGoBack: () => {},
 }

