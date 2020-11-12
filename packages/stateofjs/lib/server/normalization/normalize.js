import countries from './countries';
import {
  encrypt,
  cleanupValue,
  normalize,
  normalizeSource,
  getEntities,
  generateEntityRules,
} from './helpers';
import pick from 'lodash/pick';
import set from 'lodash/set';
import last from 'lodash/last';
import NormalizedResponses from '../../modules/normalized_responses/collection';
import Users from 'meteor/vulcan:users';
import { getSurveyBySlug } from '../../modules/surveys/helpers';
import { logToFile } from 'meteor/vulcan:core';

const replaceAll = function (target, search, replacement) {
  return target.replace(new RegExp(search, 'g'), replacement);
};

const convertForCSV = (obj) => {
  if (!obj || (Array.isArray(obj) && obj.length === 0)) {
    return '';
  } else if (typeof obj === 'string') {
    return obj;
  } else {
    let s = JSON.stringify(obj);
    s = replaceAll(s, '"', `'`);
    // s = replaceAll(s, ',', '\,');
    return s;
  }
};

const logColumn = async (columns) => {
  await logToFile(
    'normalization.csv',
    columns.map((c) => `"${convertForCSV(c)}"`).join(', ')
  );
};

const fieldsToCopy = [
  'surveySlug',
  'createdAt',
  'updatedAt',
  'year',
  'completion',
  'userId',
  'isFinished',
];

export const normalizeResponse = async ({
  document: response,
  entities,
  log = false,
}) => {
  try {
    const normalizedFields = [];
    const survey = getSurveyBySlug(response.surveySlug);
    const user = Users.findOne({ _id: response.userId });
    const allEntities = entities || (await getEntities());
    const allRules = generateEntityRules(allEntities);

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
  
    4. Loop over survey sections and fields (a.k.a. questions)
    
    */
    for (const s of survey.outline) {
      for (const field of s.questions) {
        const { fieldName, matchTags } = field;
        const [initialSegment, ...restOfPath] = fieldName.split('__');
        const normPath = restOfPath.join('.');
        const value = response[fieldName];

        if (last(restOfPath) === 'others') {
          // A. "others" fields needing to be normalized
          set(normResp, `${normPath}.raw`, value);
          // clean value to eliminate empty spaces, "none", "n/a", etc.
          const cleanValue = cleanupValue(value);

          if (cleanValue) {
            if (log) {
              await logToFile(
                'normalization.txt',
                `${
                  response._id
                }, ${fieldName}, ${cleanValue}, ${matchTags.toString()}`
              );
            }
            const normTokens = await normalize(cleanValue, allRules, matchTags);
            // console.log(
            //   `// Normalizing key "${fieldName}" with value "${value}"…`
            // );
            // console.log(
            //   `  -> Normalized values: ${JSON.stringify(normTokens)}`
            // );

            if (log) {
              if (normTokens.length > 0) {
                normTokens.forEach(async (token) => {
                  const { id, pattern, rules, match } = token;
                  await logColumn([
                    response._id,
                    fieldName,
                    value,
                    matchTags,
                    id,
                    pattern,
                    rules,
                    match,
                  ]);
                });
              } else {
                await logColumn([
                  response._id,
                  fieldName,
                  value,
                  matchTags,
                  'n/a',
                  'n/a',
                  'n/a',
                  'n/a',
                ]);
              }
            }

            // if normalization fails an empty array will be returned
            if (normTokens.length > 0) {
              const normIds = normTokens.map((token) => token.id);
              const normPatterns = normTokens.map((token) =>
                token.pattern.toString()
              );
              set(normResp, `${normPath}.normalized`, normIds);
              set(normResp, `${normPath}.patterns`, normPatterns);
            }
            // keep trace of fields that were normalized
            normalizedFields.push({
              fieldName,
              value,
              normTokens,
            });
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
  
    5. Normalize country (if provided)
    
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
  
    6. Handle source field separately
    
    */
    const normSource = await normalizeSource(normResp, allRules);
    if (normSource) {
      set(normResp, 'user_info.source.raw', normSource.raw);
      set(normResp, 'user_info.source.normalized', normSource.id);
      set(normResp, 'user_info.source.pattern', normSource.pattern.toString());
    }

    // console.log(JSON.stringify(normResp, '', 2));

    let result;
    if (response.normalizedResponseId) {
      // if a normalizedResponse for the current response already exists, update it
      result = NormalizedResponses.update(
        { _id: response.normalizedResponseId },
        normResp
      );
    } else {
      // else, use upsert just for safety (to avoid creating duplicate normalized responses)
      result = NormalizedResponses.upsert(
        { responseId: response._id },
        normResp
      );
    }

    // const result = NormalizedResponses.upsert(
    //   { responseId: response._id },
    //   normResp
    // );

    // eslint-disable-next-line
    // console.log(result);
    return { result, normalizedFields };
  } catch (error) {
    console.log('// normalizeResponse error');
    console.log(error);
  }
};
