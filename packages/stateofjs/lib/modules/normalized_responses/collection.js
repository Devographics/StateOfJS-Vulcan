import { createCollection } from 'meteor/vulcan:core';

export const NormalizedResponses = createCollection({
  collectionName: 'NormalizedResponses',

  typeName: 'NormalizedResponse',

  dbCollectionName: 'normalized_responses_2',

  schema: {
    _id: {
      type: String,
      optional: true,
      canRead: ['guests'],
    },
  },
});

export default NormalizedResponses;