import React from 'react';
import { useParams } from 'react-router-dom';
import SurveySectionReadOnly from './SurveySectionReadOnly';
import SurveySection from './SurveySection';

const SurveySectionSwitcher = () => {
  let { responseId } = useParams();
  return responseId === 'read-only' ? <SurveySectionReadOnly /> : <SurveySection />;
};

export default SurveySectionSwitcher;
