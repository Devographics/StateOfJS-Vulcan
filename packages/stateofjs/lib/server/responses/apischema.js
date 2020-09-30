import surveys from '../../surveys';
import { getSurveyPath } from '../../modules/surveys/helpers';

export const apiSchema = {

  pagePath: {
    type: 'String',
    resolver: response => getSurveyPath({ response }),
  },

  survey: {
    typeName: 'Survey',
    resolver: (response, args, context) => {
      return surveys.find(s => s.slug === response.surveySlug)
    },
  },
};
