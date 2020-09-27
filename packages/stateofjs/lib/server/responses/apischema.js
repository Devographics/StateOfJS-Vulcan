import surveys from '../../surveys';
import { getResponsePath } from '../../modules/responses/helpers';

export const apiSchema = {

  pagePath: {
    type: 'String',
    resolver: response => getResponsePath(response),
  },

  survey: {
    typeName: 'Survey',
    resolver: (response, args, context) => {
      return surveys.find(s => s.slug === response.surveySlug)
    },
  },
};
