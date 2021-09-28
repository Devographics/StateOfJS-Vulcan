import React from 'react';
import { Components } from 'meteor/vulcan:core';
import EntitiesContext from '../common/EntitiesContext';

const SurveyCredits = ({ survey }) => {
  return (
    <div className="survey-credits survey-page-block">
      <h3 className="survey-credits-heading survey-page-block-heading">
        <Components.FormattedMessage id="credits.thanks" />
      </h3>
      <div className="survey-credits-items">
        {survey.credits.map((c) => (
          <SurveyCredit key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
};

const SurveyCredit = ({ id, role }) => (
  <EntitiesContext.Consumer>
    {({ entities }) => {
      const entity = entities && entities.find((e) => e.id === id);
      return <SurveyCreditItem {...entity} role={role} />;
    }}
  </EntitiesContext.Consumer>
);

const SurveyCreditItem = ({ name, twitterName, twitter, role }) => (
  <div className="survey-credits-item">
    <a href={`https://twitter.com/@${twitterName}`} className="survey-credits-item-avatar">
      <img src={twitter?.avatarUrl} />
    </a>
    <div className="survey-credits-item-details">
      <h4 className="survey-credits-item-name">{name}</h4>
      <p className="survey-credits-item-twitter">
        <a href={`https://twitter.com/@${twitterName}`}>@{twitterName}</a>
      </p>
      <p className="survey-credits-item-role">
        <Components.FormattedMessage id={`credits.${role}`} />
      </p>
    </div>
  </div>
);

export default SurveyCredits;
