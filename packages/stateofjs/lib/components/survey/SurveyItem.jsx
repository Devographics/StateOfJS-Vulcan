import React from 'react';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { LinkContainer } from 'react-router-bootstrap';
import get from 'lodash/get';
import { withRouter } from 'react-router-dom';

const SurveyItem = ({ survey, history, currentUser }) => {
  const { name, year, currentUserResponse } = survey;

  return (
    <div className="survey-item">
      <h3 className="survey-name">{name} {year}</h3>
      <div className="survey-action">
        {currentUserResponse ? (
          <LinkContainer to={currentUserResponse.pagePath}>
            <Components.Button>Continue Survey</Components.Button>
          </LinkContainer>
        ) : (
          <Components.MutationButton
            label="Start Survey"
            variant="primary"
            mutationOptions={{
              name: 'createResponse',
              args: { input: 'CreateResponseInput' },
              fragmentName: 'CreateResponseOutputFragment',
            }}
            mutationArguments={{ input: { data: { surveyId: survey._id, aboutyou_youremail: currentUser.email } } }}
            successCallback={result => {
              history.push(get(result, 'data.createResponse.data.pagePath'));
            }}
          />
        )}
      </div>
    </div>
  );
};

registerComponent('SurveyItem', SurveyItem, withRouter, withCurrentUser);

export default SurveyItem;
