/*

Page for a single survey (Not currently used)

*/
import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import SurveyItem from './SurveyItem.jsx';

const SurveyPageWithData = ({ match }) => {
  const { slug, year } = match;
  return <Components.SurveyPage input={{ filter: { _and: { slug: { _eq: slug }, year: { _eq: year } } } }} />;
};
registerComponent('SurveyPageWithData', SurveyPageWithData);

const SurveyPage = ({ loading, document: survey, history }) => (
  <div className="survey">{loading ? <Components.Loading /> : <SurveyItem survey={survey} />}</div>
);

// const options = {
//   collectionName: 'Surveys',
//   fragmentName: 'SurveyFragment',
// };
// registerComponent('SurveyPage', SurveyPage, [withSingle2, options]);

export default SurveyPage;
