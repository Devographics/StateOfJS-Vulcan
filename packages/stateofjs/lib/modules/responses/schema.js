import parsedOutline from '../outline.js';
import { makeId } from '../helpers.js';
import take from 'lodash/take';

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

  surveyId: {
    type: String,
    canRead: ['guests'],
    canCreate: ['admins'],
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

const getQuestionObject = (questionId, section) => {
  return {
    title: questionId,
  };
};

take(parsedOutline, 7).forEach(section => {
  section.questions &&
    section.questions.forEach(questionOrId => {
      const questionObject =
        typeof questionOrId === 'string'
          ? getQuestionObject(questionOrId, section)
          : questionOrId;
      const {
        title,
        description,
        options,
        allowmultiple,
        allowother,
        template,
        randomize,
      } = questionObject;
      const questionId = makeId(title);
      const questionSchema = {
        label: title,
        description,
        type: String,
        optional: true,
        canRead: ['guests'],
        canCreate: ['admins'],
        canUpdate: ['admins'],
        input: allowmultiple ? 'checkboxgroup' : 'radiogroup',
      };
      if (options) {
        questionSchema.options = options.map(option => ({
          value: option,
          label: options,
        }));
      }
      schema[questionId] = questionSchema;
    });
});
export default schema;
