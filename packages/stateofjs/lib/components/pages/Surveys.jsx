/*

1. Load all surveys
2. Get email from URL
3. If user is not logged in show log in form prefilled with email
4. If user is logged in, show list of surveys

TODO

- Use hooks

*/
import React from 'react';
import { Components, useCurrentUser } from 'meteor/vulcan:core';
// import SurveyItem from './SurveyItem.jsx';
import { STATES } from 'meteor/vulcan:accounts';
import qs from 'qs';
import AccountMessage from '../users/AccountMessage.jsx';
import { useLocation } from 'react-router-dom';
import surveys from '../../surveys';
import SurveyItem from '../survey/SurveyItem';
import { FormattedMessage } from 'meteor/vulcan:i18n';

const Surveys = () => {
  const location = useLocation();
  const { currentUser } = useCurrentUser();
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
        surveys.map((survey) => <SurveyItem key={survey.slug} survey={survey} currentUser={currentUser} />)
      ) : (
        <div>
          {/* <h3 className="surveys-title">The 2019 State of JavaScript Survey</h3>
          <div className="survey-closed">
            <FormattedMessage id="general.survey_closed" />{' '}
          </div> */}
          {email ? (
            <div className="message"><FormattedMessage id="accounts.please_pick_password" /></div>
          ) : (
            <div className="message"><FormattedMessage id="accounts.please_log_in" /></div>
          )}
          <Components.AccountsLoginForm formState={STATES.SIGN_UP} email={email} />
          <AccountMessage />
        </div>
      )}
    </div>
  );
};

export default Surveys;

