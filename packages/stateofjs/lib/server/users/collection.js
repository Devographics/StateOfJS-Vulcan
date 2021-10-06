import { extendCollection } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { addEmailToEmailOctopus } from './callbacks';

import { apiSchema } from './apischema.js';

extendCollection(Users, {
  apiSchema,

  callbacks: {
    create: {
      async: [/* addEmailToEmailOctopus */]
    }
  }
});
