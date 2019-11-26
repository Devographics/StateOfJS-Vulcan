import { outline } from '../outline.js';
import {
  getQuestionObject,
  getQuestionSchema,
  getResponsePath,
  getCompletionPercentage,
} from './helpers.js';

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
    onCreate: () => {
      return new Date();
    },
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

  year: {
    type: Number,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    onCreate: () => {
      return new Date().getFullYear();
    },
  },  
  completion: {
    type: Number,
    optional: true,
    canRead: ['guests'],
    onUpdate: ({ document }) => {
      return getCompletionPercentage(document);
    },
  },
  isSynced: {
    type: Boolean,
    optional: true,
    canRead: ['admins'],
  },
  device: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  browser: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  version: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  os: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  referrer: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  source: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  pagePath: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      resolver: response => getResponsePath(response),
    },
  },
  surveyId: {
    type: String,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['admins'],
    input: 'select',
    resolveAs: {
      fieldName: 'survey',
      type: 'Survey',
      relation: 'hasOne',
    },
    options: ({ data }) =>
      data.surveys.results.map(survey => ({
        value: survey._id,
        label: `[${survey.year}] ${survey.name}`,
      })),
    query: `
      surveys{
        results{
          _id
          name
          year
        }
      }
    `,
  },
};

let i = 0;

outline.forEach(section => {
  section.questions &&
    section.questions.forEach(questionOrId => {
      i++;
      const questionObject = getQuestionObject(questionOrId, section, i);
      const { id, allowmultiple } = questionObject;
      const questionSchema = getQuestionSchema(questionObject);
      // questions that allow multiple responses should be stored as arrays of strings
      if (allowmultiple) {
        questionSchema.type = Array;
        schema[id] = questionSchema;
        schema[`${id}.$`] = {
          type: String,
          optional: true,
        };
      } else {
        schema[id] = questionSchema;
      }
    });
});

export default schema;
