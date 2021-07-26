import React from 'react';
import { Components } from 'meteor/vulcan:core';
import { statuses } from '../../modules/constants';

const SurveyMessage = ({ survey }) => {
  const { status } = survey;
  switch (status) {
    case statuses.preview:
      return (
        <div className="survey-message survey-preview">
          <Components.FormattedMessage id="general.survey_preview" />
        </div>
      );
    case statuses.closed:
      return (
        <div className="survey-message survey-closed">
          <Components.FormattedMessage id="general.survey_closed" />
        </div>
      );
    default:
      return null;
  }
};

export default SurveyMessage;
