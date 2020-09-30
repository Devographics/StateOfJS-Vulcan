import React from 'react';
import { Link } from 'react-router-dom';
import ShareSite from '../share/ShareSite.jsx';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { useParams } from 'react-router-dom';
import { getSurvey } from '../../modules/surveys/helpers';

const Thanks = () => {
  const { slug, year } = useParams();
  const survey = getSurvey(slug, year);
  return (
    <div className="contents-narrow thanks">
      <p>
        <FormattedMessage id="general.thanks" />
      </p>
      <p>
        <FormattedMessage id="general.review_data" />
      </p>
      <p>
        <FormattedMessage id="general.help_share" />
      </p>
      <ShareSite survey={survey} />
      <p>
        <Link to="/">
          <FormattedMessage id="general.back" />
        </Link>
      </p>
    </div>
  );
};

export default Thanks;
