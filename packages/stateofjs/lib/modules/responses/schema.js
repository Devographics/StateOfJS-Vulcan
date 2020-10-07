
import surveys from '../../surveys';

import {
  getQuestionObject,
  getQuestionSchema,
  getCompletionPercentage,
  getQuestionFieldName,
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
    relation: {
      fieldName: 'user',
      typeName: 'User',
      kind: 'hasOne',
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
  email: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  namespace: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  surveySlug: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  common__user_info__device: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  common__user_info__browser: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  common__user_info__version: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  common__user_info__os: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  common__user_info__referrer: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  common__user_info__source: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  // surveyId: {
  //   type: String,
  //   canRead: ['guests'],
  //   canCreate: ['members'],
  //   canUpdate: ['admins'],
  //   input: 'select',
  //   relation: {
  //     fieldName: 'survey',
  //     typeName: 'Survey',
  //     kind: 'hasOne',
  //   },
  //   options: ({ data }) =>
  //     get(data, 'surveys.results', []).map(survey => ({
  //       value: survey._id,
  //       label: `[${survey.year}] ${survey.name}`,
  //     })),
  //   query: `
  //   query SurveysQuery {
  //     surveys{
  //       results{
  //         _id
  //         name
  //         year
  //       }
  //     }
  //   }
  //   `,
  // },
};

/*

Just put all questions for all surveys on the root of the schema

*/
let i = 0;
surveys.forEach(survey => {
  survey.outline.forEach(section => {
    section.questions &&
      section.questions.forEach(questionOrId => {
        i++;
        const questionObject = getQuestionObject(questionOrId, section, i);
        const questionSchema = getQuestionSchema(questionObject, section, survey);
        const questionId = getQuestionFieldName(survey, section, questionObject);
        schema[questionId] = questionSchema;
      });
  });
});

export default schema;
