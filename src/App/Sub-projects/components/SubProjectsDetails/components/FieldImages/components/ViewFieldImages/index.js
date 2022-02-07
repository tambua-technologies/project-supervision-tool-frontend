
import React, {useEffect, useState} from "react";
import API from '../../../../../../../../API';
import ImageGallary from "../../../SubProjectGallary";

function ViewFieldImages ({ subProject })
{

    const [surveys, setSurveys] = useState([]);

    const filterSurveys = (subProjectSurveys, kobotoolboxSurveys) => {
        const kobotoolboxSurveyIds = subProjectSurveys.map(({survey_id}) => survey_id);
        return kobotoolboxSurveys.filter(({uid}) => kobotoolboxSurveyIds.includes(uid));
    }

    useEffect(() => {
        API.getAssets()
            .then(res => {
                const data = filterSurveys(subProject.surveys, res.results);
                setSurveys(data);

            });
    }, []);

    return surveys.length > 0 ? (<ImageGallary surveys={surveys}/> ): '';
}

export  default ViewFieldImages;
