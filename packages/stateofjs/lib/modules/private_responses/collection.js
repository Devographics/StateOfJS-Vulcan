import { createCollection } from 'meteor/vulcan:core';

export const PrivateResponses = createCollection({
  collectionName: 'PrivateResponses',

  typeName: 'PrivateResponse',

  dbCollectionName: 'private_responses',

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

export default PrivateResponses;
