import { extendCollection } from 'meteor/vulcan:core';
import { Responses } from '../../modules/responses/index.js';
// import { updateElasticSearchOnCreate, updateElasticSearchOnUpdate } from '../elasticsearch/index.js';
import { apiSchema } from './apischema';
// note: normalizing responses on every response update is too slow
// import { normalizeResponse } from '../normalization/normalize';

function duplicateCheck(validationErrors, { document, currentUser }) {
  const existingResponse = Responses.findOne({
    surveySlug: document.surveySlug,
    userId: currentUser._id
  });
  if (existingResponse) {
    validationErrors.push({
      break: true,
      id: 'responses.duplicate_responses',
      message: 'Sorry, you already have a session in progress for this survey',
      properties: { responseId: existingResponse._id }
    });
  }

}

extendCollection(Responses, {

  apiSchema,

  callbacks: {
    create: {
      validate: [duplicateCheck],
      async: [/* updateElasticSearchOnCreate */]
    },
    update: {
      async: [/* updateElasticSearchOnUpdate, */ /* normalizeResponse */]
    }
  }
});
