import surveys from '../../surveys/';

export const getSurveyFromResponse = response => surveys.find(s => s.slug === response.surveySlug);

export const getSurvey = (prettySlug, year) => surveys.find(s => (s.prettySlug === prettySlug && s.year === parseInt(year)));

export const getSurveyPath = ({ survey: surveyArgument, number, response, home = false }) => {
  const survey = surveyArgument || getSurveyFromResponse(response);
  if (!survey) {
    return '';
  }
  const { year, prettySlug } = survey;
  const prefixSegment = '/survey';
  const slugSegment = `/${prettySlug}/${year}`;
  const responseSegment = home ? '' : (response && `/${response._id}` || '/read-only');
  const numberSegment = number ? `/${number}` : '';
  const path = [prefixSegment, slugSegment, responseSegment, numberSegment].join('');
  return path;
}
