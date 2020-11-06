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

  /*
  
  1. Copy over root fields and assign id
  
  */
  const normResp = pick(response, fieldsToCopy);
  normResp.responseId = response._id;
  normResp.generatedAt = new Date();
  normResp.survey = response.context;

  /*
  
  2. Generate email hash
  
  */
  set(normResp, 'user_info.hash', encrypt(response.email));

  /*
  
  3. Store user locale and other fields
  
  */
  if (user) {
    set(normResp, 'user_info.locale', user.locale);
  }
  set(normResp, 'user_info.knowledge_score', response.knowledgeScore);

  /*
  
  4. Normalize country (if provided)
  
  */
  if (normResp.user_info.country) {
    const countryNormalized = countries.find(
      (c) => c['alpha-2'] === normResp.user_info.country
    );
    if (countryNormalized) {
      set(normResp, 'user_info.country_name', countryNormalized.name);
      set(normResp, 'user_info.country_alpha3', countryNormalized['alpha-3']);
    }
  }

  /*
  
  5. Loop over survey sections and fields (a.k.a. questions)
  
  */
  for (const s of survey.outline) {
    for (const field of s.questions) {
      const { fieldName, matchCategories } = field;
      const [initialSegment, ...restOfPath] = fieldName.split('__');
      const normPath = restOfPath.join('.');
      const value = response[fieldName];

      if (last(restOfPath) === 'others') {
        // A. "others" fields needing to be normalized
        set(normResp, `${normPath}.raw`, value);
        // clean value to eliminate empty spaces, "none", "n/a", etc.
        const cleanValue = cleanupValue(value);
        if (cleanValue) {
          const normTokens = await normalize(cleanValue, matchCategories);
          // console.log(`// Normalizing key "${path}" with value "${value}"…`);
          // console.log(`  -> Normalized values: ${normalizedValues}`);

          // if normalization fails an empty array will be returned
          if (normTokens.length > 0) {
            const normIds = normTokens.map((token) => token.id);
            const normPatterns = normTokens.map((token) =>
              token.pattern.toString()
            );
            set(normResp, `${normPath}.normalized`, normIds);
            set(normResp, `${normPath}.patterns`, normPatterns);
          }
        }
      } else if (last(restOfPath) === 'prenormalized') {
        // B. these fields are "prenormalized" through autocomplete inputs
        const newPath = normPath.replace('.prenormalized', '.others');
        set(normResp, `${newPath}.raw`, value);
        set(normResp, `${newPath}.normalized`, value);
        set(normResp, `${newPath}.patterns`, ['prenormalized']);
      } else {
        // C. any other field
        set(normResp, normPath, value);
      }
    }
  }

  /*
  
  6. Handle source field separately
  
  */
  const normSource = await normalizeSource(normResp);
  if (normSource) {
    set(normResp, 'user_info.source.raw', normSource.raw);
    set(normResp, 'user_info.source.normalized', normSource.value);
    set(normResp, 'user_info.source.pattern', normSource.pattern);
  }

  // console.log(JSON.stringify(normalizedResp, '', 2));

  const result = NormalizedResponses.upsert(
    { responseId: response._id },
    normResp
  );
  // eslint-disable-next-line
  // console.log(result);
};
