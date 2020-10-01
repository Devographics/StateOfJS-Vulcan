import React from 'react';
import ShareSite from '../share/ShareSite.jsx';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { useParams } from 'react-router-dom';
import { getSurvey } from '../../modules/surveys/helpers';

const Thanks = () => {
  const { slug, year } = useParams();
  const survey = getSurvey(slug, year);
  const { imageUrl, name } = survey;
  return (
    <div className="contents-narrow thanks">
      <h1 className="survey-image">
        <img src={`/surveys/${imageUrl}`} alt={`${name} ${year}`} />
      </h1>
      <div>
        <FormattedMessage id="general.thanks" />
      </div>
      <ShareSite survey={survey} />
    </div>
  );
};

export default Thanks;
