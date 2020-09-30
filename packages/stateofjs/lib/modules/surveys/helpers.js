import surveys from '../../surveys/';

export const getSurveyFromResponse = response => surveys.find(s => s.slug === response.surveySlug);

export const getSurvey = (prettySlug, year) => surveys.find(s => (s.prettySlug === prettySlug && s.year === parseInt(year)));

export const getSurveyPath = ({ survey: surveyArgument, number, response }) => {
  const survey = surveyArgument || getSurveyFromResponse(response);
  const { year, prettySlug } = survey;
  const responseSegment = response && `/${response._id}` || '/read-only';
  const numberSegment = number ? `/${number}` : '';
  const path = `/survey/${prettySlug}/${year}${responseSegment}${numberSegment}`;
  return path;
}
