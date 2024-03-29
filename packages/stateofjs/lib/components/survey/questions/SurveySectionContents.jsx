import React, { useState } from 'react';
import { statuses } from '../../../modules/constants.js';
import FormItem from './FormItem.jsx';
import FormSubmit from './FormSubmit.jsx';
import FormLayout from './FormLayout.jsx';
import FormLabel from './FormLabel.jsx';
import FormDescription from './FormDescription.jsx';
import FormOptionLabel from './FormOptionLabel.jsx';
import { Components, useCurrentUser, useCreate2 } from 'meteor/vulcan:core';
import { getSurveyPath } from '../../../modules/surveys/helpers';
import Saves from '../../../modules/saves/collection';
import Users from 'meteor/vulcan:users';
import { canModifyResponse } from '../../../modules/responses/helpers';

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
  const isAdmin = Users.isAdmin(currentUser);

  const [createSave, { data, loading, error }] = useCreate2({
    collection: Saves,
    fragmentName: 'SaveFragment',
  });

  const fields = section.questions.map((question) => question.fieldName);
  const { id } = section;

  const trackSave = ({ lastSavedAt, isError = false }) => {
    const data = {
      startedAt: lastSavedAt,
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

  const isDisabled = !canModifyResponse(response, currentUser);

  return (
    <div className="section-questions" id="section-questions">
      {/* {survey.status === statuses.open && readOnly ? (
        <div className="survey-message survey-readonly">
          <Components.FormattedMessage id="general.survey_read_only" />
          <Components.FormattedMessage
            id="general.survey_read_only_back"
            html={true}
            values={{ link: getSurveyPath({ survey, home: true }) }}
          />
        </div>
      ) : survey.status === statuses.closed ? (
        <div className="survey-message survey-closed">
          <Components.FormattedMessage id="general.survey_closed" />
        </div>
      ) : null} */}
      <div className="section-heading">
        <h2 className="section-title">
          <span className="section-title-pagenumber">
            {sectionNumber}/{survey.outline.length}
          </span>
          <Components.FormattedMessage
            className="section-title-label"
            id={`sections.${id}.title`}
            defaultMessage={id}
            values={{ ...survey }}
          />
        </h2>
        <p className="section-description">
          <Components.FormattedMessage id={`sections.${id}.description`} defaultMessage={id} values={{ ...survey }} />
        </p>
      </div>
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
          data.lastSavedAt = new Date();
          if (isLastSection) {
            data.isFinished = true;
          }
          return data;
        }}
        successCallback={(result) => {
          const { lastSavedAt } = result;
          trackSave({ lastSavedAt, isError: false });
        }}
        errorCallback={(result) => {
          const { lastSavedAt } = result;
          trackSave({ lastSavedAt, isError: true });
        }}
        warnUnsavedChanges={false}
        disabled={isDisabled}
        components={{
          FormItem,
          FormLayout,
          FormSubmit: FormSubmitWrapper,
          FormOptionLabel,
          FormLabel,
          FormDescription,
        }}
      />
    </div>
  );
};

export default SurveySectionContents;
