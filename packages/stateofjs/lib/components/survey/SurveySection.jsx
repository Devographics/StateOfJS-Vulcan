import React from 'react';
import { registerComponent, Components, withSingle2 } from 'meteor/vulcan:core';
import { withRouter } from 'react-router-dom';
import parsedOutline from '../../modules/outline.js';
import { NavLink } from 'react-router-dom';
import { getResponsePath, getId, getQuestionObject } from '../../modules/responses/helpers.js';

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
      <SectionNav responseId={responseId} response={response} currentSectionNumber={sectionNumber} />
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

const SectionNav = ({ responseId, response }) => (
  <ul className="section-nav">
    {parsedOutline.map((section, i) => (
      <SectionNavItem responseId={responseId} response={response} section={section} number={i} key={i} />
    ))}
  </ul>
);

const getSectionCompletion = (section, response) => {
  if (!response || !section.questions) {
    return null;
  }
  const questionsCount = section.questions && section.questions.length;
  const completedQuestions = section.questions.filter(question => {
    const questionObject = getQuestionObject(question, section);
    return response[questionObject.id] !== null && typeof response[questionObject.id] !== 'undefined';
  });
  const completedQuestionsCount = completedQuestions.length;
  return Math.round((completedQuestionsCount / questionsCount) * 100);
};

const SectionNavItem = ({ responseId, response, section, number }) => {
  const completion = getSectionCompletion(section, response);
  const showCompletion = completion !== 'null' && completion > 0;
  return (
    <li className="section-nav-item">
      <NavLink to={getResponsePath({ _id: responseId }, number)}>
        {section.title} {showCompletion && <span className="section-nav-item-completion">{completion}%</span>}
      </NavLink>
    </li>
  );
};

const FormSubmit = ({ submitForm, response, sectionNumber, nextSection, previousSection, history }) => (
  <div className="form-submit form-section-nav">
    {previousSection ? (
      <Components.Button
        type="submit"
        variant="primary"
        onClick={e => {
          e.preventDefault();
          submitForm();
          history.push(getResponsePath(response, sectionNumber - 1));
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
          history.push(getResponsePath(response, sectionNumber + 1));
        }}
      >
        Next: {nextSection.title}
      </Components.Button>
    ) : (
      <div />
    )}
  </div>
);

const Section = ({ sectionNumber, section, response, previousSection, nextSection, history }) => {
  const fields = section.questions
    .map(q => (typeof q === 'string' ? q : q.title))
    .map(questionTitle => getId(section.title, questionTitle));
  const { title, description } = section;
  return (
    <div className="section-questions">
      <h2>{title}</h2>
      <h3>{description}</h3>
      <Components.SmartForm
        documentId={response._id}
        fields={fields}
        collectionName="Responses"
        showDelete={false}
        queryFragmentName="ResponseFragment"
        mutationFragmentName="ResponseFragment"
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
