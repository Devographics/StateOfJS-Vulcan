import { createCollection } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import schema from './schema.js';
import { statuses } from '../constants.js';
import surveys from '../../surveys';

export const Responses = createCollection({
  collectionName: 'Responses',

  typeName: 'Response',

  schema,

  permissions: {
    canRead: ['owners', 'admins'],
    canCreate: ['members'],
    // canUpdate: ['owners', 'admins'],
    canUpdate: ({ user, document: response }) => {
      const survey = surveys.find(s => s.slug === response.surveySlug);
      return Users.isAdmin(user) || user._id === response.userId && survey.status === statuses.open
    },
    canDelete: ['admins'],
  },
});

export default Responses;
