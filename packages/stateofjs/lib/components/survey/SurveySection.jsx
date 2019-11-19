import React from 'react';
import { registerComponent, Components } from 'meteor/vulcan:core';
import { withRouter } from 'react-router-dom';
import parsedOutline from '../../modules/outline.js';
import { NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { getResponsePath, getId } from '../../modules/responses/helpers.js';

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
    <p>Could not find survey.</p>;
  }
  return (
    <div className="survey-section">
      <SectionNav response={{ _id: responseId }} currentSectionNumber={sn} />
      <div className="section-contents">
        {section.template === 'statictext' ? (
          <StaticText title={section.title} {...sectionProps} />
        ) : (
          <Section {...sectionProps} />
        )}
      </div>
    </div>
  );
};

const SectionNav = ({ response }) => (
  <ul className="section-nav">
    {parsedOutline.map((section, i) => (
      <SectionNavItem response={response} section={section} number={i} key={i} />
    ))}
  </ul>
);

const SectionNavItem = ({ response, section, number }) => (
  <li className="section-nav-item">
    <NavLink to={getResponsePath(response, number)}>{section.title}</NavLink>
  </li>
);

const StaticText = ({ title, responseId, sectionNumber, previousSection, nextSection }) => (
  <div className="section-questions static-section">
    {title}
    <div className="form-section-nav">
      {previousSection ? (
        <LinkContainer to={getResponsePath({ _id: responseId }, sectionNumber - 1)}>
          <Components.Button>Previous: {previousSection.title}</Components.Button>
        </LinkContainer>
      ) : (
        <div />
      )}
      {nextSection ? (
        <LinkContainer to={getResponsePath({ _id: responseId }, sectionNumber + 1)}>
          <Components.Button>Next: {nextSection.title}</Components.Button>
        </LinkContainer>
      ) : (
        <div />
      )}
    </div>
  </div>
);

const FormSubmit = ({ submitForm, responseId, sectionNumber, nextSection, previousSection, history }) => (
  <div className="form-submit form-section-nav">
    {previousSection ? (
      <Components.Button
        type="submit"
        variant="primary"
        onClick={e => {
          e.preventDefault();
          submitForm();
          history.push(getResponsePath({ _id: responseId }, sectionNumber - 1));
        }}
      >
        Previous: {previousSection.title}
      </Components.Button>
    ) : (
      <div />
    )}
    {nextSection ? (
      <Components.Button
        type="submit"
        variant="primary"
        onClick={e => {
          e.preventDefault();
          submitForm();
          history.push(getResponsePath({ _id: responseId }, sectionNumber + 1));
        }}
      >
        Next: {nextSection.title}
      </Components.Button>
    ) : (
      <div />
    )}
  </div>
);

const Section = ({ sectionNumber, section, responseId, previousSection, nextSection, history }) => {
  const fields = section.questions
    .map(q => (typeof q === 'string' ? q : q.title))
    .map(questionTitle => getId(section.title, questionTitle));
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
