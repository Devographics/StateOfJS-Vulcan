import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';
import { canModifyResponse } from './helpers';

export const Responses = createCollection({
  collectionName: 'Responses',

  typeName: 'Response',

  schema,

  permissions: {
    canRead: ['owners', 'admins'],
    canCreate: ['members'],
    // canUpdate: ['owners', 'admins'],
    canUpdate: ({ user, document: response }) => {
      return canModifyResponse(response, user);
    },
    canDelete: ['admins'],
  },
});

export default Responses;
