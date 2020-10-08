import React from 'react';
import { statuses } from '../../../modules/constants.js';
import FormSubmit from './FormSubmit.jsx';
import FormLayout from './FormLayout.jsx';
import { Components, useCurrentUser } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { getSurveyPath } from '../../../modules/surveys/helpers';

const SurveySectionContents = ({
  survey,
  sectionNumber,
  section,
  response,
  previousSection,
  nextSection,
  history,
  readOnly,
}) => {
  const { currentUser } = useCurrentUser();

  const fields = section.questions.map((question) => question.fieldName);
  const { id } = section;

  const FormSubmitWrapper = (props) => (
    <FormSubmit
      {...props}
      response={response}
      sectionNumber={sectionNumber}
      history={history}
      nextSection={nextSection}
      previousSection={previousSection}
      survey={survey}
      readOnly={readOnly}
    />
  );

  return (
    <div className="section-questions">
      {survey.status === statuses.preview ? (
        <div className="survey-message survey-readonly">
          <FormattedMessage id="general.survey_read_only" />
        </div>
      ) : survey.status === statuses.open && readOnly ? (
        <div className="survey-message survey-readonly">
          <FormattedMessage id="general.survey_read_only" />
          <FormattedMessage
            id="general.survey_read_only_back"
            html={true}
            values={{ link: getSurveyPath({ survey, home: true }) }}
          />
        </div>
      ) : survey.status === statuses.closed ? (
        <div className="survey-message survey-closed">
          <FormattedMessage id="general.survey_closed" />
        </div>
      ) : null}
      <h2 className="section-title">
        <FormattedMessage id={`sections.${id}.title`} defaultMessage={id} values={{ ...survey }} />
      </h2>
      <h3 className="section-description">
        <FormattedMessage id={`sections.${id}.description`} defaultMessage={id} values={{ ...survey }} />
      </h3>
      <Components.SmartForm
        documentId={response && response._id}
        fields={fields}
        collectionName="Responses"
        showDelete={false}
        queryFragmentName="ResponseFragment"
        mutationFragmentName="ResponseFragment"
        itemProperties={{
          layout: 'vertical',
        }}
        warnUnsavedChanges={true}
        disabled={readOnly || survey.status !== statuses.open}
        components={{
          FormLayout,
          FormSubmit: FormSubmitWrapper,
        }}
      />
    </div>
  );
};

export default SurveySectionContents;
