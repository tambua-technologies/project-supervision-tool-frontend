
import React, {useEffect, useState} from "react";
import SurveySubmissions from "../../../SurveySubmissions";
import API from '../../../../../../../../API';

function ViewFieldNotes ({ subProject })
{

    const [surveys, setSurveys] = useState([]);

    const filterSurveys = (subProjectSurveys, kobotoolboxSurveys) => {
        const kobotoolboxSurveyIds = subProjectSurveys.map(({survey_id}) => survey_id);
        return kobotoolboxSurveys.filter(({uid}) => kobotoolboxSurveyIds.includes(uid));
    }

    useEffect(() => {
        const fieldNotes = subProject.surveys.filter(({category_name}) => category_name === 'field_notes');
        API.getAssets()
            .then(res => {
                const data = filterSurveys(fieldNotes, res.results);
                setSurveys(data);

            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return surveys.length > 0 ? (<SurveySubmissions surveys={surveys} />): '';
}

export  default ViewFieldNotes;
