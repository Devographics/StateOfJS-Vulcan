import { addRoute } from 'meteor/vulcan:core';

addRoute({ name: 'home', path: '/', componentName: 'Surveys' });
addRoute({ name: 'survey', path: '/survey/:slug/:year/', componentName: 'Survey' });
addRoute({ name: 'response', path: '/session/:responseId/:sectionNumber?', componentName: 'SurveySection' });
addRoute({ name: 'adminSurveys', path: '/admin/surveys', componentName: 'AdminSurveys' });
addRoute({ name: 'adminResponses', path: '/admin/responses', componentName: 'AdminResponses' });
