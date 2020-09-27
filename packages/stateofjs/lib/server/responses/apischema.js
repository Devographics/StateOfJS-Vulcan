import surveys from '../../surveys';

export const apiSchema = {
  survey: {
    typeName: 'Survey',
    resolver: (response, args, context) => {
      return surveys.find(s => s.slug === response.surveySlug)
    },
  },
};
