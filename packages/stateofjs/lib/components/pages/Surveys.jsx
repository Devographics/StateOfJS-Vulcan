import React from 'react';
import surveys from '../../surveys';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { getSurveyPath } from '../../modules/surveys/helpers';
import { Link } from 'react-router-dom';
import { statuses } from '../../modules/constants';

const SurveyItem = ({ survey }) => {
  const { imageUrl, name, year, resultsUrl } = survey;
  return (
    <div>
      <div className="survey-item">
        <div className="survey-image">
          <Link className="survey-link" to={getSurveyPath({ survey, home: true })}>
            <span className="survey-image-inner">
              <img src={`/surveys/${imageUrl}`} alt={`${name} ${year}`} />
            </span>
            <span className="survey-name">
              <span>
                {name} {year}
              </span>
            </span>
          </Link>
        </div>
        {resultsUrl && (
          <a className="survey-item-results" href={resultsUrl} target="_blank" rel="noopener">
            <FormattedMessage id="general.survey_results" />
          </a>
        )}
      </div>
    </div>
  );
};

const Surveys = () => {
  const openSurveys = surveys.filter((s) => s.status === statuses.open);
  const closedSurveys = surveys.filter((s) => s.status === statuses.closed);
  return (
    <div className="surveys">
      <div className="surveys-group">
        <h3 className="surveys-group-heading">
          <FormattedMessage id="general.open_surveys" />
        </h3>
        {openSurveys.length > 0 ? (
          openSurveys.map((survey) => <SurveyItem key={survey.slug} survey={survey} />)
        ) : (
          <div className="surveys-noopen">
            <FormattedMessage id="general.no_open_surveys" />
          </div>
        )}
      </div>
      <div className="surveys-group">
        <h3 className="surveys-group-heading">
          <FormattedMessage id="general.closed_surveys" />
        </h3>
        {closedSurveys.map((survey) => (
          <SurveyItem key={survey.slug} survey={survey} />
        ))}
      </div>
    </div>
  );
};

export default Surveys;
