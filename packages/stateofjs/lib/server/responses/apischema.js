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
      return NormalizedResponses.findOne({ _id: response._id });
    },
  },

  knowledgeRanking: {
    typeName: 'Int',
    resolver: async (response) => {
      const { surveySlug, knowledgeScore } = response;
      const match = {
        surveySlug,
        knowledgeScore: { $exists: true },
      };
      const totalResults = await Responses.find(match).count();
      const results = await Responses.rawCollection()
        .aggregate([
          {
            $match: match,
          },
          {
            $project: {
              scoredAbove: { $gt: ['$knowledgeScore', knowledgeScore] },
            },
          },
          {
            $count: 'scoredAboveCount',
          },
        ])
        .toArray();
      // remove 1 to account for own response
      const scoredAboveCount = results[0].scoredAboveCount - 1;
      return Math.round((scoredAboveCount * 100) / totalResults);
    },
  },
};
