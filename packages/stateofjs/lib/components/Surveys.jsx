import React from 'react';
import { Components, registerComponent, withMulti2 } from 'meteor/vulcan:core';
import { Link } from 'react-router-dom';

const SurveyItem = ({ survey }) => {
  const { pagePath, name, year } = survey;
  return (
    <div className="survey-item">
      <Link to={pagePath}>
        {name} {year}
      </Link>
    </div>
  );
};

const Surveys = ({ loading, results }) => (
  <div className="surveys">
    Home Page
    <Components.AccountsLoginForm />
    {loading ? <Components.Loading /> : results.map(survey => <SurveyItem survey={survey} />)}
  </div>
);

const options = {
  collectionName: 'Surveys',
  fragmentName: 'SurveyFragment',
};

registerComponent('Surveys', Surveys, [withMulti2, options]);

export default Surveys;
