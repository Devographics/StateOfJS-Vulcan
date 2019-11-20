import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

export const Responses = createCollection({
  collectionName: 'Responses',

  typeName: 'Response',

  schema,

  permissions: {
    canRead: ['owners', 'admins'],
    canCreate: ['members'],
    canUpdate: ['owners', 'admins'],
    canDelete: ['admins'],
  },
});

export default Responses;
