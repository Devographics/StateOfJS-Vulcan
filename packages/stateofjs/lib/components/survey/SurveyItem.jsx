/*

1. Check currentUserResponse field on the survey to see if current user has a response
2. If so link to the survey
3. If not use MutatioButton to trigger the `createResponse` mutation
4. If there is an error during the mutation, show it

*/
import React, { useState } from 'react';
import { Components, getErrors } from 'meteor/vulcan:core';
import { LinkContainer } from 'react-router-bootstrap';
import get from 'lodash/get';
import { Link, useHistory } from 'react-router-dom';
import { getSurveyPath } from '../../modules/surveys/helpers.js';
import isEmpty from 'lodash/isEmpty';
import { statuses } from '../../modules/constants.js';

// for some reason this throws error?
// import bowser from 'bowser';
// const bowser = require("bowser"); // CommonJS

const SurveyItem = ({ survey, currentUser }) => {
  const history = useHistory();
  const [errors, setErrors] = useState();

  const { slug, name, year, imageUrl, status } = survey;
  const currentSurveyResponse = currentUser && currentUser.responses.find((r) => r.surveySlug === slug);

  // prefilled data
  let data = {
    surveyId: survey._id,
    aboutyou_youremail: currentUser && currentUser.email,
  };

  // if (typeof window !== 'undefined') {
  //   const browser = bowser.getParser(window.navigator.userAgent);
  //   const info = browser.parse().parsedResult;
  //   data = {
  //     ...data,
  //     device: info.platform.type,
  //     browser: info.browser.name,
  //     version: info.browser.version,
  //     os: info.os.name,
  //     referrer: document.referrer,
  //     source: window.source,
  //   };
  // }

  return (
    <div className="survey-item">
      <div className="survey-item-contents">
        <div className="survey-image">
          <img src={`/surveys/${imageUrl}`} alt={name} />
        </div>
        <h3 className="survey-name">
          {name} {year}
        </h3>
        <div className="survey-action">
          {currentSurveyResponse && !isEmpty(currentSurveyResponse) ? (
            <LinkContainer to={currentSurveyResponse.pagePath}>
              <Components.Button>
                {status === statuses.open ? (
                  <Components.FormattedMessage id="general.continue_survey" />
                ) : (
                  <Components.FormattedMessage id="general.review_survey" />
                )}
              </Components.Button>
            </LinkContainer>
          ) : status === statuses.open ? (
            <Components.MutationButton
              label={<Components.FormattedMessage id="general.start_survey" />}
              variant="primary"
              mutationOptions={{
                name: 'createResponse',
                args: { input: 'CreateResponseInput' },
                fragmentName: 'CreateResponseOutputFragment',
              }}
              mutationArguments={{ input: { data } }}
              successCallback={(result) => {
                history.push(get(result, 'data.createResponse.data.pagePath'));
              }}
              errorCallback={(error) => {
                setErrors(getErrors(error));
              }}
            />
          ) : (
            <div className="survey-action-closed">Survey closed.</div>
          )}
        </div>
      </div>
      {errors && errors.map((error) => <ErrorItem key={error.id} {...error} survey={survey} response={currentSurveyResponse} />)}
    </div>
  );
};

const ErrorItem = ({ survey, id, message, properties, response }) => {
  if (id === 'responses.duplicate_responses') {
    return (
      <div className="survey-item-error error message">
        {message} <Link to={getSurveyPath({survey, response})}>Continue Survey →</Link>
      </div>
    );
  } else {
    return <div className="survey-item-error error">{message}</div>;
  }
};

export default SurveyItem;
