import {
  addGraphQLSchema,
  addGraphQLResolvers,
  addGraphQLMutation,
  getSetting,
  addGraphQLQuery,
  nodeCache,
} from 'meteor/vulcan:core';
import fetch from 'node-fetch';
import get from 'lodash/get';
import Saves from '../modules/saves/collection.js';
import Responses from '../modules/responses/collection.js';
import NormalizedResponses from '../modules/normalized_responses/collection.js';
import Users from 'meteor/vulcan:users';
import sortBy from 'lodash/sortBy';
import { normalizeResponse } from './normalization/normalize';
import { getLocales } from './locales';

const translationAPI = getSetting('translationAPI');
const disableAPICache = getSetting('disableAPICache', false);

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

Normalization

*/
const normalizeIds = async (root, args, { currentUser }) => {
  // if (!Users.isAdmin(currentUser)) {
  //   throw new Error('You cannot perform this operation');
  // }
  const results = [];
  const { ids } = args;
  const responses = Responses.find({ _id: { $in: ids } }).fetch();
  for (const document of responses) {
    const { _id } = document;
    const normalization = await normalizeResponse({ document });
    const { result, normalizedFields } = normalization;
    results.push({ normalizedId: result._id, _id, normalizedFields });
  }
  return results;
};

addGraphQLMutation('normalizeIds(ids: [String]): [JSON]');
addGraphQLResolvers({ Mutation: { normalizeIds } });

/*

Cache

*/
const clearCache = (root, args, { currentUser }) => {
  if (!Users.isAdmin(currentUser)) {
    throw new Error('You cannot perform this operation');
  }
  nodeCache.flushAll();
  return nodeCache.getStats();
};

addGraphQLMutation('clearCache: JSON');
addGraphQLResolvers({ Mutation: { clearCache } });

const cacheStats = (root, args, { currentUser }) => {
  if (!Users.isAdmin(currentUser)) {
    throw new Error('You cannot perform this operation');
  }
  return { keys: nodeCache.keys(), stats: nodeCache.getStats() };
};

addGraphQLQuery('cacheStats: JSON');
addGraphQLResolvers({ Query: { cacheStats } });

/*

Locales

*/

// all locales

const surveyLocaleType = `type SurveyLocale {
  id: String,
  label: String
  dynamic: Boolean
  strings: JSON
  translators: [String]
  completion: Float
  repo: String
  translatedCount: Float
  totalCount: Float
}`;

addGraphQLSchema(surveyLocaleType);

const locales = async () => getLocales();

addGraphQLQuery('locales: [SurveyLocale]');
addGraphQLResolvers({ Query: { locales } });

// specific locale (used by Vulcan i18n)
const locale = async (root, { localeId }, context) => {
  const locales = await getLocales();
  const locale = locales.find((l) => l.id === localeId);
  return locale;
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
  mdn: JSON
  patterns: [String]
  twitterName: String
  twitter: Twitter
}`;

addGraphQLSchema(entityType);

const twitterType = `type Twitter {
  userName: String
  avatarUrl: String
}
`;

addGraphQLSchema(twitterType);

const entitiesQuery = `query EntitiesQuery{
  entities {
    id
    name
    tags
    type
    category
    description
    patterns
    mdn {
      locale
      url
      title
      summary
    }
    twitterName
    twitter {
      userName
      avatarUrl
    }
  }
}
`;

const entities = async (root, args) => {
  const { tags, name, id } = args;
  let entities = nodeCache.get('entities');

  if (disableAPICache || !entities) {
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
      console.log('// entities API query error');
      console.log(JSON.stringify(json.errors, '', 2));
      throw new Error();
    }
    entities = get(json, 'data.entities');
    nodeCache.set('entities', entities);
  }

  if (tags) {
    // filter by tags
    entities = entities.filter((e) =>
      tags.every((t) => e.tags && e.tags.includes(t))
    );
  }

  if (name) {
    if (name._like) {
      // filter by keyword search on the name
      entities = entities.filter((e) =>
        e.name.toLowerCase().includes(name._like.toLowerCase())
      );
    }
  }

  if (id) {
    if (id._in) {
      // filter to only include a subset by id
      entities = entities.filter((e) => id._in.includes(e.id));
    }
  }

  entities = sortBy(entities, 'name');

  return entities;
};

addGraphQLQuery(
  'entities(tags: [String], name: String_Selector, id: String_Selector): [Entity]'
);
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

/*

Normalization Debugging

*/
const surveyNormalization = async (root, { surveySlug, fieldName }) => {
  const [initialSegment, sectionSegment, fieldSegment, ...restOfPath] =
    fieldName.split('__');
  const rawFieldPath = `${sectionSegment}.${fieldSegment}.others.raw`;
  const normalizedFieldPath = `${sectionSegment}.${fieldSegment}.others.normalized`;
  const query = {
    surveySlug,
    [rawFieldPath]: { $exists: true },
    $or: [
      { [normalizedFieldPath]: [] },
      { [normalizedFieldPath]: { $exists: false } },
    ],
  };
  const responses = NormalizedResponses.find(query, {
    fields: { _id: 1, responseId: 1, [rawFieldPath]: 1 },
  }).fetch();
  const cleanResponses = responses.map((r) => ({
    _id: r._id,
    responseId: r.responseId,
    value: get(r, rawFieldPath),
  }));
  return cleanResponses;
};

addGraphQLQuery(
  'surveyNormalization(surveySlug: String, fieldName: String): [JSON]'
);
addGraphQLResolvers({ Query: { surveyNormalization } });
