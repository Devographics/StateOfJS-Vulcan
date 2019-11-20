/*

1. Look for responseId and section number in URL params
2. Load response from server using withSingle2 HoC
3. Display response form restricted to questions of current section via `fields` prop

Note: form has a customized "FormSubmit" component to show the prev/next buttons

TODO: 

- use hooks instead of withSingle2
- get rid of SurveySectionWithData and registerComponent

*/
import React from 'react';
import { registerComponent, Components, withSingle2 } from 'meteor/vulcan:core';
import { withRouter } from 'react-router-dom';
import parsedOutline from '../../modules/outline.js';
import { getId } from '../../modules/responses/helpers.js';
import SurveyNav from './SurveyNav.jsx';
import FormSubmit from './FormSubmit.jsx';

const Section = ({ sectionNumber, section, response, previousSection, nextSection, history }) => {
  const fields = section.questions
    .map(q => (typeof q === 'string' ? q : q.title))
    .map(questionTitle => getId(section.title, questionTitle));
  const { title, description } = section;
  return (
    <div className="section-questions">
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
        Components={{
          FormSubmit: props => (
            <FormSubmit
              {...props}
              response={response}
              sectionNumber={sectionNumber}
              history={history}
              nextSection={nextSection}
              previousSection={previousSection}
            />
          ),
        }}
      />
    </div>
  );
};

const SurveySectionWithData = ({ match, history }) => {
  const { responseId, sectionNumber = 0 } = match.params;
  return (
    <Components.SurveySection
      input={{ id: responseId }}
      responseId={responseId}
      sectionNumber={parseInt(sectionNumber)}
      history={history}
    />
  );
};
registerComponent('SurveySectionWithData', SurveySectionWithData, withRouter);

const SurveySection = ({ loading, responseId, document: response, sectionNumber, history }) => {
  const section = parsedOutline[sectionNumber];
  const previousSection = parsedOutline[sectionNumber - 1];
  const nextSection = parsedOutline[sectionNumber + 1];
  const sectionProps = {
    sectionNumber,
    section,
    response,
    previousSection,
    nextSection,
    history,
  };
  return (
    <div className="survey-section">
      <SurveyNav responseId={responseId} response={response} currentSectionNumber={sectionNumber} />
      <div className="section-contents">
        {loading ? (
          <Components.Loading />
        ) : !response ? (
          <p>Could not find survey.</p>
        ) : (
          <Section response={response} {...sectionProps} />
        )}
      </div>
    </div>
  );
};

const options = {
  collectionName: 'Responses',
};

registerComponent('SurveySection', SurveySection, withRouter, [withSingle2, options]);

export default SurveySection;
