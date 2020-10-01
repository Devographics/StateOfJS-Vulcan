/*

1. Show list of sections
2. For each section, compare section questions with current response document
3. Figure out completion percentage

TODO

- Simplify this by using already-parsed with getQuestionObject() outline

*/
import React, { useState } from 'react';
import { getQuestionObject, ignoredFieldTypes } from '../../../modules/responses/helpers.js';
import { getSurveyPath } from '../../../modules/surveys/helpers.js';
import surveys from '../../../surveys';
import { Link, NavLink } from 'react-router-dom';
import { FormattedMessage } from 'meteor/vulcan:i18n';

// TODO
// const getOverallCompletionPercentage = (response) => {

// }

const getSectionCompletionPercentage = (section, response) => {
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

const SurveyNav = ({ survey, response }) => {
  const [shown, setShown] = useState(false);
  const outline = surveys.find(o => o.slug === survey.slug).outline;
  return (
    <nav className={`section-nav ${shown ? 'section-nav-shown' : 'section-nav-hidden'}`}>
      <div className="section-nav-inner">
        <div
          className="section-nav-head"
          onClick={e => {
            setShown(!shown);
          }}
        >
          <h2 className="section-nav-heading"><Link to={getSurveyPath({ survey, home: true })}>{survey.name} {survey.year}</Link></h2>
          <h3 className="section-nav-toc"><FormattedMessage id="general.table_of_contents"/></h3>
          <span className="section-nav-toggle">{shown ? '▼' : '▶'}</span>
        </div>
        <div className="section-nav-contents">
          <ul>
            {outline.map((section, i) => (
              <SectionNavItem
                survey={survey}
                setShown={setShown}
                response={response}
                section={section}
                number={i}
                key={i}
              />
            ))}
            {/* {response && <li>Overall: {getOverallCompletionPercentage(response)}%</li>} */}
          </ul>
          <p className="completion-message">
            <FormattedMessage id="general.all_questions_optional"/>
          </p>
        </div>
      </div>
    </nav>
  );
};

const SectionNavItem = ({ survey, response, section, number, setShown }) => {
  const completion = getSectionCompletionPercentage(section, response);
  const showCompletion = completion !== 'null' && completion > 0;
  return (
    <li className="section-nav-item">
      <NavLink
        exact={true}
        to={getSurveyPath({survey, number, response})}
        onClick={() => {
          setShown(false);
        }}
      >
        <FormattedMessage id={`sections.${section.id}.title`}/> {showCompletion && <span className="section-nav-item-completion">{completion}%</span>}
      </NavLink>
    </li>
  );
};

export default SurveyNav;
