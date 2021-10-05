import { extendCollection } from 'meteor/vulcan:core';
import { PrivateResponses } from '../../modules/private_responses/index.js';
import dbSchema from './dbschema';

extendCollection(PrivateResponses, {
  dbSchema,

  // callbacks: {},
});
