import {
  addGraphQLSchema,
  addGraphQLResolvers,
  getSetting,
  addGraphQLQuery,
  nodeCache,
} from 'meteor/vulcan:core';
import fetch from 'node-fetch';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';

const translationAPI = getSetting('translationAPI');
const disableAPICache = getSetting('disableAPICache', false);

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
