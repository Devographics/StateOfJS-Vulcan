/*

1. Show list of sections
2. For each section, compare section questions with current response document
3. Figure out completion percentage

TODO

- Simplify this by using already-parsed with getQuestionObject() outline

*/
import React, { useState, useEffect, useRef } from 'react';
import { getQuestionObject, ignoredFieldTypes } from '../../../modules/responses/helpers.js';
import { getSurveyPath } from '../../../modules/surveys/helpers.js';
import surveys from '../../../surveys';
import { Link, NavLink } from 'react-router-dom';
import { Components } from 'meteor/vulcan:core';

// TODO
// const getOverallCompletionPercentage = (response) => {

// }

const getSectionCompletionPercentage = (section, response) => {
  if (!response || !section.questions) {
    return null;
  }
  // don't count text questions towards completion score
  const sectionQuestions = section.questions.filter((question) => {
    const questionObject = getQuestionObject(question, section);
    return !ignoredFieldTypes.includes(questionObject.template);
  });
  const questionsCount = sectionQuestions.length;
  const completedQuestions = section.questions.filter((question) => {
    const questionObject = getQuestionObject(question, section);
    return (
      !ignoredFieldTypes.includes(questionObject.template) &&
      response[questionObject.fieldName] !== null &&
      typeof response[questionObject.fieldName] !== 'undefined'
    );
  });
  const completedQuestionsCount = completedQuestions.length;
  return Math.round((completedQuestionsCount / questionsCount) * 100);
};

const SurveyNav = ({ survey, response }) => {
  const outline = surveys.find((o) => o.slug === survey.slug).outline;

  const [shown, setShown] = useState(false);
  const [currentTabindex, setCurrentTabindex] = useState(null);
  const [currentFocusIndex, setCurrentFocusIndex] = useState();

  useEffect(() => {
    const keyPressHandler = (e) => {
      if (currentFocusIndex !== null) {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setCurrentTabindex(currentTabindex - 1);
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setCurrentTabindex(currentTabindex + 1);
        }
      }
    };
    document.addEventListener('keydown', keyPressHandler);
    return () => {
      document.removeEventListener('keydown', keyPressHandler);
    };
  }, [currentFocusIndex]);

  return (
    <nav className={`section-nav ${shown ? 'section-nav-shown' : 'section-nav-hidden'}`} aria-label={`${survey.name} ${survey.year}`}>
      <div className="section-nav-inner">
        <h2 className="section-nav-heading">
          <Link to={getSurveyPath({ survey, home: true })}>
            {survey.name} {survey.year}
          </Link>
        </h2>
        <Components.Button
          className="section-nav-head"
          onClick={(e) => {
            setShown(!shown);
          }}
        >
          <h3 className="section-nav-toc">
            <Components.FormattedMessage id="general.table_of_contents" />
          </h3>
          <span className="section-nav-toggle">{shown ? '▼' : '▶'}</span>
        </Components.Button>
        <div className="section-nav-contents">
          <ul>
            {outline.map((section, i) => (
              <SectionNavItem
                survey={survey}
                setShown={setShown}
                response={response}
                section={section}
                number={i+1}
                key={i}
                currentTabindex={currentTabindex}
                setCurrentTabindex={setCurrentTabindex}
                setCurrentFocusIndex={setCurrentFocusIndex}
              />
            ))}
            {/* {response && <li>Overall: {getOverallCompletionPercentage(response)}%</li>} */}
          </ul>
          <p className="completion-message">
            <Components.FormattedMessage id="general.all_questions_optional" />
          </p>
        </div>
      </div>
    </nav>
  );
};

const SectionNavItem = ({ survey, response, section, number, setShown, currentTabindex, setCurrentFocusIndex }) => {
  const textInput = useRef(null);
  const completion = getSectionCompletionPercentage(section, response);
  const showCompletion = completion !== 'null' && completion > 0;

  useEffect(() => {
    if (currentTabindex === number) {
      textInput.current.focus();
    }
  }, [currentTabindex]);

  return (
    <li className="section-nav-item">
      <NavLink
        exact={true}
        to={getSurveyPath({ survey, number, response })}
        onClick={() => {
          setShown(false);
        }}
        tabIndex={currentTabindex === number ? 0 : -1}
        ref={textInput}
        onFocus={() => {
          setCurrentFocusIndex(number);
        }}
        onBlur={() => {
          setCurrentFocusIndex(null);
        }}
      >
        <Components.FormattedMessage id={`sections.${section.id}.title`} />{' '}
        {showCompletion && <span className="section-nav-item-completion">{completion}%</span>}
      </NavLink>
    </li>
  );
};

export default SurveyNav;

