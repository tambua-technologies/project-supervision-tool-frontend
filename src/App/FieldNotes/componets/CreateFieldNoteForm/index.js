import { Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import DisplaySurveyForm from "../../../components/DisplaySurveyForm";

// constants
const fieldNotesKobotoolboxFormId = process.env.REACT_APP_FIELD_NOTES_FORM_ID;

const CreateFieldNoteForm = (props) => {
  const history = useHistory();

  return (
    <div>
      <Button
        type="primary"
        onClick={() => history.goBack()}
        style={{ position: "absolute", margin: 20 }}
      >
        Go Back
      </Button>
      <DisplaySurveyForm survey_id={fieldNotesKobotoolboxFormId} />
    </div>
  );
};

export default CreateFieldNoteForm;
