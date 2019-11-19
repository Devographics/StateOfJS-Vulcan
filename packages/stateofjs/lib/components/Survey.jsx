import React from 'react';
import { Components, registerComponent, withSingle2 } from 'meteor/vulcan:core';
import { LinkContainer } from 'react-router-bootstrap';
import get from 'lodash/get';
import { withRouter } from 'react-router-dom';

const SurveyWithData = ({ match }) => {
  const { slug, year } = match;
  return <Components.Survey input={{ filter: { _and: { slug: { _eq: slug }, year: { _eq: year } } } }} />;
};

registerComponent('SurveyWithData', SurveyWithData);

const Survey = ({ loading, document: survey, history }) => {
  if (loading) {
    return <Components.Loading />;
  }
  const { name, year, currentUserResponse } = survey;

  return (
    <div className="survey">
      <h2>{name} {year}</h2>
      Survey Page
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
          mutationArguments={{ input: { data: { surveyId: survey._id } } }}
          successCallback={result => {
            console.log(result);
            console.log(get(result, 'data.createResponse.data.pagePath'))
            history.push(get(result, 'data.createResponse.data.pagePath'));
          }}
        />
      )}
    </div>
  );
};

const options = {
  collectionName: 'Surveys',
  fragmentName: 'SurveyFragment',
};

registerComponent('Survey', Survey, [withSingle2, options], withRouter);

export default Survey;
