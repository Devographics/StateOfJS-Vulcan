import React from 'react';
import { Components, useCurrentUser } from 'meteor/vulcan:core';
import { useParams, useLocation } from 'react-router-dom';
import { STATES } from 'meteor/vulcan:accounts';
import AccountMessage from '../../users/AccountMessage.jsx';
import { intlShape, IntlContext } from 'meteor/vulcan:i18n';
import qs from 'qs';
import SurveyAction from './SurveyAction';
import { getSurvey } from '../../../modules/surveys/helpers';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import SurveyHeadTags from '../SurveyHeadTags';
import SurveyMessage from '../SurveyMessage';

const SurveyPageWrapper = (props, { intl }) => {
  const { slug, year } = useParams();
  const survey = getSurvey(slug, year);
  const { imageUrl, name, slug: surveySlug } = survey;
  return (
    <IntlContext.Consumer>
      {(props) => {
        // console.log(props)
        return (
          <div className="survey-page contents-narrow">
            <SurveyHeadTags survey={survey} />
            <SurveyMessage survey={survey} />

            <h1 className="survey-image">
              <img src={`/surveys/${imageUrl}`} alt={`${name} ${year}`} />
            </h1>
            <SurveyIntro survey={survey} />
            <SurveyPage survey={survey} />
          </div>
        );
      }}
    </IntlContext.Consumer>
  );
};

SurveyPageWrapper.contextTypes = {
  intl: intlShape,
};

const SurveyIntro = ({ survey }, { intl }) => (
  <div className="survey-intro">
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
      {intl.formatMessage({ id: `general.survey_intro_${survey.slug}` })}
    </ReactMarkdown>
  </div>
);

SurveyIntro.contextTypes = {
  intl: intlShape,
};

const SurveyPage = ({ survey }) => {
  const { currentUser, currentUserLoading } = useCurrentUser();

  const location = useLocation();

  const query = qs.parse(location.search, { ignoreQueryPrefix: true, decoder: (c) => c });
  const { email } = query;

  if (currentUserLoading) {
    return <Components.Loading />;
  } else if (!currentUser) {
    return (
      <div className="survey-actions">
        {email ? (
          <div className="message survey-page-message">
            <Components.FormattedMessage id="accounts.please_pick_password" />
          </div>
        ) : (
          <div className="message survey-page-message">
            <Components.FormattedMessage id="accounts.please_log_in" />
          </div>
        )}
        <Components.AccountsLoginForm redirect={false} formState={STATES.SIGN_UP} email={email} />
        <AccountMessage />
      </div>
    );
  } else {
    return <SurveyAction survey={survey} currentUser={currentUser} />;
  }
};

export default SurveyPageWrapper;
