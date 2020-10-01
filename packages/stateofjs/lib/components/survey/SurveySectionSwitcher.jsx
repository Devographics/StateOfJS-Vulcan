import React from 'react';
import { useParams } from 'react-router-dom';
import SurveySectionReadOnly from './questions/SurveySectionReadOnly';
import SurveySection from './questions/SurveySection';

const SurveySectionSwitcher = () => {
  let { responseId } = useParams();
  return responseId === 'read-only' ? <SurveySectionReadOnly /> : <SurveySection />;
};

export default SurveySectionSwitcher;
