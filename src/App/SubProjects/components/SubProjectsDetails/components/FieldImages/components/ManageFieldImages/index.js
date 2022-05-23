import React, {useEffect, useState} from "react";
import {Col, Drawer, Modal} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";
import Topbar from "../../../../../../../components/Topbar";
import FieldImagesList from "../../../../../../../components/List";
import ListItem from "../../../../../../../components/ListItem";
import ListItemActions from "../../../../../../../components/ListItemActions";
import "./styles.css";
import API from '../../../../../../../../API';
import SurveyForm from "../../../../../SurveyForm";
import ImageGallary from "../../../SubProjectGallary";


/* constants */
const nameSpan = {xxl: 6, xl: 6, lg: 6, md: 6, sm: 20, xs: 20};
const descriptionSpan = {xxl: 12, xl: 12, lg: 12, md: 0, sm: 0, xs: 0};
const totalSubmissionsSpan = {xxl: 2, xl: 2, lg: 2, md: 2, sm: 0, xs: 0};

const {confirm} = Modal;

const headerLayout = [
    {...nameSpan, header: "Name"},
    {...descriptionSpan, header: "Description"},
    {...totalSubmissionsSpan, header: "Total submissions"},
];


/**
 * @function
 * @name Field Images
 * @description Render actions list which have search box, actions and List of field images
 * @version 0.1.0
 * @since 0.1.0
 */
function ManageFieldImages({ subProject, getSubProject }){
    const [showCreateSurveyForm, setShowCreateSurveyForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [surveys, setSurveys] = useState([]);
    const [selectedSurvey, setSelectedSurvey] = useState(null);

    useEffect(() => {
        handleGetFieldImages();
    }, [subProject]);  // eslint-disable-line react-hooks/exhaustive-deps

    /**
     * @function
     * @name handleGetFieldImages
     * @description Handle list refresh action
     * @version 0.1.0
     * @since 0.1.0
     */
    const handleGetFieldImages = () => {
        const {surveys} = subProject || [];
        const fieldImages = surveys.filter(({category_name}) => category_name === 'field_images');
        setLoading(true);
        API.getAssets()
            .then(res => {
                const data = filterSurveys(fieldImages, res.results);
                setLoading(false);
                setSurveys(data);
                setTotal(data.length);
            });
    };



    /**
     * @function
     * @name closeCreateSurveyForm
     * @version 0.1.0
     * @since 0.1.0
     */
    const closeCreateSurveyForm = () => {
        getSubProject(subProject.id);
        setShowCreateSurveyForm(false);
    }

    /**
     * @function
     * @name openCreateSurveyForm
     * @version 0.1.0
     * @since 0.1.0
     */
    const openCreateSurveyForm = () => setShowCreateSurveyForm(true);


    const filterSurveys = (subProjectSurveys, kobotoolboxSurveys) => {
        const kobotoolboxSurveyIds = subProjectSurveys.map(({survey_id}) => survey_id);
        return kobotoolboxSurveys.filter(({uid}) => kobotoolboxSurveyIds.includes(uid));
    }

    const archiveSurvey = (survey_id) => {
        const survey = subProject.surveys.find((s) => s.survey_id === survey_id);
        API.deleteSubProjectSurvey(survey.id)
            .then(() => getSubProject(survey.sub_project_id));
        API.archiveDeployedAsset(survey_id)
            .then(() => console.log('survey deleted successful'));
    }

    /**
     * @function
     * @name showArchiveConfirm
     * @description show confirm modal before archiving a subproject
     * @param {object} item Resource item to be archived
     *
     * @version 0.1.0
     * @since 0.1.0
     */
    const showArchiveConfirm = (item) => {
        confirm({
            title: `Are you sure you want to archive this record ?`,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: () => archiveSurvey(item.uid),
        });
    };

    const handleGoBack = () => setSelectedSurvey(null);


    return selectedSurvey ? <ImageGallary surveys={[selectedSurvey]} showBackButton={true} handleGoBack={handleGoBack}/> : (
        <div>
            {/* Topbar */}
            <Topbar
                search={{
                    size: "large",
                    placeholder: "Search for field images here...",
                    onSearch: () => {
                    },
                    value: ''
                }}
                actions={[
                    {
                        label: "New Field Image",
                        icon: <PlusOutlined/>,
                        size: "large",
                        title: "Add New Field Image",
                        onClick: openCreateSurveyForm,
                    },
                ]}
            />
            {/* end Topbar */}

            {/* list starts */}
            <FieldImagesList
                itemName="Field-Images"
                items={surveys}
                page={1}
                itemCount={total}
                loading={loading}
                onRefresh={handleGetFieldImages}
                headerLayout={headerLayout}
                renderListItem={({
                                     item,
                                     isSelected,
                                     onSelectItem,
                                     onDeselectItem,
                                 }) => (
                    <ListItem
                        key={item.uid} // eslint-disable-line
                        name={item.name}
                        item={item}
                        isSelected={isSelected}
                        onSelectItem={onSelectItem}
                        onDeselectItem={onDeselectItem}
                        renderActions={() => (
                            <ListItemActions
                                archive={{
                                    name: "Archive Field Image",
                                    title: "Remove Field Image from list of Field Images",
                                    onClick: () => showArchiveConfirm(item),
                                }}
                                view={{
                                    name: "View Field Image Submissions",
                                    title: "Click to View Field Image Submissions",
                                    onClick: () => setSelectedSurvey(item),
                                }}
                            />
                        )}
                    >
                        {/* eslint-disable react/jsx-props-no-spreading */}

                        <Col
                            {...nameSpan}
                            className="contentEllipse"
                            title={item.name}
                        >
                            {item.name}
                        </Col>

                        <Col {...descriptionSpan} className="contentEllipse"
                             title={item.settings?.description || 'N/A'}>

                            {item.settings?.description || 'N/A'}
                        </Col>

                        <Col {...totalSubmissionsSpan} className="contentEllipse">
                            {item.deployment__submission_count}
                        </Col>
                        {/* eslint-enable react/jsx-props-no-spreading */}
                    </ListItem>
                )}
            />
            {/* end list */}

            {/* Create Survey form */}
            <Drawer
                width={550}
                onClose={closeCreateSurveyForm}
                footer={null}
                visible={showCreateSurveyForm}
                destroyOnClose
                maskClosable={false}
                className="surveyForm"
            >
                <SurveyForm onCancel={closeCreateSurveyForm} selected={subProject}/>
            </Drawer>
        </div>
    );

}

ManageFieldImages.propTypes = {
    subProject: PropTypes.object.isRequired,
    getSubProject: PropTypes.func.isRequired,
};
export default ManageFieldImages;



