import js2019 from './js2019outline';
import css2020 from './css2020outline';
import { parseSurvey } from '../modules/responses/helpers';

const surveys = [
  js2019,
  css2020,
];

const parsedSurveys = surveys.map(parseSurvey);

export default parsedSurveys