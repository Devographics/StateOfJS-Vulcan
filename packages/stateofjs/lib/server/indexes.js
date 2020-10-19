/*

MongoDB indexes for geographic search and performance

*/

import Responses from '../modules/responses/collection';
import NormalizedResponses from '../modules/normalized_responses/collection';

Responses.rawCollection().createIndex({ userId: 1 });
Responses.rawCollection().createIndex({ surveySlug: 1 });
Responses.rawCollection().createIndex({ surveySlug: 1, knowledgeScore: 1 });
Responses.rawCollection().createIndex({ createdAt: 1 });
Responses.rawCollection().createIndex({ updatedAt: 1 });

NormalizedResponses.rawCollection().createIndex({ responseId: 1 });
