import React from 'react';
import { registerComponent, Components } from 'meteor/vulcan:core';
import { withRouter } from 'react-router-dom';
import parsedOutline from '../../modules/outline.js';
import { makeId } from '../../modules/helpers.js';
import { Link } from 'react-router-dom';
import { getResponsePath } from '../../modules/responses/helpers.js';

const SurveySection = ({ match, history }) => {
  const { responseId, sectionNumber = 0 } = match.params;
  const sn = parseInt(sectionNumber);
  const section = parsedOutline[sn];
  const previousSection = parsedOutline[sn - 1];
  const nextSection = parsedOutline[sn + 1];
  const sectionProps = {
    sectionNumber: sn,
    section,
    responseId,
    previousSection,
    nextSection,
    history,
  };
  if (!responseId) {
    <p>Could not find survey.</p>
  }
  return (
    <div className="survey-section">
      {section.template === 'statictext' ? (
        <StaticText title={section.title} {...sectionProps} />
      ) : (
        <Section {...sectionProps} />
      )}
    </div>
  );
};

const StaticText = ({ title, responseId, sectionNumber, previousSection, nextSection }) => (
  <div className="static-section">
    {title}
    {previousSection && (
      <Link to={getResponsePath({_id: responseId}, sectionNumber - 1)}>Previous: {previousSection.title}</Link>
    )}
    {nextSection && <Link to={getResponsePath({_id: responseId}, sectionNumber + 1)}>Next: {nextSection.title}</Link>}
  </div>
);

const FormSubmit = ({ submitForm, responseId, sectionNumber, nextSection, previousSection, history }) => (
  <div className="form-submit form-submit-prevnext">
    {previousSection && (
      <Components.Button
        type="submit"
        variant="primary"
        onClick={e => {
          e.preventDefault();
          submitForm();
          history.push(getResponsePath({_id: responseId}, sectionNumber - 1));
        }}
      >
        Previous: {previousSection.title}
      </Components.Button>
    )}
    {nextSection && (
      <Components.Button
        type="submit"
        variant="primary"
        onClick={e => {
          e.preventDefault();
          submitForm();
          history.push(getResponsePath({_id: responseId}, sectionNumber + 1));
        }}
      >
        Next: {nextSection.title}
      </Components.Button>
    )}
  </div>
);

const Section = ({ sectionNumber, section, responseId, previousSection, nextSection, history }) => {
  const fields = section.questions.map(q => (typeof q === 'string' ? q : q.title)).map(makeId);
  return (
    <div className="section-questions">
      <h2>{section.title}</h2>
      <Components.SmartForm
        documentId={responseId}
        fields={fields}
        collectionName="Responses"
        showDelete={false}
        queryFragmentName="ResponseFragment"
        mutationFragmentName="ResponseFragment"
        Components={{
          FormSubmit: props => (
            <FormSubmit
              {...props}
              responseId={responseId}
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

registerComponent('SurveySection', SurveySection, withRouter);

export default SurveySection;
