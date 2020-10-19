import surveys from '../../surveys';
import { getSurveyPath } from '../../modules/surveys/helpers';
import Responses from '../../modules/responses/collection';
import NormalizedResponses from '../../modules/normalized_responses/collection';

export const apiSchema = {
  pagePath: {
    type: 'String',
    resolver: (response) => getSurveyPath({ response }),
  },

  survey: {
    typeName: 'Survey',
    resolver: (response, args, context) => {
      return surveys.find((s) => s.slug === response.surveySlug);
    },
  },

  normalizedResponse: {
    typeName: 'JSON',
    resolver: (response) => {
      return NormalizedResponses.findOne({ responseId: response._id });
    },
  },

  knowledgeRanking: {
    typeName: 'Int',
    resolver: async (response) => {
      const { surveySlug, knowledgeScore } = response;

      const totalResults = await Responses.find({
        surveySlug,
        knowledgeScore: { $exists: true },
      }).count();

      const scoredAboveCount = await Responses.find({
        surveySlug,
        knowledgeScore: { $gt: knowledgeScore },
      }).count();

      const scoreAbovePercent = Math.round(
        ((scoredAboveCount - 1) * 100) / totalResults
      );

      return scoreAbovePercent;
    },
  },
};
