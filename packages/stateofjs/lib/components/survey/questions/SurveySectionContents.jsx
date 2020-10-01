import React from 'react';
import { statuses } from '../../../modules/constants.js';
import FormSubmit from './FormSubmit.jsx';
import FormLayout from './FormLayout.jsx';
import { Components } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';

const SurveySectionContents = ({ survey, sectionNumber, section, response, previousSection, nextSection, history, readOnly }) => {
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
      {survey.status === statuses.closed && (
        <div className="survey-closed">
          This survey is now closed. You can review it but data can’t be submitted or modified.
        </div>
      )}
      <h2 className="section-title">
        <FormattedMessage id={`sections.${id}.title`} defaultMessage={id} />
      </h2>
      <h3 className="section-description">
        <FormattedMessage id={`sections.${id}.description`} defaultMessage={id} />
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
