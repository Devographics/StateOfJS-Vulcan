import countriesOptions from '../countriesOptions.js';
import surveys from '../../surveys/';
import { Utils } from 'meteor/vulcan:core';
import pickBy from 'lodash/pickBy';

/*

Replace all occurences of a string

*/
// eslint-disable-next-line no-extend-native
String.prototype.replaceAll = function(search, replacement) {
  const target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

/*

Take a string ("Front-end") and make it usable as an ID ("frontend")

*/
const disallowedCharacters = '?.(){}[]=>&,/- @*';
export const makeId = str => {
  if (!str) {
    return '';
  }
  let s = str.toLowerCase();
  const charArray = [...disallowedCharacters];
  charArray.forEach(c => {
    s = s.replaceAll(`\\${c}`, '');
  });
  return s;
};

export const getSurvey = response => surveys.find(s => s.slug === response.surveySlug);

/*

Note: section's slug can be overriden by the question

*/
export const getQuestionFieldName = (survey, section, question) =>{
  const sectionSlug = question.sectionSlug || section.slug;
  let fieldName = survey.slug + '__' + sectionSlug + '__' + question.id;
  if (question.suffix) {
    fieldName += `__${question.suffix}`;
  }
  return fieldName
}

export const getResponsePath = (response, sectionNumber) =>{
  const { name, year } = getSurvey(response);
  const path = `/survey/${Utils.slugify(name)}/${year}/${response._id}${
    typeof sectionNumber !== 'undefined' ? `/${sectionNumber}` : ''
  }`;
  return path;
}

export const templates = {
  feature: () => ({
    input: 'radiogroup',
    suffix: 'experience',
    options: [
      {
        value: 'never_heard',
        label: '🤷 Never heard of it/Not sure what it is',
      },
      { value: 'heard', label: `✅ Know what it is, but haven't used it` },
      { value: 'used', label: `👍 I've used it` },
    ],
  }),
  pattern: () => ({
    input: 'radiogroup',
    suffix: 'experience',
    options: [
      { value: 'use_never', label: 'Almost always avoid' },
      { value: 'use_sparingly', label: 'Use sparingly' },
      { value: 'use_neutral', label: 'Neutral' },
      { value: 'use_frequently', label: 'Use frequently' },
      { value: 'use_always', label: ' Use as much as I can' },
    ],
  }),
  tool: () => ({
    input: 'radiogroup',
    suffix: 'experience',
    options: [
      {
        value: 'never_heard',
        label: '🤷 Never heard of it/Not sure what it is',
      },
      { value: 'interested', label: '✅ Heard of it > Would like to learn' },
      { value: 'not_interested', label: '🚫 Heard of it > Not interested' },
      { value: 'would_use', label: '👍 Used it > Would use again' },
      { value: 'would_not_use', label: '👎 Used it > Would avoid' },
    ],
  }),
  single: ({ allowother = false }) => ({
    allowmultiple: false,
    allowother,
    input: 'radiogroup',
    randomize: false,
  }),
  multiple: ({ allowother = false }) => ({
    allowmultiple: true,
    allowother,
    input: 'checkboxgroup',
    randomize: true,
    suffix: 'choices',
  }),
  text: () => ({ input: 'text' }),
  longtext: () => ({ input: 'textarea' }),
  email: () => ({ input: 'email' }),
  opinion: () => ({
    input: 'radiogroup',
    type: Number,
    options: [
      { value: 0, label: 'Disagree Strongly' },
      { value: 1, label: 'Disagree' },
      { value: 2, label: 'Neutral' },
      { value: 3, label: 'Agree' },
      { value: 4, label: 'Agree Strongly' },
    ],
  }),
  // statictext: () => ({}),
  happiness: () => ({
    input: 'radiogroup',
    type: Number,
    options: [
      { value: 0, label: 'Very Unhappy' },
      { value: 1, label: 'Unhappy' },
      { value: 2, label: 'Neutral' },
      { value: 3, label: 'Happy' },
      { value: 4, label: 'Very Happy' },
    ],
  }),
  country: () => ({
    input: 'select',
    options: countriesOptions,
  }),
};

// build question object from outline
export const getQuestionObject = (questionOrId, section, number) => {
  let questionObject =
    typeof questionOrId === 'string' ? { title: questionOrId } : { ...questionOrId };

  questionObject.id = questionObject.id || makeId(questionObject.title);
  questionObject.slug = questionObject.id;
  questionObject.type = String; // default to String type

  // get template from either question or parent section
  const questionTemplate =
    templates[questionObject.template || section.template];
  if (questionTemplate) {
    questionObject = { ...questionObject, ...questionTemplate(questionObject) };
  }
  return questionObject;
};

// transform question object into SimpleSchema-compatible schema field
export const getQuestionSchema = questionObject => {
  const {
    title,
    description,
    input,
    options,
    type,
    isprivate = false,
    searchable = false,
    allowmultiple = false,
  } = questionObject;

  const questionSchema = {
    label: title,
    description,
    type,
    optional: true,
    // canRead: isprivate ? ['owners'] : ['members'],
    canRead: ['members'], // note: for now data is not public so all fields can be set to ['members']
    canCreate: ['members'],
    canUpdate: ['members'],
    input,
    searchable,
  };

  if (options) {
    questionSchema.options = options;
  }

  if (allowmultiple) {
    questionSchema.type = Array;
    questionSchema.arrayItem = {
      type: String,
            optional: true,
    }
  }

  return questionSchema;
};

/*

Take a raw survey YAML and process it to give ids, fieldNames, etc.
to every question

*/
export const parseSurvey = survey => {
  let i = 0;
  const parsedSurvey = { ...survey };
  parsedSurvey.outline = survey.outline.map(section => {
    return {
      ...section,
      id: makeId(section.title),
      questions:
        section.questions &&
        section.questions.map(question => {
          i++;
          const questionObject = getQuestionObject(question, section, i);
          questionObject.fieldName = getQuestionFieldName(survey, section, questionObject);
          return questionObject;
        })
    };
  });
  return parsedSurvey;
};

export const ignoredFieldTypes = ['email', 'text', 'longtext'];

export const getCompletionPercentage = response => {
  let completedCount = 0;
  let totalCount = 0;
  const survey = getSurvey(response);
  const parsedOutline = parseSurvey(survey).outline;
  parsedOutline.forEach(section => {
    section.questions && section.questions.forEach(question => {
      const questionId = getQuestionFieldName(survey, section, question);
      const answer = response[questionId];
      totalCount ++;
      if (!ignoredFieldTypes.includes(question.template) && answer !== null && typeof answer !== 'undefined') {
        completedCount++;
      }
    });
  });
  const completion = Math.round(completedCount*100/totalCount);
  return completion;
}

/*

Filter a response object to only keep fields relevant to the survey

*/
export const getResponseData = response => {
  return pickBy(response, (r, k) => k.includes(response.surveySlug))
}