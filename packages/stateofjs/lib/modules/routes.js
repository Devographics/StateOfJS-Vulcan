import { addRoute, getSetting } from 'meteor/vulcan:core';

import PrivacyPolicy from '../components/pages/PrivacyPolicy';
import Thanks from '../components/pages/Thanks';
import Surveys from '../components/pages/Surveys';

import AccountPage from '../components/users/AccountPage';

import SurveyPage from '../components/survey/SurveyPage';
import SurveySection from '../components/survey/SurveySection';

import AdminSurveys from '../components/admin/AdminSurveys';
import AdminResponses from '../components/admin/AdminResponses';
import AdminUsers from '../components/admin/AdminUsers';

const routes = [
{ name: 'home', path: '/', component: Surveys },
{ name: 'account', path: '/account', component: AccountPage },
{ name: 'surveyPage', path: '/survey/:slug/:year/', component: SurveyPage },
{ name: 'responsePage', path: '/survey/:slug/:year/:responseId/:sectionNumber?', component: SurveySection },

{ name: 'adminSurveys', path: '/admin/surveys', component: AdminSurveys },
{ name: 'adminResponses', path: '/admin/responses', component: AdminResponses },
{ name: 'adminUsers', path: '/admin/users', component: AdminUsers },

{ name: 'thanks', path: '/thanks', component: Thanks },
{ name: 'privacypolicy', path: '/privacy-policy', component: PrivacyPolicy },
];

if (Meteor.isDevelopment && getSetting('environment') === 'development') {
  // routes.push({name:'admin.emails',         path: '/admin/emails',                componentName: 'Emails',         },)
  routes.push({name:'admin.database',       path: '/admin/database',              componentName: 'DebugDatabase',  },)
}

addRoute(routes);