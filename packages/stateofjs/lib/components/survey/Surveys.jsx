import React from 'react';
import { Components, registerComponent, withMulti2, withCurrentUser } from 'meteor/vulcan:core';
// import SurveyItem from './SurveyItem.jsx';
import Alert from 'react-bootstrap/Alert';

const Surveys = ({ loading, results, currentUser }) => (
  <div className="surveys">
    {currentUser ? (
      loading ? (
        <Components.Loading />
      ) : (
        results.map(survey => <Components.SurveyItem key={survey._id} survey={survey} />)
      )
    ) : (
      <div>
        <Alert variant="info">Please log in or sign up to begin.</Alert>
        <Components.AccountsLoginForm />
      </div>
    )}
  </div>
);

const options = {
  collectionName: 'Surveys',
  fragmentName: 'SurveyFragment',
};

registerComponent('Surveys', Surveys, [withMulti2, options], withCurrentUser);

export default Surveys;
