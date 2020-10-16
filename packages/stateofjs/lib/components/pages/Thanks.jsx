import React from 'react';
import ShareSite from '../share/ShareSite.jsx';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { getSurveyPath } from '../../modules/surveys/helpers';
import { Components, useSingle2 } from 'meteor/vulcan:core';
import { useHistory, useParams } from 'react-router-dom';
import surveys from '../../surveys';
import Score from '../common/Score';

const Thanks = () => {
  const { responseId } = useParams();
  const history = useHistory();

  const { document: response, loading } = useSingle2({
    collectionName: 'Responses',
    fragmentName: 'ResponseFragmentWithRanking',
    input: { id: responseId },
  });

  if (loading) {
    return <Components.Loading />;
  }

  const survey = surveys.find((s) => s.slug === response.survey.slug);
  const { imageUrl, name, year } = survey;

  return (
    <div className="contents-narrow thanks">
      <h1 className="survey-image survey-image-small">
        <img src={`/surveys/${imageUrl}`} alt={`${name} ${year}`} />
      </h1>
      <Score response={response} survey={survey} />
      <div>
        <FormattedMessage id="general.thanks" />
      </div>
      <ShareSite survey={survey} />
      <div className="form-submit form-section-nav form-section-nav-bottom">
        <div className="form-submit-actions">
          <Components.Button
            className="form-btn-prev"
            type="submit"
            variant="primary"
            onClick={async (e) => {
              e.preventDefault();
              history.push(getSurveyPath({ survey, response, number: survey.outline.length }));
            }}
          >
            « <FormattedMessage id="general.back" />
          </Components.Button>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
