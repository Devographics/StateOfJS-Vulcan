import React from 'react';
import { registerComponent, Components } from 'meteor/vulcan:core';
import { withRouter } from 'react-router-dom';
import parsedOutline from '../../modules/outline.js';
import { makeId } from '../../modules/helpers.js';
import { Link } from 'react-router-dom';

const SurveySection = ({ match, history }) => {
  const { responseId, sectionNumber } = match.params;
  const sn = parseInt(sectionNumber);
  const section = parsedOutline[sectionNumber];
  const previousSection = parsedOutline[sn - 1];
  const nextSection = parsedOutline[sn + 1];
  return (
    <div className="survey-section">
      {section.template === 'statictext' ? (
        <StaticText title={section.title} />
      ) : (
        <Section
          sectionNumber={sn}
          section={section}
          responseId={responseId}
          previousSection={previousSection}
          nextSection={nextSection}
          history={history}
        />
      )}
    </div>
  );
};

const StaticText = ({ title }) => <div className="static-section">{title}</div>;

const FormSubmit = ({ submitForm, responseId, sectionNumber, nextSection, previousSection, history }) => (
  <div className="form-submit form-submit-prevnext">
    <Components.Button
      type="submit"
      variant="primary"
      onClick={e => {
        e.preventDefault();
        submitForm();
        history.push(`/survey/${responseId}/${sectionNumber - 1}`);
      }}
    >
      Previous: {previousSection.title}
    </Components.Button>
    <Components.Button
      type="submit"
      variant="primary"
      onClick={e => {
        e.preventDefault();
        submitForm();
        history.push(`/survey/${responseId}/${sectionNumber + 1}`);
      }}
    >
      Next: {nextSection.title}
    </Components.Button>
  </div>
);

const Section = ({ sectionNumber, section, responseId, previousSection = {}, nextSection = {}, history }) => {
  const fields = section.questions.map(q => (typeof q === 'string' ? q : q.title)).map(makeId);
  return (
    <div className="section-questions">
      <h2>{section.title}</h2>
      <Components.EditForm
        documentId={responseId}
        fields={fields}
        collectionName="Responses"
        submitLabel={`Next: ${nextSection.title}`}
        showDelete={false}
        queryFragmentName="ResponseFragment"
        mutationFragmentName="ResponseFragment"
        Components={{
          FormSubmit: props => (
            <FormSubmit {...props} responseId={responseId} sectionNumber={sectionNumber} history={history} nextSection={nextSection} previousSection={previousSection} />
          ),
        }}
      />
    </div>
  );
};

registerComponent('SurveySection', SurveySection, withRouter);

export default SurveySection;
