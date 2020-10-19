import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

export const Saves = createCollection({
  collectionName: 'Saves',

  typeName: 'Save',

  schema,

  queries: null,

  mutations: {
    update: null,
    delete: null
  },

  permissions: {
    canRead: ['owners', 'admins'],
    canCreate: ['members'],
  },
});

export default Saves;
