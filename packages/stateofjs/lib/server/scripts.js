import Responses from '../modules/responses/collection';
import NormalizedResponses from '../modules/normalized_responses/collection';
import surveys from '../surveys';
import { makeId, getQuestionFieldName } from '../modules/responses/helpers.js';
import { normalizeResponse } from './normalization/normalize';
import { getEntities } from './normalization/helpers';
import { logToFile } from 'meteor/vulcan:core';
import { getSurveyBySlug } from '../modules/surveys/helpers';
import last from 'lodash/last';

const js2019 = surveys.find((s) => s.slug === 'js2019');

export const surveyIdToSlug = async () => {
  // development
  Responses.update(
    { surveyId: 'QRadnLi4FJnqxntnb' },
    { $set: { surveySlug: 'js2019' } },
    { multi: true }
  );
  Responses.update(
    { surveyId: 'fKBaReNz6JY9nP4Xj' },
    { $set: { surveySlug: 'css2020' } },
    { multi: true }
  );
  // production
  Responses.update(
    { surveyId: 'EvFFNQMH4h9kG2wmw' },
    { $set: { surveySlug: 'js2019' } },
    { multi: true }
  );
};

/*

Migrate field names of the type:

  datalayer_apollo

To:

  js2019__tools__apollo

*/
export const migrateResponsesFieldNames = async () => {
  const responses = Responses.find(
    { fieldNamesMigrated: { $exists: false }, surveySlug: 'js2019' },
    { limit: 1000 }
  ).fetch();
  console.log(`// Migrating field names for ${responses.length} responses…`);
  responses.forEach((response) => {
    let newResponse = { fieldNamesMigrated: true };
    Object.keys(response).forEach((fieldName) => {
      const [sectionSlug, questionSlug] = fieldName.split('_');

      const section = js2019.outline.find(
        (s) => makeId(s.title) === sectionSlug
      );
      if (section) {
        const questionFieldName = getQuestionFieldName(js2019, section, {
          id: questionSlug,
        });
        newResponse[questionFieldName] = response[fieldName];
      } else {
        newResponse[fieldName] = response[fieldName];
      }
    });
    Responses.update({ _id: response._id }, newResponse);
  });
  console.log(`-> Done migrating field names.`);
};

export const assignNormalizedResponseId = async () => {
  const count = Responses.find({
    surveySlug: 'css2020',
    normalizedResponseId: { $exists: false },
  }).count();
  console.log(
    `// Found ${count} responses with no normalizedResponseId field… (${new Date()})`
  );

  Responses.find(
    {
      surveySlug: 'css2020',
      normalizedResponseId: { $exists: false },
    },
    { sort: { createdAt: -1 } }
  ).forEach((response) => {
    const normResp = NormalizedResponses.findOne({ responseId: response._id });
    if (normResp) {
      Responses.update(
        { _id: response._id },
        { $set: { normalizedResponseId: normResp._id } }
      );
    }
  });
  console.log(`-> Done assigning normalizedResponseId field (${new Date()})`);
};

/*

Renormalize a survey's results

*/
const renormalizeSurvey = async (surveySlug) => {
  const limit = 10000;
  const survey = getSurveyBySlug(surveySlug);
  const selector = { surveySlug, $or: [] };
  const entities = await getEntities();

  for (const s of survey.outline) {
    for (const field of s.questions) {
      const { fieldName } = field;
      const [initialSegment, ...restOfPath] = fieldName.split('__');
      if (last(restOfPath) === 'others') {
        selector['$or'].push({ [fieldName]: { $exists: true } });
      }
    }
  }

  const startAt = new Date();
  let progress = 0;
  const responsesCursor = Responses.find(selector, { limit });
  const count = responsesCursor.count();
  const tickInterval = Math.round(count / 200);

  await logToFile(
    'normalization.csv',
    'id, fieldName, value, matchTags, id, pattern, rules, match \n',
    { mode: 'overwrite' }
  );
  await logToFile('normalization.txt', '', { mode: 'overwrite' });
  await logToFile('normalization_errors.txt', '', { mode: 'overwrite' });
  console.log(
    `// Renormalizing survey ${surveySlug}… Found ${count} responses to renormalize. (${startAt})`
  );

  const responses = responsesCursor.fetch();
  for (const response of responses) {
    try {
      // console.log(progress, progress % tickInterval, response._id);
      await normalizeResponse({
        document: response,
        entities,
        log: true,
      });
      progress++;
      if (progress % tickInterval === 0) {
        console.log(`  -> Normalized ${progress}/${count} responses…`);
      }
    } catch (error) {
      console.log('// Renormalization error');
      console.log(error);
    }
  }

  // responsesCursor.forEach(async (response) => {
  //   try {
  //     await normalizeResponse({ document: response });
  //     progress++;
  //     if (progress % tickInterval === 0) {
  //       console.log(`  -> Normalized ${progress}/${count} responses…`);
  //     }
  //   } catch (error) {
  //     console.log('// Renormalization error');
  //     console.log(error);
  //   }
  // });

  const endAt = new Date();
  const duration = Math.ceil((endAt - startAt) / (1000 * 60));
  console.log(
    `-> Done renormalizing ${count} responses in survey ${surveySlug}. (${endAt}) - ${duration} min`
  );
};

export const renormalizeCSS2020 = async () => {
  await renormalizeSurvey('css2020');
};

export const logMissingFeatures = async () => {
  let results = Responses.find(
    {
      surveySlug: 'css2020',
      css2020__opinions_other__currently_missing_from_css__others: {
        $exists: 1,
      },
    },
    {
      fields: {
        css2020__opinions_other__currently_missing_from_css__others: 1,
      },
    }
  ).fetch();
  results = results.map(r => r.css2020__opinions_other__currently_missing_from_css__others);
  await logToFile('missing_from_css.json', results, { mode: 'overwrite'});
};
