import { createCollection } from 'meteor/vulcan:core';

export const NormalizedResponses = createCollection({
  collectionName: 'NormalizedResponses',

  typeName: 'NormalizedResponse',

  dbCollectionName: 'normalized_responses',

  mutations: null,

  resolvers: null,
  
  schema: {
    _id: {
      type: String,
      optional: true,
      canRead: ['guests'],
    },
  },
});

export default NormalizedResponses;