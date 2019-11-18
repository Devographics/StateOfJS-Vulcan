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

const templates = {
  feature: {
    options: [
      {
        value: 'ID_neverheard',
        label: '🤷 Never heard of it/Not sure what it is',
      },
      { value: 'ID_heard', label: `✅ Know what it is, but haven't used it` },
      { value: 'ID_used', label: `👍 I've used it` },
    ],
  },
  pattern: {
    options: [
      { value: 'use_never', label: 'Almost always avoid' },
      { value: 'use_sparingly', label: 'Use sparingly' },
      { value: 'use_neutral', label: 'Neutral' },
      { value: 'use_frequently', label: 'Use frequently' },
      { value: 'use_always', label: ' Use as much as I can' },
    ],
  },
  tool: {
    options: [
      {
        value: 'neverheard',
        label: '🤷 Never heard of it/Not sure what it is',
      },
      { value: 'interested', label: '✅ Heard of it > Would like to learn' },
      { value: 'not_interested', label: '🚫 Heard of it > Not interested' },
      { value: 'would_use_again', label: '👍 Used it > Would use again' },
      { value: 'would_not_use_again', label: '👎 Used it > Would avoid}' },
    ],
  },
  rating: {},
  other: {},
  multiple: {},
  text: {},
  longtext: {},
  email: {},
  opinion: {},
  statictext: {},
  happiness: {},
  country: {},
};

const getQuestionObject = (questionId, section) => {
  const questionObject = { title: questionId };
  const questionTemplate = templates[section.template];
  if (questionTemplate) {
    questionObject.optionsArray = questionTemplate.options;
  }
  return questionObject;
};

parsedOutline.forEach(section => {
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
        optionsArray,
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
      };
      if (options || optionsArray) {
        // note: optionsArray is already properly formatted
        questionSchema.options = optionsArray
          ? optionsArray
          : options.map(option => ({
              value: option,
              label: option,
            }));
        questionSchema.input = allowmultiple ? 'checkboxgroup' : 'radiogroup';
      }
      // questions that allow multiple responses should be stored as arrays of strings
      if (allowmultiple) {
        questionSchema.type = Array;
        schema[questionId] = questionSchema;
        schema[`${questionId}.$`] = {
          type: String,
          optional: true,
        };
      } else {
        schema[questionId] = questionSchema;
      }
    });
});
export default schema;
