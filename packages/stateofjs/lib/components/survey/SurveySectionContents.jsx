import React from 'react';
import { getQuestionId } from '../../modules/responses/helpers.js';
import { statuses } from '../../modules/constants.js';
import FormSubmit from './FormSubmit.jsx';
import FormLayout from './FormLayout.jsx';
import { Components } from 'meteor/vulcan:core';

const SurveySectionContents = ({ survey, sectionNumber, section, response, previousSection, nextSection, history }) => {
  const fields = section.questions.map((question) => getQuestionId(survey, section, question));
  const { title, description } = section;

  const FormSubmitWrapper = (props) => (
    <FormSubmit
      {...props}
      response={response}
      sectionNumber={sectionNumber}
      history={history}
      nextSection={nextSection}
      previousSection={previousSection}
    />
  );

  return (
    <div className="section-questions">
      {response.survey && response.survey.status === statuses.closed && (
        <div className="survey-closed">
          This survey is now closed. You can review it but data can’t be submitted or modified.
        </div>
      )}
      <h2 className="section-title">{title}</h2>
      <h3 className="section-description">{description}</h3>
      <Components.SmartForm
        documentId={response._id}
        fields={fields}
        collectionName="Responses"
        showDelete={false}
        queryFragmentName="ResponseFragment"
        mutationFragmentName="ResponseFragment"
        itemProperties={{
          layout: 'vertical',
        }}
        warnUnsavedChanges={true}
        disabled={response.survey.status === statuses.closed}
        Components={{
          FormLayout,
          FormSubmit: FormSubmitWrapper,
        }}
      />
    </div>
  );
};

export default SurveySectionContents;
