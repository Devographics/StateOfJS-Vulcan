import { addRoute } from 'meteor/vulcan:core';

addRoute({ name: 'home', path: '/', componentName: 'Surveys' });
addRoute({ name: 'account', path: '/account', componentName: 'AccountPage' });
addRoute({ name: 'surveyPage', path: '/survey/:slug/:year/', componentName: 'SurveyPageWithData' });
addRoute({ name: 'responsePage', path: '/session/:responseId/:sectionNumber?', componentName: 'SurveySectionWithData' });
addRoute({ name: 'adminSurveys', path: '/admin/surveys', componentName: 'AdminSurveys' });
addRoute({ name: 'adminResponses', path: '/admin/responses', componentName: 'AdminResponses' });
