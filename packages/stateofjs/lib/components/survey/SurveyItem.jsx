/*

1. Check currentUserResponse field on the survey to see if current user has a response
2. If so link to the survey
3. If not use MutatioButton to trigger the `createResponse` mutation
4. If there is an error during the mutation, show it

*/
import React, { useState } from 'react';
import { Components, registerComponent, withCurrentUser, getErrors } from 'meteor/vulcan:core';
import { LinkContainer } from 'react-router-bootstrap';
import get from 'lodash/get';
import { Link, withRouter } from 'react-router-dom';
import { getResponsePath } from '../../modules/responses/helpers.js';
import isEmpty from 'lodash/isEmpty';
import bowser from 'bowser';

const SurveyItem = ({ survey, history, currentUser }) => {
  const [errors, setErrors] = useState();

  const { name, year, imageUrl, currentUserResponse } = survey;

  // prefilled data
  let data = {
    surveyId: survey._id,
    aboutyou_youremail: currentUser.email,
  };

  if (typeof window !== 'undefined') {
    const browser = bowser.getParser(window.navigator.userAgent);
    const info = browser.parse().parsedResult;
    data = {
      ...data,
      device: info.platform.type,
      browser: info.browser.name,
      version: info.browser.version,
      os: info.os.name,
      referrer: document.referrer,
    };
  }

  console.log(data);

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
          {currentUserResponse && !isEmpty(currentUserResponse) ? (
            <LinkContainer to={currentUserResponse.pagePath}>
              <Components.Button>Continue Survey »</Components.Button>
            </LinkContainer>
          ) : (
            <Components.MutationButton
              label="Start Survey »"
              variant="primary"
              mutationOptions={{
                name: 'createResponse',
                args: { input: 'CreateResponseInput' },
                fragmentName: 'CreateResponseOutputFragment',
              }}
              mutationArguments={{ input: { data } }}
              successCallback={result => {
                history.push(get(result, 'data.createResponse.data.pagePath'));
              }}
              errorCallback={error => {
                setErrors(getErrors(error));
              }}
            />
          )}
        </div>
      </div>
      {errors && errors.map(error => <ErrorItem key={error.id} {...error} />)}
    </div>
  );
};

const ErrorItem = ({ id, message, properties }) => {
  if (id === 'responses.duplicate_responses') {
    return (
      <div className="survey-item-error error message">
        {message} <Link to={getResponsePath({ _id: properties.responseId })}>Continue Survey →</Link>
      </div>
    );
  } else {
    return <div className="survey-item-error error">{message}</div>;
  }
};

registerComponent('SurveyItem', SurveyItem, withRouter, withCurrentUser);

export default SurveyItem;
