import Responses from '../modules/responses/collection';
import surveys from '../surveys';
import { makeId, getQuestionFieldName } from '../modules/responses/helpers.js';

const js2019 = surveys.find(s => s.slug === 'js2019');

export const surveyIdToSlug = async () => {
  // development
  Responses.update({surveyId: 'QRadnLi4FJnqxntnb'}, {$set: {surveySlug: 'js2019'}}, {multi: true})
  Responses.update({surveyId: 'fKBaReNz6JY9nP4Xj'}, {$set: {surveySlug: 'css2020'}}, {multi: true})
  // production
  Responses.update({surveyId: 'EvFFNQMH4h9kG2wmw'}, {$set: {surveySlug: 'js2019'}}, {multi: true})
}

/*

Migrate field names of the type:

  datalayer_apollo

To:

  js2019__tools__apollo

*/
export const migrateResponsesFieldNames = async () => {
  const responses = Responses.find({ fieldNamesMigrated: { $exists: false }, surveySlug: 'js2019' }, { limit: 1000 }).fetch();
  console.log(`// Migrating field names for ${responses.length} responses…`);
  responses.forEach(response => {
    let newResponse = { fieldNamesMigrated: true };
    Object.keys(response).forEach(fieldName => {
      const [ sectionSlug, questionSlug ] = fieldName.split('_');

      const section = js2019.outline.find(s => makeId(s.title) === sectionSlug);
      if (section) {
        const questionFieldName = getQuestionFieldName(js2019, section, { id: questionSlug });
        newResponse[questionFieldName] = response[fieldName]
      } else {
        newResponse[fieldName] = response[fieldName]
      }
    });
    Responses.update({ _id: response._id}, newResponse);
  });
  console.log(`-> Done migrating field names.`);

}