import parsedOutline from '../outline.js';
import {
  getQuestionObject,
  getQuestionSchema,
  getResponsePath,
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

parsedOutline.forEach(section => {
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
