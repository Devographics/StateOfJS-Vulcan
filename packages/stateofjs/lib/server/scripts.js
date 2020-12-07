import Responses from '../modules/responses/collection';
import NormalizedResponses from '../modules/normalized_responses/collection';
import surveys from '../surveys';
import { normalizeResponse } from './normalization/normalize';
import { getEntities } from './normalization/helpers';
import { logToFile } from 'meteor/vulcan:core';
// import Users from 'meteor/vulcan:users';
import { js2019FieldMigrations, normalizeJS2019Value } from './migrations';

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
    console.log(
      `// Starting ${field1} -> ${field2} migration on ${items.length} documents…`
    );
    items.forEach((document) => {
      // eslint-disable-next-line no-console
      console.log(`Migrating document ${document._id}`);
      collection.update(document._id, { $set: { [field2]: document[field1] } });
    });
    // eslint-disable-next-line no-console
    console.log(
      `// ${field1} -> ${field2} mutation done (${items.length} documents).`
    );
  } else {
    console.log(`// Migration ${field1} -> ${field2}: no documents to migrate`);
  }
};

/*

Migrate field names of the type:

  datalayer_apollo

To:

  js2019__tools__apollo

Also migrate values at the same time (neverheard -> never_heard)

*/

export const migrateJS2019ResponsesFieldNames = async () => {
  await logToFile('2019migration.txt', `${new Date()}\n\n`, {
    mode: 'overwrite',
  });

  const responses = Responses.find(
    { fieldNamesMigrated: { $exists: false }, surveySlug: 'js2019' },
    { limit: 10000 }
  ).fetch();

  console.log(`// Migrating field names for ${responses.length} responses…`);

  responses.forEach(async (response, i) => {
    const newResponse = { fieldNamesMigrated: true };

    // convert field names & normalize values
    Object.keys(response).forEach((oldFieldName) => {
      const value = response[oldFieldName];
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
          newResponse[newFieldName] = value.map(normalizeJS2019Value);
        } else {
          newResponse[newFieldName] = normalizeJS2019Value(value);
        }
      }
    });

    await logToFile('2019migration.txt', newResponse, { mode: 'append' });

    await Responses.update({ _id: response._id }, newResponse);

    if (i % 100 === 0) {
      console.log(`-> Migrated ${i}/${responses.length} responses.`);
    }
  });

  console.log(
    `-> Done migrating field names for ${
      responses.length
    } documents at ${new Date()}.`
  );
};

/*

Add a normalizedResponseId field to JS2019 responses

WIP

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

In JS 2020 raw responses, migrate vue to vuejs and datalayer to data_layer

*/
export const migrateVueAndDataLayerJS2020 = async () => {
  await renameFieldMigration(
    Responses,
    'js2020__tools__vue__experience',
    'js2020__tools__vuejs__experience'
  );
  await renameFieldMigration(
    Responses,
    'js2020__tools_others__datalayer__prenormalized',
    'js2020__tools_others__data_layer__prenormalized'
  );
  await renameFieldMigration(
    Responses,
    'js2020__happiness__datalayer',
    'js2020__happiness__data_layer'
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

export const renormalizeJS2020 = async () => {
  await renormalizeSurvey('js2020');
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
