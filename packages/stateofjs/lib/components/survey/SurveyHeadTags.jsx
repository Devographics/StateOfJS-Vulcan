import React from 'react';
import { Components } from 'meteor/vulcan:core';

const SurveyHeadTags = ({ survey }) => {
  const { name, year, imageUrl } = survey;
  return <Components.HeadTags title={`${name} ${year}`} image={`/surveys/${imageUrl}`} />;
};

export default SurveyHeadTags;