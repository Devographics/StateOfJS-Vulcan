import React from 'react';
import { Components } from 'meteor/vulcan:core';
import { intlShape } from 'meteor/vulcan:i18n';

const SurveyHeadTags = ({ survey }, { intl }) => {
  const { name, imageUrl } = survey;
  return (
    <Components.HeadTags
      title={`${name}`}
      description={intl.formatMessage({ id: 'general.take_survey' }, { name })}
      image={`/surveys/${imageUrl}`}
    />
  );
};

SurveyHeadTags.contextTypes = {
  intl: intlShape,
};

export default SurveyHeadTags;
