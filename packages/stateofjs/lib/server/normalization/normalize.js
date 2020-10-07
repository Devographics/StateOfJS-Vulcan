import countries from './countries';
import { encrypt, cleanupValue, normalizeInput, normalizeResponseSource } from './helpers';
import pick from 'lodash/pick';
import get from 'lodash/get';
import set from 'lodash/set';
import last from 'lodash/last';
import NormalizedResponses from '../../modules/normalized_responses/collection';

const fieldsToCopy = [
  'surveySlug',
  'createdAt',
  'updatedAt',
  'year',
  'completion',
];

export const normalizeResponse = ({ document: response }) => {
  // eslint-disable-next-line
  console.log(`// Normalizing response ${response._id}…`)
  const keysToNormalize = [];

  console.log(response);

  // 1. Copy over root fields and assign id
  const normalizedResp = pick(response, fieldsToCopy);
  normalizedResp.responseId = response._id;
  normalizedResp.generatedAt = new Date();
  normalizedResp.survey = response.namespace;

  // 2. split off response into subfields
  Object.keys(response).forEach((fieldName) => {
    const [initialSegment, ...restOfPath] = fieldName.split('__');
    if (initialSegment === response.surveySlug || initialSegment === 'common') {
      const normalizedPath = restOfPath.join('.');
      set(normalizedResp, normalizedPath, response[fieldName]);
      // if this has the 'others' suffix then add it to list of questions that need to be normalized
      if (last(restOfPath) === 'others') {
        keysToNormalize.push(normalizedPath);
      }
    }
  });

  // 3. generate email hash
  normalizedResp.user_info.email_hash = encrypt(response.email);

  // 4. normalize country (if provided)
  if (normalizedResp.user_info.country) {
    const countryNormalized = countries.find(
      (c) => c['alpha-2'] === normalizedResp.user_info.country
    );
    set(normalizedResp, 'user_info.country_name', countryNormalized.name);
    set(normalizedResp, 'user_info.country_alpha3', countryNormalized['alpha-3']);
  }

  // 5. normalize 'other' fields
  keysToNormalize.forEach((path) => {
    const value = cleanupValue(get(normalizedResp, path));
    if (value) {
      console.log(`// Normalizing key "${path}" with value "${value}"…`);
      const normalizedValues = normalizeInput(value);
      console.log(`  -> Normalized value: ${normalizedValues}`);
      set(
        normalizedResp,
        `${path}_normalized`,
        normalizedValues.map((v) => v[0])
      );
      set(
        normalizedResp,
        `${path}_patterns`,
        normalizedValues.map((v) => v[1].toString())
      );
    }
  });

  // 6. handle source field separately
  const [normalizedSource, sourcePattern] = normalizeResponseSource(normalizedResp);
  console.log(normalizedSource)
  console.log(sourcePattern)
  if (normalizedSource) {
    set(normalizedResp, 'user_info.source_normalized', normalizedSource);
    if (sourcePattern) {
      set(normalizedResp, 'user_info.source_pattern', sourcePattern.toString());
    }
  }
  
  console.log(JSON.stringify(normalizedResp, '', 2));

  const result = NormalizedResponses.upsert({responseId: response._id}, normalizedResp);
  console.log(result);
};
