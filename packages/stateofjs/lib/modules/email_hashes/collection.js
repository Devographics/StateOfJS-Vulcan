import { createCollection } from 'meteor/vulcan:core';

export const EmailHashes = createCollection({
  collectionName: 'EmailHashes',

  typeName: 'EmailHash',

  dbCollectionName: 'email_hashes',

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

export default EmailHashes;
