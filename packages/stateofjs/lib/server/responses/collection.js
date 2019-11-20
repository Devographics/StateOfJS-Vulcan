import { extendCollection } from "meteor/vulcan:core";
import { Responses } from "../../modules/responses/index.js";

function duplicateCheck(validationErrors, { document, currentUser }) {
  const existingResponse = Responses.findOne({
    surveyId: document.surveyId,
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
  callbacks: {
    create: {
      validate: [duplicateCheck]
    }
  }
});
