import { addGraphQLSchema, addGraphQLResolvers, getSetting } from 'meteor/vulcan:core';
import fetch from 'node-fetch';
import get from 'lodash/get';

const surveyType = `type Survey {
  slug: String
  prettySlug: String
  name: String 
  year: Float 
  status: Float 
  imageUrl: String 
}`;

addGraphQLSchema(surveyType);


const translationAPI = getSetting('translationAPI');

const localeQuery = `query LocaleQuery($localeId: String!, $contexts: [LocaleContexts]) {
  locale(localeId: $localeId, contexts: $contexts) {
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

  const strings = get(json, 'data.locale.strings');
  const convertedStrings = {};
  strings.forEach(({ key, t }) => {
    convertedStrings[key] = t;
  });
  return { id: localeId, strings: convertedStrings };
};

addGraphQLResolvers({ Query: { locale } });
