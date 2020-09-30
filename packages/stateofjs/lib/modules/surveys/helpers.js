import surveys from '../../surveys/';

export const getSurveyFromResponse = response => surveys.find(s => s.slug === response.surveySlug);

export const getSurvey = (prettySlug, year) => surveys.find(s => (s.prettySlug === prettySlug && s.year === parseInt(year)));