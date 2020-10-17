import {
  addGraphQLSchema,
  addGraphQLResolvers,
  getSetting,
  addGraphQLQuery,
} from 'meteor/vulcan:core';
import fetch from 'node-fetch';
import get from 'lodash/get';
import Saves from '../modules/saves/collection.js';
import Responses from '../modules/responses/collection.js';

const translationAPI = getSetting('translationAPI');

/*

Survey Type

*/
const surveyType = `type Survey {
  slug: String
  prettySlug: String
  name: String 
  year: Float 
  status: Float 
  imageUrl: String 
}`;

addGraphQLSchema(surveyType);

/*

Locales

*/
const localeQuery = `query LocaleQuery($localeId: String!, $contexts: [Contexts]) {
  locale(localeId: $localeId, contexts: $contexts) {
    id
    strings {
      key
      t
    }
  }
}
`;

const locale = async (root, { localeId }, context) => {
  const response = await fetch(translationAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query: localeQuery, variables: { localeId } }),
  });
  const json = await response.json();

  const locale = get(json, 'data.locale');
  if (json.errors) {
    console.log(json.errors);
    throw new Error('// locale API query error');
  }
  const convertedStrings = {};
  locale.strings &&
    locale.strings.forEach(({ key, t }) => {
      convertedStrings[key] = t;
    });
  return { ...locale, strings: convertedStrings };
};

addGraphQLResolvers({ Query: { locale } });

/*

Entities

*/
const entityType = `type Entity {
  id: String
  name: String
  homepage: String
  category: String
  npm: String
  description: String
  type: String
  tags: [String]
  context: String
  mdn: JSON
}`;

addGraphQLSchema(entityType);

const entitiesQuery = `query EntitiesQuery {
  entities {
    id
    name
    tags
    context
    type
    category
    description
    mdn {
      locale
      url
      title
      summary
    }
  }
}
`;

const entities = async () => {
  const response = await fetch(translationAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query: entitiesQuery, variables: {} }),
  });
  const json = await response.json();
  if (json.errors) {
    console.log(json.errors);
    throw new Error('// entities API query error');
  }
  const entities = get(json, 'data.entities');
  return entities;
};

addGraphQLQuery('entities: [Entity]');
addGraphQLResolvers({ Query: { entities } });

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
      averageCompletionRate: formatResult(
        responses[0].averageCompletion,
        '%'
      ),
      averageCompletionDuration: formatResult(
        responsesOver50[0] && responsesOver50[0].averageDuration,
        'min'
      ),
    },
  };
};

addGraphQLQuery('stats: Stats');
addGraphQLResolvers({ Query: { stats } });
