import React from 'react';
import surveys from '../../surveys';
import Users from 'meteor/vulcan:users';
import { Components, useCurrentUser, Utils } from 'meteor/vulcan:core';
import { getSurveyPath } from '../../modules/surveys/helpers';
import { Link } from 'react-router-dom';
import { statuses } from '../../modules/constants';
import LocaleSelector from '../common/LocaleSelector';
import Translators from '../common/Translators';

const SurveyItem = ({ survey }) => {
  const { imageUrl, name, resultsUrl } = survey;
  return (
    <div>
      <div className="survey-item">
        <div className="survey-image">
          <Link className="survey-link" to={getSurveyPath({ survey, home: true })}>
            <span className="survey-image-inner">
              <img src={`/surveys/${imageUrl}`} alt={`${name}`} />
            </span>
            <span className="survey-name">
              <span>
                {name}
              </span>
            </span>
          </Link>
        </div>
        {resultsUrl && (
          <a className="survey-item-results" href={resultsUrl} target="_blank" rel="noreferrer noopener">
            <Components.FormattedMessage id="general.survey_results" />
          </a>
        )}
      </div>
    </div>
  );
};

const SurveyGroup = ({ status }) => {
  const filteredSurveys = surveys.filter((s) => s.status === statuses[status]);
  return (
    <div className="surveys-group">
      <h3 className="surveys-group-heading">
        <Components.FormattedMessage id={`general.${status}_surveys`} defaultMessage={`${Utils.capitalize(status)} Surveys`} />
      </h3>
      {filteredSurveys.length > 0 ? (
        filteredSurveys.map((survey) => <SurveyItem key={survey.slug} survey={survey} />)
      ) : (
        <div className={`surveys-none surveys-no${status}`}>
          <Components.FormattedMessage id={`general.no_${status}_surveys`} />
        </div>
      )}
    </div>
  );
};

const Surveys = () => {
  const { currentUser } = useCurrentUser();
  const isAdmin = Users.isAdmin(currentUser);
  return (
    <div className="surveys">
      <LocaleSelector />
      {isAdmin && <SurveyGroup status="preview" />}
      <SurveyGroup status="open" />
      <SurveyGroup status="closed" />
      <Translators />
    </div>
  );
};

export default Surveys;
