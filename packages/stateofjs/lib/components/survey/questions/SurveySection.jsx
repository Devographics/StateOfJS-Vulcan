/*

1. Look for responseId and section number in URL params
2. Load response from server using withSingle2 HoC
3. Display response form restricted to questions of current section via `fields` prop

Note: form has a customized "FormSubmit" component to show the prev/next buttons

*/
import React from 'react';
import { Components, useSingle2 } from 'meteor/vulcan:core';
import { useParams, useHistory } from 'react-router-dom';
import surveys from '../../../surveys';
import SurveyNav from './SurveyNav.jsx';
import SurveySectionContents from './SurveySectionContents.jsx';

const SurveySection = () => {
  let { responseId, sectionNumber = 0 } = useParams();
  sectionNumber = parseInt(sectionNumber);

  const history = useHistory();

  const { document: response, loading } = useSingle2({
    collectionName: 'Responses',
    fragmentName: 'ResponseFragment',
    input: { id: responseId },
  });
  if (loading) {
    return <Components.Loading />;
  }
  const survey = surveys.find((s) => s.slug === response.survey.slug);
  const surveyOutline = survey.outline;
  const section = surveyOutline[sectionNumber];
  const previousSection = surveyOutline[sectionNumber - 1];
  const nextSection = surveyOutline[sectionNumber + 1];
  const sectionProps = {
    sectionNumber,
    section,
    response,
    previousSection,
    nextSection,
    history,
  };
  return (
    <div className="survey-section">
      <SurveyNav
        survey={response.survey}
        response={response}
        currentSectionNumber={sectionNumber}
      />
      <div className="section-contents">
        {loading ? (
          <Components.Loading />
        ) : !response ? (
          <p>Could not find survey.</p>
        ) : (
          <SurveySectionContents survey={survey} response={response} {...sectionProps} />
        )}
      </div>
    </div>
  );
};

export default SurveySection;
