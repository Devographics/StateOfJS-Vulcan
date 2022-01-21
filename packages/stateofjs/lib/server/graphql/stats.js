import {
  addGraphQLSchema,
  addGraphQLResolvers,
  addGraphQLQuery,
} from 'meteor/vulcan:core';
import Saves from '../../modules/saves/collection.js';
import Responses from '../../modules/responses/collection.js';

/*

Stats

*/
const statsType = `type Stats {
  contents: JSON
}`;

addGraphQLSchema(statsType);

const formatResult = (r, unit) => `${Math.round(r)}${unit}`;

const stats = async () => {
  const saves = await Saves.rawCollection()
    .aggregate([
      { $group: { _id: null, average: { $avg: '$duration' } } },
      { $sort: { createdAt: -1 } },
      { $limit: 100 },
    ])
    .toArray();

  const responses = await Responses.rawCollection()
    .aggregate([
      { $group: { _id: null, averageCompletion: { $avg: '$completion' } } },
    ])
    .toArray();

  const responsesOver50 = await Responses.rawCollection()
    .aggregate([
      { $match: { completion: { $gte: 50 } } },
      { $group: { _id: null, averageDuration: { $avg: '$duration' } } },
    ])
    .toArray();

  return {
    contents: {
      averageSaveDuration: formatResult(saves[0].average, 'ms'),
      averageCompletionRate: formatResult(responses[0].averageCompletion, '%'),
      averageCompletionDuration: formatResult(
        responsesOver50[0] && responsesOver50[0].averageDuration,
        'min'
      ),
    },
  };
};

addGraphQLQuery('stats: Stats');
addGraphQLResolvers({ Query: { stats } });
