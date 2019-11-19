import React from 'react';
import { Components, registerComponent, withMulti2, withCurrentUser } from 'meteor/vulcan:core';
// import SurveyItem from './SurveyItem.jsx';

const Surveys = ({ loading, results, currentUser }) => (
  <div className="surveys">
    <Components.AccountsLoginForm />
    {currentUser ? (
      loading ? (
        <Components.Loading />
      ) : (
        results.map(survey => <Components.SurveyItem key={survey._id} survey={survey} />)
      )
    ) : (
      <p>Please log in or sign up to begin.</p>
    )}
  </div>
);

const options = {
  collectionName: 'Surveys',
  fragmentName: 'SurveyFragment',
};

registerComponent('Surveys', Surveys, [withMulti2, options], withCurrentUser);

export default Surveys;
