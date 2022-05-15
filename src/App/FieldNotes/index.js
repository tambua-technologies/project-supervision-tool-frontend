import React, { useEffect, useState } from "react";
import { Drawer, Table, Image, Button, Select, Form, notification } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import API from "../../API";
import { ProcuringEntityActions, ProcuringEntitySelectors } from '../../redux/modules/ProcuringEntities';

import { isoDateToHumanReadableDate, stringToGeoJson } from "../../Util";
import './styles.css';
import DisplaySurveyForm from "../components/DisplaySurveyForm";
import ViewOnMap from "../components/ViewOnMap";
import Toolbar from "./componets/Toolbar";
import BaseLayout from "../layouts/BaseLayout";
import DynamicBreadcrumbs from "../components/DynamicBreadcrumbs";

const ViewSubmissionOnMap = ({ data, showMApModal, handleOnCancel }) => <ViewOnMap showMApModal={showMApModal}
    handleOnCancel={handleOnCancel}
    data={data} />


const getAttachMentUrl = (attachments, name) => {
    const url = attachments.length > 0 ? attachments[0].download_url : ''; 
    return url.replace('?format=json', '');
}

function FieldNotes({handleGoBack, showBackButton, match }) {
    const [columns, setColumns] = useState([]);
    const [survey_id, setSurveyId] = useState('');
    const [features, setFeatures] = useState([]);
    const [feature, setFeature] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [showMapModel, setShowMapModal] = useState(false);

    const dispatch = useDispatch();
    const procuringEntity = useSelector(ProcuringEntitySelectors.getProcuringEntitySelector);


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
        dispatch(ProcuringEntityActions.getProcuringEntityStart(match.params.procuringEntityId));
    }, [dataSource]);  // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setSurveyId('aLD6RspTPyijYdA63icUZ4');
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        getData(survey_id);
        setIsModalVisible(false);
    };

    const getBreadcrumbs = () => {
        return procuringEntity ? [
        
            {
                title: `${procuringEntity.agency.name}`,
                url: `/projects/${procuringEntity.project.id}/procuring_entities/${procuringEntity.id}`,
                name: `${procuringEntity.agency.name}`
            },
            {
                title: `Field Notes`,
                url: match.url,
                name: `Field Notes`
            }
        ] : [];
    }

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
        <BaseLayout breadcrumbs={<DynamicBreadcrumbs breadcrumbs={getBreadcrumbs()} />}>
        <section className="container">
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
                width={'100%'}
                footer={null}
                onClose={handleCancel}
                visible={isModalVisible}
                destroyOnClose
                maskClosable={false}
                bodyStyle={{ padding: 0 }}
                className="SurveyFormDrawer"
            >
                <DisplaySurveyForm survey_id={survey_id} />
            </Drawer>
            <ViewOnMap data={features} showMApModal={showMapModel} handleOnCancel={handleOnMapCancel} />
            {feature ? <ViewSubmissionOnMap data={[feature]} showMApModal={showMapModel}
                handleOnCancel={handleOnSubmissionMapCancel} /> : ''}
        </section>
        </BaseLayout>
    ) : '';
}

export default FieldNotes;
FieldNotes.propTypes = {
    showBackButton: PropTypes.bool,
    handleGoBack: PropTypes.func,
}

FieldNotes.defaultProps = {
    showBackButton: false,
    handleGoBack: () => {
    },
}


