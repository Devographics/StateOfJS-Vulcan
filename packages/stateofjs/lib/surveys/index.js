import js2019 from './js/js2019outline';

import css2020 from './js/css2020outline';
import js2020 from './js/js2020outline';

import css2021 from './js/css2021outline';

import js2021 from './js/js2021outline';

import { parseSurvey } from '../modules/responses/helpers';

// make sure array is properly sorted here
const surveys = [
  js2021,
  css2021,
  js2020,
  css2020,
  js2019,
];

const parsedSurveys = surveys.map(parseSurvey);

export default parsedSurveys;

