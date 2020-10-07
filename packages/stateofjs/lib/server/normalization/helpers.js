import crypto from 'crypto';
import { getSetting } from 'meteor/vulcan:core';
import normalizationRules, { sourceNormalizationRules } from './rules';

const encryptionKey = process.env.ENCRYPTION_KEY || getSetting('encriptionKey');

export const encrypt = (text) => {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(encryptionKey),
    'stateofjsstateof'
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return encrypted.toString('hex');
};

export const ignoreValues = [
  ' ',
  '\n',
  '\n\n',
  '/',
  '\\',
  '*',
  '+',
  '-',
  '—',
  'n/a',
  'N/A',
  'NA',
  'None',
  'none',
  'no',
  'No',
  '.',
  '?',
];

export const cleanupValue = (value) =>
  ignoreValues.includes(value) ? null : value;

/**
 * Generates a normalizer from an array of rules.
 * The normalizer will return the first matching
 * rule normalized value.
 *
 * @see multiNormalizer
 */
export const uniNormalizer = (rules) => (value) => {
  if (!value) {
    return [value];
  }

  for (let rule of rules) {
    const [pattern, normalized] = rule;
    if (value.match(pattern) !== null) {
      return [normalized, pattern, value];
    }
  }

  return [value];
};

/**
 * Generates a normalizer from an array of rules.
 * The normalizer will return all matching
 * rules normalized value.
 *
 * @see uniNormalizer
 */
export const multiNormalizer = (rules) => (value) => {
  const normalizedItems = [];
  try {
    if (!value) {
      return [];
    }
    for (let rule of rules) {
      const [pattern, normalized] = rule;
      if (value.match(pattern) !== null) {
        normalizedItems.push([normalized, pattern, value]);
      }
    }
  } catch (error) {
    console.log('// multiNormalizer error');
    console.log(value);
    console.log(error);
  }
  return normalizedItems;
};

// test if a value corresponds to a valid normalisation value
export const isValidNormalization = (value, rules) =>
  rules.some((ruleArray) => {
    const [reg, rule] = ruleArray;
    return value === rule;
  });

/*

Handle source normalization separately since its value can come from 
three different fields (source field, referrer field, 'how did you hear' field)

*/
export const normalizeResponseSource = (response) => {
  const normalizeSource = uniNormalizer(sourceNormalizationRules);

  const [normalizedSource, sourcePattern] = normalizeSource(
    response.user_info.source
  );
  const [normalizedFindOut, findOutPattern] = normalizeSource(
    response.user_info.how_did_user_find_out_about_the_survey
  );
  const [normalizedReferrer, referrerPattern] = normalizeSource(
    response.user_info.referrer
  );
  if (isValidNormalization(normalizedSource, sourceNormalizationRules)) {
    // if response has explicitly passed source, use that
    return [normalizedSource, sourcePattern];
  } else if (
    isValidNormalization(normalizedFindOut, sourceNormalizationRules)
  ) {
    // else if freeform 'how did you hear…' can be normalized, use that
    return [normalizedFindOut, findOutPattern];
  } else if (
    isValidNormalization(normalizedReferrer, sourceNormalizationRules)
  ) {
    // else try to normalize referrer
    return [normalizedReferrer, referrerPattern];
  } else {
    // else leave field empty
    return [];
  }
};

export const normalizeInput = multiNormalizer(normalizationRules);
