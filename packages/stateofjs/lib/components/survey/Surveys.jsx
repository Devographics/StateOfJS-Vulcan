/*

1. Load all surveys
2. Get email from URL
3. If user is not logged in show log in form prefilled with email
4. If user is logged in, show list of surveys

TODO

- Use hooks

*/
import React from 'react';
import { Components, registerComponent, withMulti2, withCurrentUser } from 'meteor/vulcan:core';
// import SurveyItem from './SurveyItem.jsx';
import { STATES } from 'meteor/vulcan:accounts';
import qs from 'qs';
import AccountMessage from '../users/AccountMessage.jsx';

const Surveys = ({ loading, results, currentUser, location }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true, decoder: (c) => c });
  const { email, source } = query;
  if (typeof window !== 'undefined') {
    if (email) {
      window.source = 'email';
    } else if (source) {
      window.source = source;
    }
  }
  return (
    <div className="surveys">
      {currentUser ? (
        loading ? (
          <Components.Loading />
        ) : (
          results.map(survey => <Components.SurveyItem key={survey._id} survey={survey} />)
        )
      ) : (
        <div>
          <h3 className="surveys-title">The 2019 State of JavaScript Survey</h3>
          <div className="survey-closed">Sorry, the survey is now closed! You can still log in to review your data but you won't be able to modify it.</div>
          {email ? (
            <div className="message">Please create a new password to continue.</div>
          ) : (
            <div className="message">Please log in or sign up to begin.</div>
          )}
          <Components.AccountsLoginForm formState={STATES.SIGN_UP} email={email} />
          <AccountMessage/>
        </div>
      )}
    </div>
  );
};

const options = {
  collectionName: 'Surveys',
  fragmentName: 'SurveyFragment',
};

registerComponent('Surveys', Surveys, [withMulti2, options], withCurrentUser);

export default Surveys;
