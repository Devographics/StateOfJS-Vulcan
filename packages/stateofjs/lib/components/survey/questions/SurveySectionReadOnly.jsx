import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import SurveyNav from './SurveyNav.jsx';
import SurveySectionContents from './SurveySectionContents.jsx';
import { getSurvey } from '../../../modules/surveys/helpers';

const SurveySectionReadOnly = () => {
  let { slug, year, sectionNumber = 0 } = useParams();
  sectionNumber = parseInt(sectionNumber);

  const history = useHistory();

  const survey = getSurvey(slug, year);
  const surveyOutline = survey.outline;
  const section = surveyOutline[sectionNumber];
  const previousSection = surveyOutline[sectionNumber - 1];
  const nextSection = surveyOutline[sectionNumber + 1];
  const sectionProps = {
    sectionNumber,
    section,
    previousSection,
    nextSection,
    history,
  };
  return (
    <div className="survey-section">
      <SurveyNav survey={survey} currentSectionNumber={sectionNumber} readOnly={true} />
      <div className="section-contents">
        <SurveySectionContents survey={survey} {...sectionProps} readOnly={true}/>
      </div>
    </div>
  );
};

export default SurveySectionReadOnly;
