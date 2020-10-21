import React, { useState } from 'react';
import { statuses } from '../../../modules/constants.js';
import FormSubmit from './FormSubmit.jsx';
import FormLayout from './FormLayout.jsx';
import FormLabel from './FormLabel.jsx';
import FormOptionLabel from './FormOptionLabel.jsx';
import { Components, useCurrentUser, useCreate2 } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { getSurveyPath } from '../../../modules/surveys/helpers';
import Saves from '../../../modules/saves/collection';

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

  const [startedAt, setStartedAt] = useState();

  const [createSave, { data, loading, error }] = useCreate2({
    collection: Saves,
    fragmentName: 'SaveFragment',
  });

  const fields = section.questions.map((question) => question.fieldName);
  const { id } = section;

  const trackSave = ({ isError = false }) => {
    const data = {
      startedAt,
      finishedAt: new Date(),
      responseId: response._id,
      isError,
    };
    createSave({ input: { data } });
  };

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

  const isLastSection = !nextSection;

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
        submitCallback={(data) => {
          setStartedAt(new Date());
          if (isLastSection) {
            data.isFinished = true;
          }
          return data;
        }}
        successCallback={() => trackSave({ isError: false })}
        errorCallback={() => trackSave({ isError: true })}
        warnUnsavedChanges={false}
        disabled={readOnly || survey.status !== statuses.open}
        components={{
          FormLayout,
          FormSubmit: FormSubmitWrapper,
          FormOptionLabel,
          FormLabel,
        }}
      />
    </div>
  );
};

export default SurveySectionContents;
