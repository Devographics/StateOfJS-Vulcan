import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

export const Surveys = createCollection({
  collectionName: 'Surveys',

  typeName: 'Survey',

  schema,

  permissions: {
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    canDelete: ['admins'],
  },
});

export default Surveys;
