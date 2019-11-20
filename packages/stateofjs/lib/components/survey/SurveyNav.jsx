/*

1. Show list of sections
2. For each section, compare section questions with current response document
3. Figure out completion percentage

TODO

- Simplify this by using already-parsed with getQuestionObject() outline

*/
import React from 'react';
import { getResponsePath, getQuestionObject } from '../../modules/responses/helpers.js';
import parsedOutline from '../../modules/outline.js';
import { NavLink } from 'react-router-dom';

const getSectionCompletionPercentage = (section, response) => {
  const ignoredFieldTypes = ['email', 'text', 'longtext'];
  if (!response || !section.questions) {
    return null;
  }
  // don't count text questions towards completion score
  const sectionQuestions = section.questions.filter(question => {
    const questionObject = getQuestionObject(question, section);
    return !ignoredFieldTypes.includes(questionObject.template);
  });
  const questionsCount = sectionQuestions.length;
  const completedQuestions = section.questions.filter(question => {
    const questionObject = getQuestionObject(question, section);
    return (
      !ignoredFieldTypes.includes(questionObject.template) &&
      response[questionObject.id] !== null &&
      typeof response[questionObject.id] !== 'undefined'
    );
  });
  const completedQuestionsCount = completedQuestions.length;
  return Math.round((completedQuestionsCount / questionsCount) * 100);
};

const SurveyNav = ({ responseId, response }) => (
  <ul className="section-nav">
    {parsedOutline.map((section, i) => (
      <SectionNavItem responseId={responseId} response={response} section={section} number={i} key={i} />
    ))}
  </ul>
);

const SectionNavItem = ({ responseId, response, section, number }) => {
  const completion = getSectionCompletionPercentage(section, response);
  const showCompletion = completion !== 'null' && completion > 0;
  return (
    <li className="section-nav-item">
      <NavLink to={getResponsePath({ _id: responseId }, number)}>
        {section.title} {showCompletion && <span className="section-nav-item-completion">{completion}%</span>}
      </NavLink>
    </li>
  );
};

export default SurveyNav;
