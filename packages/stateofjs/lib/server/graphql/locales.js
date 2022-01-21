import {
  addGraphQLSchema,
  addGraphQLResolvers,
  addGraphQLQuery,
} from 'meteor/vulcan:core';
import { getLocales } from '../locales';

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
