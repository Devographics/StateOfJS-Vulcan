import moment from 'moment';
import surveys from '../../surveys';
import Users from 'meteor/vulcan:users';

import {
  getQuestionObject,
  getQuestionSchema,
  getCompletionPercentage,
  getQuestionFieldName,
  getKnowledgeScore,
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
    canRead: ['owners'],
    onCreate: () => {
      return new Date();
    },
  },
  updatedAt: {
    type: Date,
    optional: true,
    canRead: ['owners'],
    onCreate: () => {
      return new Date();
    },
    onUpdate: () => {
      return new Date();
    },
  },
  // unlike updatedAt, this tracks when the user clicked "submit" on the client, 
  // not when the server finished the update
  lastSavedAt: {
    type: Date,
    optional: true,
    canRead: ['owners'],
    canCreate: ['members'],
    canUpdate: ['owners'],
  },
  userId: {
    type: String,
    optional: true,
    canRead: ['members'],
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
    canRead: ['owners'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    onCreate: () => {
      return new Date().getFullYear();
    },
  },
  duration: {
    type: Number,
    optional: true,
    canRead: ['owners'],
    onUpdate: ({ document }) => {
      return moment(document.updatedAt).diff(
        moment(document.createdAt),
        'minutes'
      );
    },
  },
  completion: {
    type: Number,
    optional: true,
    canRead: ['owners'],
    onUpdate: ({ document }) => {
      return getCompletionPercentage(document);
    },
  },
  knowledgeScore: {
    type: Number,
    optional: true,
    canRead: ['owners'],
    onUpdate: ({ document }) => {
      return getKnowledgeScore(document).score;
    },
  },
  locale: {
    type: String,
    optional: true,
    canRead: ['owners'],
    onUpdate: ({ document }) => {
      const user = Users.findOne({ _id: document.userId });
      return user && user.locale
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
    canRead: ['owners'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  context: {
    type: String,
    optional: true,
    canRead: ['owners'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  surveySlug: {
    type: String,
    optional: true,
    canRead: ['owners'],
    canCreate: ['members'],
    canUpdate: ['admins'],
    options: surveys.map(({ slug }) => ({
      value: slug,
      label: slug,
    })),
  },
  isNormalized: {
    type: Boolean,
    optional: true,
    canRead: ['admins'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    onUpdate: () => {
      return false;
    }
  },
  normalizedResponseId: {
    type: String,
    optional: true,
    canRead: ['admins'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
  },
  isFinished: {
    type: Boolean,
    optional: true,
    canRead: ['owners'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  common__user_info__device: {
    type: String,
    optional: true,
    canRead: ['owners'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  common__user_info__browser: {
    type: String,
    optional: true,
    canRead: ['owners'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  common__user_info__version: {
    type: String,
    optional: true,
    canRead: ['owners'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  common__user_info__os: {
    type: String,
    optional: true,
    canRead: ['owners'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  common__user_info__referrer: {
    type: String,
    optional: true,
    canRead: ['owners'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  common__user_info__source: {
    type: String,
    optional: true,
    canRead: ['owners'],
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
surveys.forEach((survey) => {
  survey.outline.forEach((section) => {
    section.questions &&
      section.questions.forEach((questionOrId) => {
        i++;
        const questionObject = getQuestionObject(questionOrId, section, i);
        const questionSchema = getQuestionSchema(
          questionObject,
          section,
          survey
        );
        const questionId = getQuestionFieldName(
          survey,
          section,
          questionObject
        );
        schema[questionId] = questionSchema;
      });
  });
});

export default schema;