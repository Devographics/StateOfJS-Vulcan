import { Utils } from 'meteor/vulcan:core';
import { statuses, statusesOptions } from '../constants.js';
import {Responses} from '../responses';

const schema = {
  // default properties

  _id: {
    type: String,
    optional: true,
    canRead: ['guests'],
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ['admins'],
    onCreate: () => {
      return new Date();
    },
  },
  updatedAt: {
    type: Date,
    optional: true,
    canRead: ['admins'],
    onUpdate: () => {
      return new Date();
    },
  },
  userId: {
    type: String,
    optional: true,
    canRead: ['admins'],
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      relation: 'hasOne',
    },
  },

  // custom properties

  name: {
    type: String,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
  },
  year: {
    type: Number,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
  },
  status: {
    type: Number,
    optional: true,
    input: 'select',
    canRead: ['admins'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    defaultValue: statuses.preview,
    options: statusesOptions,
  },
  pagePath: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      resolver: survey => `/survey/${survey.slug}/${survey.year}/`,
    },
  },
  slug: {
    type: String,
    optional: true,
    canRead: ['guests'],
    onCreate: ({ document }) => Utils.slugify(document.name),
    onUpdate: ({ document }) => Utils.slugify(document.name),
  },

  // GraphQL-only fields

  currentUserResponse: {
    type: Object,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'Response',
      resolver: (survey, args, context) => {
        const { currentUser, Users } = context;
        const response = Responses.findOne({
          surveyId: survey._id,
          userId: currentUser._id,
        });
        const restrictedResponse = Users.restrictDocuments({
          user: currentUser,
          collection: Responses,
          documents: [response],
        })[0];
        return restrictedResponse;
      },
    },
  },
};

export default schema;
