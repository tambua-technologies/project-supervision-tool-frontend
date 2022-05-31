
import { Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import DisplaySurveyForm from "../../../components/DisplaySurveyForm";


const CreateReportForm = (props) => {

    const history = useHistory();

    return (
    <div>
        <Button type="primary" onClick={() => history.goBack()} style={{ position: 'absolute', margin: 20 }}>Go Back</Button>
        <DisplaySurveyForm survey_id="apQUo4bqoEHmKNoPgaPq6F" />
    </div>
    );
}


export default CreateReportForm;