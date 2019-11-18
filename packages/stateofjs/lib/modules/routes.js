import { addRoute } from 'meteor/vulcan:core';

addRoute({ name: 'home', path: '/', componentName: 'Home' });
addRoute({ name: 'survey', path: '/survey/:surveyId', componentName: 'Survey' });
addRoute({ name: 'adminSurveys', path: '/admin/surveys', componentName: 'AdminSurveys' });
addRoute({ name: 'adminResponses', path: '/admin/responses', componentName: 'AdminResponses' });
