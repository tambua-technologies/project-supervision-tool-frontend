import React, { useEffect, useState } from "react";
import { Drawer, Table, Image, Button, Select, Form, notification } from "antd";
import PropTypes from 'prop-types';
import API from "../../../../../../API";
import { isoDateToHumanReadableDate, stringToGeoJson } from "../../../../../../Util";
import Toolbar from "../Toolbar";
import DisplaySurveyForm from "../../../../../components/DisplaySurveyForm";
import ViewOnMap from "../../../../../components/ViewOnMap";
import './styles.css';

const ViewSubmissionOnMap = ({ data, showMApModal, handleOnCancel }) => <ViewOnMap showMApModal={showMApModal}
    handleOnCancel={handleOnCancel}
    data={data} />


const getAttachMentUrl = (attachments, name) => {
    return attachments.length > 0 ? attachments[0].download_url : '';
}

function SurveySubmissions({ surveys, handleGoBack, showBackButton }) {
    const [columns, setColumns] = useState([]);
    const [survey_id, setSurveyId] = useState('');
    const [features, setFeatures] = useState([]);
    const [feature, setFeature] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [showMapModel, setShowMapModal] = useState(false);

      /* eslint-disable no-unused-vars */
    const [dataExportUrl, setExportDataUrl] = useState(''); 


    const startDownloadNotification = () => {
        notification.open({
            message: 'Data Download has Started',
            duration: 4
        });
    };

    const endDownloadNotification = () => {
        notification.open({
            message: 'Data has been downloaded successfully',
            duration: 4
        });
    };


    useEffect(() => {
        const spatialColumn = columns.filter((c) => c.type === 'geoshape' || c.type === 'geotrace' || c.type === 'geopoint')[0];
        const data = dataSource.map((d) => stringToGeoJson(d[spatialColumn.key], spatialColumn.type));
        setFeatures(data);
    }, [dataSource]);  // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setSurveyId(surveys[0].uid);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        getData(survey_id);
        setIsModalVisible(false);
    };

    const handleOnMapCancel = () => setShowMapModal(false);
    const handleOnSubmissionMapCancel = () => {
        setShowMapModal(false);
        setFeature(null);
        getData(survey_id);
    }

    const handleOnPreviewSubmissionOnMap = (spatialData) => {
        setFeature(spatialData);
        setShowMapModal(true);
    }

    const downloadSubmissions = () => {
        startDownloadNotification();
        API.getAssetData(survey_id, 'geojson')
            .then(res => downloadObjectAsJson(res, `kobotoolbox_data_${survey_id}`));
    }

    function downloadObjectAsJson(exportObj, exportName) {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", exportName + ".geojson");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        endDownloadNotification();

    }


    const getData = value => API.getAsset(value)
        .then(res => {
            // kml_legacy
            setExportDataUrl(`https://kf.survey-project-supervision-tool.ga/api/v2/assets/${res.uid}/data.geojson`)
            const meta = res.content.survey.map(s => ({
                title: s.label ? s.label[0] : s.name,
                dataIndex: s.$autoname,
                key: s.$autoname, type: s.type,
                render: text => {
                    if (s.type === 'image')
                        return <Image width={200} src={text} />

                    if (s.type === 'geoshape' || s.type === 'geotrace' || s.type === 'geopoint') {
                        const geoJson = stringToGeoJson(text, s.type);
                        return text ? <Button onClick={() => {
                            handleOnPreviewSubmissionOnMap(geoJson)
                        }}>View on Map</Button> : 'N/A';

                    }

                    return text;
                },
            }))
            setColumns(meta);
            API.getAssetData(value)
                .then(res => setDataSource(res.results.map(r => {
                    const imageColumns = meta.filter(({ type }) => type === 'image');
                    let withFomratedDates = {
                        ...r,
                        end: isoDateToHumanReadableDate(r.end),
                        start: isoDateToHumanReadableDate(r.start),
                    }

                    for (let imageColumn of imageColumns) {
                        withFomratedDates[imageColumn.key] = getAttachMentUrl(r._attachments, r[imageColumn.key]);
                    }
                    return withFomratedDates;

                })));
        });

    useEffect(() => {
        if (survey_id) getData(survey_id);
    }, [survey_id]); // eslint-disable-line react-hooks/exhaustive-deps

    return survey_id ? (
        <section className="container">
            {showBackButton ? <Button onClick={handleGoBack} style={{ marginTop: '20px' }} type="primary" >Go Back</Button> :
                <Form initialValues={{ survey_id }}
                    style={{ paddingTop: '20px' }}
                >
                    <Form.Item
                        label="Displaying Images From"
                        name="survey_id"
                        rules={[{ required: false }]}
                    >
                        <Select style={{ width: '40%' }} size='medium' onChange={(v) => setSurveyId(v)}>
                            {surveys.map(({ name, uid }) => <option value={uid}>{name}</option>)}
                        </Select>
                    </Form.Item>
                </Form>}
            <Toolbar
                total={dataSource.length}
                changeDataSource={() => console.log('data source changed')}
                onRefresh={() => getData(survey_id)}
                showOnMap={() => setShowMapModal(true)}
                download={() => downloadSubmissions()}
                itemName="Field Notes"
                filterTo="To"
                actions={[
                    {
                        label: "Fill Field Notes",
                        size: "large",
                        title: "Fill Field Notes",
                        onClick: showModal,
                    },
                ]}
            />
            <Table dataSource={dataSource} columns={columns} className="SurveyTable" />
            <Drawer
                width={550}
                footer={null}
                onClose={handleCancel}
                visible={isModalVisible}
                destroyOnClose
                maskClosable={false}
                className="SurveyFormDrawer"
            >
                <DisplaySurveyForm survey_id={survey_id} />
            </Drawer>
            <ViewOnMap data={features} showMApModal={showMapModel} handleOnCancel={handleOnMapCancel} />
            {feature ? <ViewSubmissionOnMap data={[feature]} showMApModal={showMapModel}
                handleOnCancel={handleOnSubmissionMapCancel} /> : ''}
        </section>
    ) : '';
}

export default SurveySubmissions;
SurveySubmissions.propTypes = {
    surveys: PropTypes.array.isRequired,
    showBackButton: PropTypes.bool,
    handleGoBack: PropTypes.func,
}

SurveySubmissions.defaultProps = {
    showBackButton: false,
    handleGoBack: () => {
    },
}


