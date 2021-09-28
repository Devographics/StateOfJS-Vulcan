import React from 'react';
import { Components } from 'meteor/vulcan:core';
import { intlShape } from 'meteor/vulcan:i18n';

const SurveyHeadTags = ({ survey }, { intl }) => {
  const { name, year, imageUrl } = survey;
  return (
    <Components.HeadTags
      title={`${name} ${year}`}
      description={intl.formatMessage({ id: 'general.take_survey' }, { name, year })}
      image={`/surveys/${imageUrl}`}
    />
  );
};

SurveyHeadTags.contextTypes = {
  intl: intlShape,
};

export default SurveyHeadTags;
