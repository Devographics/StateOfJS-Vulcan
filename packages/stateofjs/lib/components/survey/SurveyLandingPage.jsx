import React from 'react';
import { useParams } from 'react-router-dom';
import { default as allSurveys } from '../../surveys';
import SurveyItem from './SurveyItem.jsx';
import { Components, useCurrentUser } from 'meteor/vulcan:core';

const SurveyLandingPage = () => {
  const { slug } = useParams();
  const { currentUser } = useCurrentUser();
  const surveys = allSurveys.filter((s) => s.prettySlug === slug);

  return (
    <div>
      {surveys.map((survey) => (
        <SurveyItem key={survey.slug} survey={survey} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default SurveyLandingPage;
