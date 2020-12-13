import Responses from '../modules/responses/collection';
import NormalizedResponses from '../modules/normalized_responses/collection';
import surveys from '../surveys';
import { normalizeResponse } from './normalization/normalize';
import { getEntities } from './normalization/helpers';
import { logToFile } from 'meteor/vulcan:core';
// import Users from 'meteor/vulcan:users';
import {
  js2019FieldMigrations,
  normalizeJS2019Value,
  otherValueNormalisations,
} from './migrations';

/*

Migrations

*/
export const renameFieldMigration = async (collection, field1, field2) => {
  const result = await collection
    .rawCollection()
    .updateMany({}, { $rename: { [field1]: field2 } });

  // eslint-disable-next-line no-console
  console.log(`// ${field1} -> ${field2} migration done `);
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
    { limit: 30000 }
  ).fetch();

  console.log(`// Migrating field names for ${responses.length} responses…`);

  responses.forEach(async (response, i) => {
    const newResponse = {
      fieldNamesMigrated: true,
      survey: 'state_of_js',
      year: 2019,
    };

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

In JS 2020 raw responses, migrate vue to vuejs and datalayer to data_layer

*/
export const migrateJS2020ResponsesFieldNames = async () => {
  await renameFieldMigration(
    Responses,
    'js2020__tools__vue__experience',
    'js2020__tools__vuejs__experience'
  );
  await renameFieldMigration(
    Responses,
    'js2020__tools__react_native__experience',
    'js2020__tools__reactnative__experience'
  );
  await renameFieldMigration(
    Responses,
    'js2020__tools__native_apps__experience',
    'js2020__tools__nativeapps__experience'
  );
  await renameFieldMigration(
    Responses,
    'js2020__tools_others__data_layer__prenormalized',
    'js2020__tools_others__datalayer__prenormalized'
  );
  await renameFieldMigration(
    Responses,
    'js2020__happiness__data_layer',
    'js2020__happiness__datalayer'
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

export const deleteJS2019NormalizedData = async () => {
  await NormalizedResponses.remove({ survey: 'js', year: 2019});
}

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

export const logOtherSectors = async () => {
  await logField('js2020__user_info__industry_sector__others', 'js2020');
};

/*

Migrate all normalized data

*/
export const migrateAllNormalizedData = async () => {
  console.log('// Migrating all normalized data…');

  console.log(`// 1. Renaming 'other_tools' to 'tools_others'…`);
  await renameFieldMigration(
    NormalizedResponses,
    'other_tools',
    'tools_others'
  );

  console.log(`// 2. Updating survey field ('js' to 'state_of_js')…`);
  const result = NormalizedResponses.update(
    { survey: 'js' },
    { $set: { survey: 'state_of_js' } },
    { multi: true }
  );
  console.log(`-> Updated ${result} documents`)

  console.log(`// 3. Renormalizing values…`);
  Object.keys(otherValueNormalisations).forEach((fieldName) => {
    console.log(`// ${fieldName}`);
    const fieldValues = otherValueNormalisations[fieldName];
    Object.keys(fieldValues).forEach((oldValue) => {
      const newValue = otherValueNormalisations[fieldName][oldValue];
      console.log(`// ${oldValue} to ${newValue}`);
      const selector = { [fieldName]: oldValue };
      const operation = { $set: { [fieldName]: newValue } };
      const result = NormalizedResponses.update(selector, operation, { multi: true });
      console.log(`-> Updated ${result} documents`)
    });
  });
};
