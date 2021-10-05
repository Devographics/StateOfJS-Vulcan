import { createSchema } from 'meteor/vulcan:core';

const userInfoSchema = createSchema({
  github_username: {
    type: String,
    optional: false,
  },
  twitter_username: {
    type: String,
    optional: false,
  },
});

export default {
  surveySlug: {
    type: String,
    optional: false,
  },
  responseId: {
    type: String,
    optional: false,
  },
  user_info: {
    type: userInfoSchema,
    optional: true,
  },
  emailExported: {
    type: Boolean,
    optional: true,
  },
};
