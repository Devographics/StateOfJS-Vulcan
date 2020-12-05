import Responses from '../modules/responses/collection';
import NormalizedResponses from '../modules/normalized_responses/collection';
import surveys from '../surveys';
import { makeId, getQuestionFieldName } from '../modules/responses/helpers.js';
import { normalizeResponse } from './normalization/normalize';
import { getEntities, generateEntityRules } from './normalization/helpers';
import { logToFile } from 'meteor/vulcan:core';
import { getSurveyBySlug } from '../modules/surveys/helpers';
import last from 'lodash/last';
import Users from 'meteor/vulcan:users';
import {
  js2019FieldMigrations,
  js2019ChoicesFieldsToNormalize,
  js2019ChoicesNormalizationValues,
  js2019OptionsFieldsToNormalize,
  js2019OptionsNormalizationValues,
  js2019ExperienceNormalizationValues,
  normalizeJS2019Value,
} from './migrations';

/*

Migrations

*/
export const renameFieldMigration = (collection, field1, field2) => {
  const items = collection
    .find({
      [field1]: { $exists: true },
      [field2]: { $exists: false },
    })
    .fetch();

  if (items.length) {
    // eslint-disable-next-line no-console
    console.log(`// Starting ${field1} -> ${field2} mutation…`);
    items.forEach((document) => {
      // eslint-disable-next-line no-console
      console.log(`Migrating document ${document._id}`);
      collection.update(document._id, { $set: { [field2]: document[field1] } });
    });
    // eslint-disable-next-line no-console
    console.log(`// ${field1} -> ${field2} mutation done.`);
  }
};

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

Also migrate values at the same time (neverheard -> never_heard)

*/
export const migrateResponsesFieldNames = async () => {
  await logToFile('2019migration.txt', `${new Date()}\n\n`, {
    mode: 'overwrite',
  });

  const responses = Responses.find(
    { fieldNamesMigrated: { $exists: false }, surveySlug: 'js2019' },
    { limit: 99000 }
  ).fetch();

  console.log(`// Migrating field names for ${responses.length} responses…`);
  responses.forEach(async (response) => {
    let newResponse = { fieldNamesMigrated: true };

    // convert field names & normalize values
    Object.keys(response).forEach((oldFieldName) => {
      let value = response[oldFieldName];
      const newFieldName = js2019FieldMigrations[oldFieldName];
      if (typeof newFieldName === 'undefined') {
        throw new Error(
          `// Field ${oldFieldName} not defined in JS2019 migration object.`
        );
      } else if (newFieldName === null) {
        // copy over value to same field name
        newResponse[oldFieldName] = value;
      } else {
        if (Array.isArray(value)) {
          value = value.map(normalizeJS2019Value)
        } else {
          value = normalizeJS2019Value(value)
        }
      }
    });
    await logToFile('2019migration.txt', newResponse, { mode: 'append' });

    Responses.update({ _id: response._id }, newResponse);
  });

  console.log(
    `-> Done migrating field names for ${
      responses.length
    } documents at ${new Date()}.`
  );
};

/*

Add a normalizedResponseId field to responses

*/
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

Add a normalizedResponseId field to JS2019 responses

*/
export const assignJS2019NormalizedResponseId = async () => {
  const limit = 3000;
  const selector = {
    surveySlug: 'js2019',
    normalizedResponseId: { $exists: false },
  };
  const count = Responses.find(selector, { limit }).count();
  let noNormRespCount = 0;

  console.log(
    `// Found ${count} responses with no normalizedResponseId field… (${new Date()})`
  );

  Responses.find(selector, { limit, sort: { createdAt: -1 } }).forEach(
    (response) => {
      const nrSelector = {
        'user_info.email': response.email,
        survey: 'js',
        year: 2019,
      };
      const normResp = NormalizedResponses.findOne(nrSelector);
      if (normResp) {
        // console.log(
        //   `// Found corresponding normalized response ${normResp._id} for response id ${response._id}`
        // );
        // NormalizedResponses.update(
        //   { _id: normResp._id },
        //   { $set: { responseId: response._id, surveySlug: 'js2019' } }
        // );
        // Responses.update(
        //   { _id: response._id },
        //   { $set: { normalizedResponseId: normResp._id } }
        // );
      } else {
        noNormRespCount++;
        // console.log(
        //   `// Could not find corresponding normalized response for response id ${response._id}`
        // );
        // console.log(nrSelector)
      }
    }
  );
  console.log(
    `-> Done assigning normalizedResponseId field. Also found ${noNormRespCount} reponses with no matching normalized response (${new Date()})`
  );
};

/*

Migrate opinions_other to opinions_others for consistency

*/
export const renameOpinionsOther = async () => {
  await renameFieldMigration(
    Responses,
    'css2020__opinions_other__currently_missing_from_css__others',
    'css2020__opinions_others__currently_missing_from_css__others'
  );
};

/*

Renormalize a survey's results

*/
const renormalizeSurvey = async (surveySlug) => {
  const fileName = `${surveySlug}_normalization`;
  const limit = 99999;
  // const survey = getSurveyBySlug(surveySlug);
  const selector = { surveySlug };
  const entities = await getEntities();

  // for (const s of survey.outline) {
  //   for (const field of s.questions) {
  //     const { fieldName } = field;
  //     const [initialSegment, ...restOfPath] = fieldName.split('__');
  //     if (last(restOfPath) === 'others') {
  //       selector['$or'].push({ [fieldName]: { $exists: true } });
  //     }
  //   }
  // }

  const startAt = new Date();
  let progress = 0;
  const responsesCursor = Responses.find(selector, { limit });
  const count = responsesCursor.count();
  const tickInterval = Math.round(count / 200);

  await logToFile(
    `${fileName}.txt`,
    'id, fieldName, value, matchTags, id, pattern, rules, match \n',
    { mode: 'overwrite' }
  );
  await logToFile(`${fileName}.txt`, '', { mode: 'overwrite' });
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
        fileName,
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

export const renormalizeJS2019 = async () => {
  await renormalizeSurvey('js2019');
};

/*

Log all "currently missing features from CSS" answers to file

*/
export const logField = async (fieldName, surveySlug) => {
  let results = Responses.find(
    {
      surveySlug,
      [fieldName]: {
        $exists: 1,
      },
    },
    {
      fields: {
        [fieldName]: 1,
      },
    }
  ).fetch();
  results = results.map((r) => r[fieldName]);
  await logToFile(`${fieldName}.json`, results, { mode: 'overwrite' });
};

export const logMissingCSSFeatures = async () => {
  await logField(
    'css2020__opinions_other__currently_missing_from_css__others',
    'css2020'
  );
};

export const logEmail = async () => {
  await logField('email', 'css2020');
};

export const logMissingJSFeatures = async () => {
  await logField('js2019__opinions_others__missing_from_js__others', 'js2019');
};
/*

Add a locale field to responses

*/
export const assignLocale = async () => {
  const responses = Responses.find(
    {
      surveySlug: 'css2020',
      locale: { $exists: false },
    },
    { sort: { createdAt: -1 } }
  );
  const count = responses.count();

  console.log(
    `// Found ${count} responses with no locale field… (${new Date()})`
  );

  responses.forEach((response) => {
    const user = Users.findOne({ _id: response.userId });
    if (user && user.locale) {
      Responses.update(
        { _id: response._id },
        { $set: { locale: user.locale } }
      );
    }
  });
  console.log(`-> Done assigning locale field (${new Date()})`);
};
