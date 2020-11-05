import countries from './countries';
import { encrypt, cleanupValue, normalize, normalizeSource } from './helpers';
import pick from 'lodash/pick';
import set from 'lodash/set';
import last from 'lodash/last';
import NormalizedResponses from '../../modules/normalized_responses/collection';
import Users from 'meteor/vulcan:users';
import { getSurveyBySlug } from '../../modules/surveys/helpers';

const fieldsToCopy = [
  'surveySlug',
  'createdAt',
  'updatedAt',
  'year',
  'completion',
  'userId',
  'isFinished',
];

export const normalizeResponse = async ({ document: response }) => {
  const survey = getSurveyBySlug(response.surveySlug);
  const user = Users.findOne({ _id: response.userId });

  // Copy over root fields and assign id
  const normalizedResp = pick(response, fieldsToCopy);
  normalizedResp.responseId = response._id;
  normalizedResp.generatedAt = new Date();
  normalizedResp.survey = response.context;

  // Generate email hash
  set(normalizedResp, 'user_info.hash', encrypt(response.email));

  // Store user locale and other fields
  if (user) {
    set(normalizedResp, 'user_info.locale', user.locale);
  }
  set(normalizedResp, 'user_info.knowledge_score', response.knowledgeScore);

  // Normalize country (if provided)
  if (normalizedResp.user_info.country) {
    const countryNormalized = countries.find(
      (c) => c['alpha-2'] === normalizedResp.user_info.country
    );
    if (countryNormalized) {
      set(normalizedResp, 'user_info.country_name', countryNormalized.name);
      set(
        normalizedResp,
        'user_info.country_alpha3',
        countryNormalized['alpha-3']
      );
    }
  }

  // Loop over survey fields
  for (const s of survey.outline) {
    for (const field of s.questions) {
      const { fieldName, matchCategories } = field;

      const value = response[fieldName];

      if (value) {

        const [initialSegment, ...restOfPath] = fieldName.split('__');
        const normalizedPath = restOfPath.join('.');
        if (last(restOfPath) === 'others') {
          const value = cleanupValue(response[fieldName]);
          if (value) {
            // console.log(`// Normalizing key "${path}" with value "${value}"…`);
            const normalizedValues = await normalize(value, matchCategories);
            // console.log(`  -> Normalized value: ${normalizedValues}`);
            set(normalizedResp, `${normalizedPath}.raw`, value);
            set(
              normalizedResp,
              `${normalizedPath}.normalized`,
              normalizedValues.map((v) => v.value)
            );
            set(
              normalizedResp,
              `${normalizedPath}.patterns`,
              normalizedValues.map((v) => v.pattern)
            );
          }
        } else if (last(restOfPath) === 'prenormalized') {
          // these keys are "prenormalized" through autocomplete inputs
          const newPath = normalizedPath.replace('.prenormalized', '.others');
          set(normalizedResp, `${newPath}.raw`, value);
          set(normalizedResp, `${newPath}.normalized`, value);
          set(normalizedResp, `${newPath}.patterns`, ['prenormalized']);
        } else {
          set(normalizedResp, normalizedPath, value);
        }
      }
    }
  }

  // Handle source field separately
  const normSource = await normalizeSource(normalizedResp);
  if (normSource) {
    set(normalizedResp, 'user_info.source.raw', normSource.raw);
    set(normalizedResp, 'user_info.source.normalized', normSource.value);
    set(normalizedResp, 'user_info.source.pattern', normSource.pattern);
  }

  // console.log(JSON.stringify(normalizedResp, '', 2));

  const result = NormalizedResponses.upsert(
    { responseId: response._id },
    normalizedResp
  );
  // eslint-disable-next-line
  // console.log(result);
};
