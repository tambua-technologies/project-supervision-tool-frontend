import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import API from '../../../API';



/**
 * @function
 * @name DisplaySurveyForm
 * @description renders kobotoobox survey form
 */
function DisplaySurveyForm({ survey_id }) {
    const [survey, setSurvey] = useState(null);

    useEffect(() => {
        API.getAsset(survey_id)
            .then(res => setSurvey(res));
    }, [survey_id]);

    return (
        <iframe
            src={survey?.deployment__links?.iframe_url}
            style={{width: '100%', height: '88vh', border: 'none'}}
            title={survey.deployment__links.title}
        />
    );
}


export default DisplaySurveyForm;

DisplaySurveyForm.propTypes = {
    survey_id: PropTypes.string
}