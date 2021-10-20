import { getSetting, nodeCache } from 'meteor/vulcan:core';
import get from 'lodash/get';
import fetch from 'node-fetch';

const disableAPICache = getSetting('disableAPICache', false);
const translationAPI = getSetting('translationAPI');

// fetch data from sojs api

const localesQuery = `query LocaleQuery($contexts: [Contexts]) {
  locales(contexts: $contexts, enableFallbacks: true) {
    id
    completion
    label
    strings {
        key
        t
        context
        fallback
    }
    translators
  }
}
`;

const contexts = [
  'common',
  'surveys',
  'accounts',
  'state_of_css',
  'state_of_css_2021_survey',
  'state_of_js',
  'state_of_js_2020_survey',
];

export const fetchLocales = async () => {
  const response = await fetch(translationAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: localesQuery,
      variables: { contexts },
    }),
  });
  const json = await response.json();

  if (json.errors) {
    console.log(json.errors);
    throw new Error('// locale API query error');
  }
  const locales = get(json, 'data.locales');

  const convertedLocales = locales.map((locale) => {
    const convertedStrings = {};
    locale.strings &&
      locale.strings.forEach(({ key, t }) => {
        convertedStrings[key] = t;
      });
    const convertedLocale = { ...locale, strings: convertedStrings };
    return convertedLocale;
  });

  return convertedLocales;
};

export const getLocales = async () => {
  let locales = nodeCache.get('locales');
  if (disableAPICache || !locales) {
    locales = await fetchLocales();
    nodeCache.set('locales', locales);
  }
  return locales;
};
